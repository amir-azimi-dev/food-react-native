import { Pressable, StyleSheet, Text, View } from "react-native"
import Colors from "@/constants/Colors"
import { OrderStatus } from "@/types";

const orderStatusList: OrderStatus[] = ["New", "Cooking", "Delivering", "Delivered"];

const OrderStatusSelector = ({ orderStatus }: { orderStatus: OrderStatus }) => {
    return (
        <>
            <Text style={styles.title}>Status</Text>
            <View style={styles.statusOptionsContainer}>
                {orderStatusList.map((status) => (
                    <Pressable
                        key={status}
                        onPress={() => alert("Update status")}
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