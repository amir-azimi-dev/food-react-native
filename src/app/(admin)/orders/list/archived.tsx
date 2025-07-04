import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import OrderItem from '@/components/OrderItem';
import useAdminOrderList from '@/hooks/orders/useAdminOrderList';

const Orders = () => {
    const { data: orders, error, isLoading } = useAdminOrderList(false);

    if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;

    if (error) return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Failed to fetch!</Text>
        </View>
    );

    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderItem key={item.id} {...item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}

        />
    )
};

export default Orders;