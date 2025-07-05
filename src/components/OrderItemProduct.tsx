import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { Tables } from "../types";

const OrderItemProduct = ({ data }: { data: Tables<"order_items"> & { products: Tables<"products"> } }) => {
    const segment = useSegments();
    const currentMode = segment[0] as "(user)" | "(admin)";

    const router = useRouter();
    const navigation = useNavigation();

    const showProductDetailsHandler = () => {
        navigation.goBack();
        router.push(`/${currentMode}/menu/${data.product_id}`);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.productDetailsContainer} onPress={showProductDetailsHandler}>
                <Image
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HE8d6CHpgkSQUqUqkZbUFi_5N_LJ0FYeUA&s" }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{data.products.name}</Text>
                    <View style={styles.subtitleContainer}>
                        <Text style={styles.price}>${data.products.price.toFixed(2)}</Text>
                        <Text>Size: {data.size}</Text>
                    </View>
                </View>
            </Pressable>
            <Text style={styles.quantity}>x{data.quantity}</Text>
        </View>
    );
};

export default OrderItemProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: "white",
        boxShadow: "4px 4px 7px #0000002a"
    },
    productDetailsContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 75,
        aspectRatio: 1,
        alignSelf: "center",
        marginRight: 10,
    },
    title: {
        fontWeight: "500",
        fontSize: 16,
        marginBottom: 5,
    },
    subtitleContainer: {
        flexDirection: "row",
        gap: 5,
    },
    quantity: {
        marginRight: 5,
        fontSize: 18,
        fontWeight: "bold"
    },
    price: {
        color: Colors.light.tint,
        fontWeight: "bold"
    },
});