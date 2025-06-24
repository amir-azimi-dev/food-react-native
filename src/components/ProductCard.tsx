import { Text, Pressable, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { Product } from '@/types';

const ProductCard = ({ id, name, price, image }: Product) => {

    return (
        <Link href={`/menu/${id}`} style={styles.link} asChild>
            <Pressable style={styles.container}>
                <Image
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HE8d6CHpgkSQUqUqkZbUFi_5N_LJ0FYeUA&s" }}
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
        boxShadow: "4px 4px 7px #0000002a"
    },
    image: {
        maxWidth: "100%",
        aspectRatio: 1,
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