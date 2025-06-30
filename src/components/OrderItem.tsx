import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Link, useSegments } from 'expo-router';
import { Order } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const OrderItem = ({ id, created_at, status }: Order) => {
    const segment = useSegments();
    const currentMode = segment[0] as "(user)" | "(admin)";

    return (
        <Link href={{ pathname: `/${currentMode}/orders/[id]`, params: { id } }} asChild>
            <Pressable style={styles.container}>
                <View>
                    <Text style={styles.title}>Order #{id}</Text>
                    <Text style={styles.time}>{dayjs(created_at).fromNow()}</Text>
                </View>
                <Text style={styles.status}>{status}</Text>
            </Pressable>
        </Link>
    )
}

export default OrderItem;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: 10,
        boxShadow: "4px 4px 7px #0000002a"
    },
    title: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "bold"
    },
    time: {
        fontWeight: "600",
        color: "#bebbbb"
    },
    status: {
        fontWeight: "bold",
        marginVertical: "auto"
    }
});