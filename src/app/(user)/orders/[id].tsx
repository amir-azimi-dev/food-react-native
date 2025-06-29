import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import orders from '@/../assets/data/orders';
import { Order as OrderType } from '@/types';

const Order = () => {
    const { id: orderId }: { id: string } = useLocalSearchParams();
    console.log(orderId);
    
    const [order, setOrder] = useState<OrderType | null>(null);
    
    const router = useRouter();

    useEffect(() => {
        const targetOrder = orders.find(order => order.id === parseInt(orderId));
        targetOrder ? setOrder(targetOrder) : router.push("/(user)/orders");

    }, [orderId]);

    return (
        <View>
            <Text>Order</Text>
        </View>
    )
}

export default Order;