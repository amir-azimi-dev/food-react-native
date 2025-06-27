import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { CartItem as CartItemType } from '../types';
import { useShoppingCart } from '@/Providers/CartProvider';

const CartItem = ({ data }: { data: CartItemType }) => {
    const router = useRouter();
    const navigation = useNavigation();

    const { onUpdateQuantity } = useShoppingCart();

    const showProductDetailsHandler = () => {
        navigation.goBack();
        router.push(`/menu/${data.product.id}`);
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
                    <Text style={styles.title}>{data.product.name}</Text>
                    <View style={styles.subtitleContainer}>
                        <Text style={styles.price}>${data.product.price.toFixed(2)}</Text>
                        <Text>Size: {data.size}</Text>
                    </View>
                </View>
            </Pressable>
            <View style={styles.quantitySelector}>
                <FontAwesome
                    name="minus"
                    style={{ padding: 5, color: data.quantity === 1 ? "#ff0000aa" : "gray" }}
                    onPress={() => onUpdateQuantity(data.id, -1)}
                />

                <Text style={styles.quantity}>{data.quantity}</Text>
                <FontAwesome
                    name="plus"
                    color="gray"
                    style={{ padding: 5, opacity: data.quantity === 10 ? 0.3 : 1 }}
                    onPress={() => onUpdateQuantity(data.id, 1)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingBottom: 10,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        borderBottomColor: "#00000011",
        borderBottomWidth: 1
    },
    productDetailsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 75,
        aspectRatio: 1,
        alignSelf: 'center',
        marginRight: 10,
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 5,
    },
    subtitleContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    quantitySelector: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    quantity: {
        fontWeight: '500',
        fontSize: 18,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
});

export default CartItem;