import { useState } from 'react'
import { View, Text, Platform, StyleSheet, FlatList, Pressable } from 'react-native'
import { useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useShoppingCart } from '@/Providers/CartProvider';
import CartItem from '@/components/CartItem';
import useCreateOrder, { useCreateOrderItems } from '@/hooks/orders/useCreateOrder';
import { useAuth } from '@/Providers/AuthProvider';
import { Tables } from '@/types';

const ShoppingCart = () => {
    const [isMutating, setIsMutating] = useState<boolean>(false);
    const { mutate: checkoutOrder } = useCreateOrder();
    const { mutate: createOrderItems } = useCreateOrderItems();

    const cartContext = useShoppingCart();
    const { session } = useAuth();
    const router = useRouter();
    const navigation = useNavigation();

    const checkoutOrderHandler = (): void => {
        if (isMutating) return;
        if (!cartContext.items.length || !session) return;

        setIsMutating(true);

        checkoutOrder(
            { user_id: session.user.id, total: cartContext.totalPrice },
            {
                onSuccess: saveOrderItemsHandler,
                onError: () => {
                    setIsMutating(false);
                    alert("Error while checking out your order.");
                }
            }
        );
    };

    const saveOrderItemsHandler = ({ id }: Tables<"orders">): void => {
        const orderItems = cartContext.items.map(item => ({
            order_id: id,
            product_id: parseFloat(item.id),
            size: item.size,
            quantity: item.quantity
        }));

        createOrderItems(
            orderItems,
            {
                onSuccess: () => {
                    alert("Your order checked out successfully.");
                    setIsMutating(false);
                    cartContext.clearCart();
                    navigation.goBack();
                    router.push(`/(user)/orders/${id}`);
                },
                onError: () => {
                    setIsMutating(false);
                    alert("Error while checking out your order.");
                }
            }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ShoppingCart</Text>

            {cartContext.items.length ? (
                <>
                    <FlatList
                        data={cartContext.items}
                        renderItem={({ item }) => <CartItem key={item.id} data={item} />}
                        numColumns={1}
                        contentContainerStyle={{ gap: 10 }}
                    />

                    <Text style={styles.totalPrice}>Total Price: ${cartContext.totalPrice}</Text>
                    <Pressable style={styles.button} onPress={checkoutOrderHandler}>
                        <Text style={styles.buttonText}>Checkout</Text>
                    </Pressable>
                </>
            ) : (
                <View>
                    <Text style={styles.notFound}>Your basket is empty.</Text>
                </View>
            )}

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
};

export default ShoppingCart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff"
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },

    totalPrice: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: "bold"
    },

    button: {
        paddingVertical: 10,
        backgroundColor: "#0066ff",
        borderRadius: 10
    },

    buttonText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },

    notFound: {
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#00aaff",
        color: "#fff",
        borderRadius: 8
    }
});