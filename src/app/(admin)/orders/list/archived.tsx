import { FlatList } from 'react-native'
import OrderItem from '@/components/OrderItem';
import orders from '@/../assets/data/orders';

const Orders = () => {
    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderItem key={item.id} {...item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}

        />
    )
};

export default Orders;