import { Pressable, StyleSheet, Text, View } from "react-native"
import Colors from "@/constants/Colors"
import { OrderStatus, Tables } from "@/types";
import useEditOrderStatus from "@/hooks/orders/useEditOrderStatus";
import { useState } from "react";
import { notifyUserAboutOrderStatusUpdate } from "@/libs/notifications";

const orderStatusList: OrderStatus[] = ["New", "Cooking", "Delivering", "Delivered"];

const OrderStatusSelector = ({ id: orderId, status: orderStatus, user_id }: Tables<"orders">) => {
    const [isMutating, setIsMutating] = useState<boolean>(false);
    const { mutate: editOrderStatus } = useEditOrderStatus();

    const updateOrderStatusHandler = (newStatus: OrderStatus): void => {
        if (isMutating) return;

        setIsMutating(true);

        editOrderStatus(
            { id: orderId, status: newStatus },
            {
                onSuccess: () => {
                    alert("Order status updated successfully.");
                    setIsMutating(false);
                    notifyUserAboutOrderStatusUpdate(user_id, newStatus);
                },
                onError: () => {
                    setIsMutating(false);
                    alert("Error while updating order status.");
                }
            }
        );
    };

    return (
        <>
            <Text style={styles.title}>Status</Text>
            <View style={[styles.statusOptionsContainer, { opacity: isMutating ? 0.4 : 1 }]}>
                {orderStatusList.map((status) => (
                    <Pressable
                        key={status}
                        onPress={() => updateOrderStatusHandler(status)}
                        style={[styles.statusOption, { backgroundColor: orderStatus === status ? Colors.light.tint : "transparent" }]}
                    >
                        <Text
                            style={{ color: orderStatus === status ? "white" : Colors.light.tint, }}>
                            {status}
                        </Text>
                    </Pressable>
                ))}
            </View >
        </>
    )
}

export default OrderStatusSelector

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },

    statusOptionsContainer: {
        flexDirection: "row",
        gap: 5
    },

    statusOption: {
        borderColor: Colors.light.tint,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10
    },
})