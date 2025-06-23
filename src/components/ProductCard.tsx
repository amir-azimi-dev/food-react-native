import { Text, View, StyleSheet, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { Product } from '@/types';

const ProductCard = ({ id, name, price, image }: Product) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    // source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HE8d6CHpgkSQUqUqkZbUFi_5N_LJ0FYeUA&s" }}
                    // source={image ? { uri: image } : require("@/../assets/images/pepperoni.jpeg")}
                    source={require("@/../assets/images/pepperoni.jpeg")}
                    style={styles.image}
                />
            </View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.price}>${price}</Text>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        backgroundColor: "#fff",
        borderRadius: 20,
        boxShadow: "4px 4px 7px #0000001a"
    },
    imageContainer: {
        width: "100%",
        aspectRatio: 1
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 10
    },
    price: {
        color: Colors.light.tint,
        fontWeight: "bold"
    }
});