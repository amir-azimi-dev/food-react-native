import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderItem from '@/components/OrderItem';
import OrderItemProduct from '@/components/OrderItemProduct';
import useUserSingleOrder from '@/hooks/orders/useUserSingleOrder';
import { useAuth } from '@/Providers/AuthProvider';

const Order = () => {
    const { id: orderId }: { id: string } = useLocalSearchParams();

    const { session } = useAuth();
    if (!session) return;

    const { data: order, error, isLoading } = useUserSingleOrder(parseInt(orderId), session.user.id);

    if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;


    if (error) return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Failed to fetch!</Text>
        </View>
    );


    return order ? (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${orderId}` }} />

            <OrderItem {...order} />

            {/* <View style={styles.productsContainer}>
                <FlatList
                    data={order.order_items}
                    renderItem={({ item }) => <OrderItemProduct key={item.id} data={item} />}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View> */}

            <Text style={styles.total}>Total: ${order.total}</Text>
        </View>
    ) : (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Unknown Order" }} />
            <Text style={styles.notFound}>Order not found</Text>
        </View>
    );
}

export default Order;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20
    },

    productImage: {
        width: "100%",
        aspectRatio: 1,
        marginHorizontal: "auto"
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
    },

    productsContainer: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: -10
    },

    total: {
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#0000002a",
        fontSize: 18,
        fontWeight: "bold"
    },

    notFound: {
        marginTop: 20,
        paddingVertical: 10,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#00aaff",
        color: "#fff",
        borderRadius: 8
    }
});