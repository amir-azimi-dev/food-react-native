import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import orders from '@/../assets/data/orders';
import { Order as OrderType } from '@/types';
import OrderItem from '@/components/OrderItem';
import OrderItemProduct from '@/components/OrderItemProduct';
import OrderStatusSelector from '@/components/OrderStatusSelector';

const Order = () => {
    const { id: orderId }: { id: string } = useLocalSearchParams();

    const [order, setOrder] = useState<OrderType | null>(null);

    const router = useRouter();

    useEffect(() => {
        const targetOrder = orders.find(order => order.id === parseInt(orderId));
        targetOrder ? setOrder(targetOrder) : router.push("/(user)/orders");

    }, [orderId]);


    return order ? (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${orderId}` }} />

            <OrderItem {...order} />

            <View style={styles.productsContainer}>
                <FlatList
                    data={order.order_items}
                    renderItem={({ item }) => <OrderItemProduct key={item.id} data={item} />}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>

            <OrderStatusSelector orderStatus={order.status} />

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
        marginVertical: 10,
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