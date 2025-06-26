import React from 'react'
import { View, Text, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useShoppingCart } from '@/Providers/CartProvider';

const ShoppingCart = () => {
    const cartContext = useShoppingCart();
    // console.log(cartContext)

    return (
        <View>
            <Text>ShoppingCart</Text>

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
};

export default ShoppingCart;