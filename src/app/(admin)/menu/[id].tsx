import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable, Dimensions, useWindowDimensions } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from "@/../assets/data/products";
import { PizzaSize, Product as ProductType } from '@/types';
import { useShoppingCart } from '@/Providers/CartProvider';

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const Product = () => {
    const { id }: { id: string } = useLocalSearchParams();

    const [product, setProduct] = useState<ProductType | null>(null);
    const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

    const { height } = useWindowDimensions();
    const { onAddToCart } = useShoppingCart();
    const router = useRouter();

    useEffect(() => {
        const targetProduct = products.find(product => product.id === parseInt(id));
        targetProduct ? setProduct(targetProduct) : router.push("/menu");

    }, [id]);

    const addToCartHandler = (): void => {
        if (!product) return;

        const newItemData = {
            id: "",
            product,
            quantity: 1,
            size: selectedSize
        };

        onAddToCart(newItemData);
        router.push("/cart");
    };

    return product ? (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />

            <Image
                // source={image ? { uri: image } : require("@/../assets/images/pepperoni.jpeg")}
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HE8d6CHpgkSQUqUqkZbUFi_5N_LJ0FYeUA&s" }}
                resizeMode="contain"
                style={[styles.productImage, { maxHeight: height / 2 }]}
            />

            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>
        </View>
    ) : (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Unknown Product" }} />
            <Text style={styles.notFound}>Product not found</Text>
        </View>
    );
};

export default Product;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: "#fff"
    },

    productImage: {
        width: "100%",
        maxHeight: Dimensions.get("window").height / 2,
        aspectRatio: 1,
        marginHorizontal: "auto"
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
    },

    selectSize: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10
    },

    sizeContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: "auto"
    },

    size: {
        width: 50,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 25,
    },

    sizeText: {
        fontSize: 20,
        fontWeight: "bold"
    },

    price: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5
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
        marginTop: 20,
        paddingVertical: 10,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#00aaff",
        color: "#fff",
        borderRadius: 8
    }
});