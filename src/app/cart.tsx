import React, { useEffect, useState } from 'react'
import { View, Text, Platform, StyleSheet, FlatList, Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useShoppingCart } from '@/Providers/CartProvider';
import CartItem from '@/components/CartItem';

const ShoppingCart = () => {
    const cartContext = useShoppingCart();

    const checkoutOrderHandler = (): void => {
        alert("Your order checked out successfully ...");
        // ...
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ShoppingCart</Text>

            {cartContext.items.length ? (
                <>
                    <FlatList
                        data={cartContext.items}
                        renderItem={({ item }) => <CartItem key={item.id} data={item} />}
                        numColumns={1}
                        contentContainerStyle={{ gap: 10 }}
                    />

                    <Text style={styles.totalPrice}>Total Price: ${cartContext.totalPrice}</Text>
                    <Pressable style={styles.button} onPress={checkoutOrderHandler}>
                        <Text style={styles.buttonText}>Checkout</Text>
                    </Pressable>
                </>
            ) : (
                <View>
                    <Text style={styles.notFound}>Your basket is empty.</Text>
                </View>
            )}

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
};

export default ShoppingCart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff"
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },

    totalPrice: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: "bold"
    },

    button: {
        paddingVertical: 10,
        backgroundColor: "#0066ff",
        borderRadius: 10
    },

    buttonText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },

    notFound: {
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#00aaff",
        color: "#fff",
        borderRadius: 8
    }
});