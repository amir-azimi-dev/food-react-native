import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image, useWindowDimensions } from 'react-native'
import Colors from '@/constants/Colors';
import { launchImageLibraryAsync } from 'expo-image-picker';

const CreateProduct = () => {
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);

    const { height } = useWindowDimensions();

    const pickImage = async () => {
        let result = await launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        !result.canceled && setImage(result.assets[0].uri);
    }

    const createProductHandler = () => {
        const isFormValid = validateForm();
        if (!isFormValid) return;

        alert("Product created successfully.")

        resetForm();
    };

    const validateForm = (): boolean => {
        let newErrors: string[] = [];

        if (name.length <= 3) {
            newErrors = [...newErrors, "Product name must be at least 3 characters."];
        }

        if (!Number(price) || Number(price) < 0) {
            newErrors = [...newErrors, "Product price must be a valid number."];
        }

        setErrors(newErrors);
        const isFormValid = newErrors.length ? false : true;
        return isFormValid;
    };

    const resetForm = (): void => {
        setName("");
        setPrice("");
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HE8d6CHpgkSQUqUqkZbUFi_5N_LJ0FYeUA&s" }}
                style={[styles.image, { maxHeight: height / 3 }]}
            />
            <Text style={styles.selectImage} onPress={pickImage}>Select Image</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>title</Text>
                <TextInput
                    placeholder="Peperoni ..."
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>price ($)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="9.9 ..."
                    value={price}
                    onChangeText={setPrice}
                />
            </View>

            {errors.length > 0 && (
                <View style={styles.errorContainer}>
                    {errors.map((error, index) => (
                        <Text key={index} style={styles.error}>{error}</Text>
                    ))}
                </View>
            )}

            <Pressable style={styles.button} onPress={createProductHandler}>
                <Text style={styles.buttonText}>Create Product</Text>
            </Pressable>
        </View>
    )
};

export default CreateProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 20
    },

    image: {
        width: "100%",
        aspectRatio: 1,
        marginBottom: 10,
        marginHorizontal: "auto",
        borderRadius: 1000
    },

    selectImage: {
        marginVertical: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.light.tint
    },

    inputContainer: {
        marginBottom: 10
    },

    label: {
        fontSize: 16,
        fontWeight: 700,
        color: "gray"
    },

    input: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 5
    },

    errorContainer: {
        marginBottom: 10
    },

    error: {
        color: "#ff2222",
        fontWeight: 500
    },

    button: {
        paddingVertical: 10,
        backgroundColor: Colors.light.tint,
        borderRadius: 10
    },

    buttonText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },
});