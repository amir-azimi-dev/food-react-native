import { Text, Pressable, StyleSheet, Image } from 'react-native';
import { Link, useSegments } from 'expo-router';
import Colors from '@/constants/Colors';
import { Tables } from '@/types';
import useProductImage from '@/hooks/useProductImage';

const ProductCard = ({ id, name, price, image }: Tables<"products">) => {
    const segment = useSegments();
    const currentMode = segment[0] as "(admin)" | "(user)";

    const [imageUrl] = useProductImage(image);

    return (
        <Link href={{ pathname: `/${currentMode}/menu/[id]`, params: { id } }} style={styles.link} asChild>
            <Pressable style={styles.container}>
                <Image
                    source={{ uri: imageUrl as (string | null) || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HE8d6CHpgkSQUqUqkZbUFi_5N_LJ0FYeUA&s" }}
                    // source={image ? { uri: image } : require("@/../assets/images/pepperoni.jpeg")}
                    // source={require("@/../assets/images/pepperoni.jpeg")}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.price}>${price}</Text>
                <Text>go to details</Text>
            </Pressable>
        </Link>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: "48%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        borderColor: "#00000011",
        borderWidth: 1,
        boxShadow: "4px 4px 7px #0000002a"
    },
    image: {
        maxWidth: "100%",
        aspectRatio: 1,
        borderRadius: 1000
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 4
    },
    price: {
        color: Colors.light.tint,
        fontWeight: "bold",
    },
    link: {
    }
});