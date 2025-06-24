import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';

const Product = () => {
    const { id }: { id: string } = useLocalSearchParams();

    return (
        <View>
            <Stack.Screen options={{ title: `Product ${id}` }} />
            <Text>Product Id: {id}</Text>
        </View>
    )
};

export default Product;