import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image, useWindowDimensions, Alert } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { readAsStringAsync } from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import useCreateProduct from '@/hooks/products/useCreateProduct';
import useEditProduct from '@/hooks/products/useEditProduct';
import useAdminSingleProduct from '@/hooks/products/useAdminSingleProduct';
import useDeleteProduct from '@/hooks/products/useDeleteProduct';
import { randomUUID } from 'expo-crypto';
import { supabase } from '@/libs/supabase';
import useProductImage from '@/hooks/useProductImage';

const CreateProduct = () => {
    const { id: productId }: { id: string } = useLocalSearchParams();

    const [isMutating, setIsMutating] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);

    const { data: targetProduct } = useAdminSingleProduct(parseInt(productId));
    const [image, setImage] = useProductImage(targetProduct?.image) as [string | null, React.Dispatch<React.SetStateAction<string | null>>];
    const { mutate: createProduct } = useCreateProduct();
    const { mutate: editProduct } = useEditProduct();
    const { mutate: deleteProduct } = useDeleteProduct();

    const { height } = useWindowDimensions();
    const router = useRouter();

    useEffect(() => {
        if (!targetProduct?.image) return;

        setName(targetProduct.name);
        setPrice(targetProduct.price.toString());

    }, [targetProduct?.id]);

    const pickImage = async () => {
        if (isMutating) return;

        let result = await launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        !result.canceled && setImage(result.assets[0].uri);
    }

    const submitFormHandler = () => productId ? updateProductHandler() : createProductHandler();

    const createProductHandler = async () => {
        if (isMutating) return;

        const isFormValid = validateForm();
        if (!isFormValid) return;

        setIsMutating(true);

        const imagePath = await uploadImageHandler();
        if (image && !imagePath) return;


        createProduct(
            { name, price: parseFloat(price), image: imagePath || null },
            {
                onSuccess: () => {
                    alert("Product created successfully.");
                    setIsMutating(false);
                    router.back();
                    resetForm();
                },
                onError: () => {
                    setIsMutating(false);
                    alert("Error while creating product.");
                }
            }
        );
    };

    const updateProductHandler = async () => {
        if (isMutating) return;

        const isFormValid = validateForm();
        if (!isFormValid) return;

        setIsMutating(true);

        const imagePath = await uploadImageHandler();
        if (image && !imagePath) return;

        editProduct(
            { id: parseInt(productId), name, price: parseFloat(price), image: imagePath || null },
            {
                onSuccess: () => {
                    alert("Product modified successfully.");
                    setIsMutating(false);
                    router.back();
                    resetForm();
                },
                onError: () => {
                    setIsMutating(false);
                    alert("Error while modifying product.");
                }
            }
        );
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

    const uploadImageHandler = async (): Promise<string | false> => {
        if (!image || !image.startsWith("file://")) return false;

        const base64 = await readAsStringAsync(image, { encoding: "base64" });
        const fileName = randomUUID() + image.split("/").at(-1);
        const contentType = `image/${image.split(".").at(-1)}`;

        const { data, error } = await supabase.storage.from("product-images").upload(fileName, decode(base64), { contentType })
        if (error) {
            alert(error.message);
            return false;
        }

        return data.path;
    };

    const removeProductHandler = (): void => {
        if (isMutating) return;

        Alert.alert(
            "Remove Product",
            "Are you sure you want to remove this product?",
            [
                { text: "Cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => removeProduct()

                }
            ]
        );
    };

    const removeProduct = () => {
        setIsMutating(true);

        deleteProduct(
            { id: parseInt(productId) },
            {
                onSuccess: () => {
                    alert("Product removed successfully.");
                    router.replace("/(admin)/menu");
                    resetForm();
                },
                onError: () => {
                    setIsMutating(true);
                    alert("Error while removing product.");
                }
            }
        );
    };

    const resetForm = (): void => {
        setName("");
        setPrice("");
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{ title: productId ? "Edit Product" : "Create a Product" }}
            />

            <Image
                source={{ uri: image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HE8d6CHpgkSQUqUqkZbUFi_5N_LJ0FYeUA&s" }}
                style={[styles.image, { maxHeight: height / 3 }]}
            />
            <Text style={[styles.selectImage, { opacity: isMutating ? 0.4 : 1 }]} onPress={pickImage}>Select Image</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>title</Text>
                <TextInput
                    placeholder="Peperoni"
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
                    placeholder="9.9"
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

            <Pressable style={[styles.button, { opacity: isMutating ? 0.4 : 1 }]} onPress={submitFormHandler}>
                {isMutating ? (
                    <Text style={styles.buttonText}>{productId ? "Editing Product ..." : "Creating Product ..."}</Text>

                ) : (
                    <Text style={styles.buttonText}>{productId ? "Edit Product" : "Create Product"}</Text>
                )}
            </Pressable>

            {productId && <Text style={[styles.buttonText, styles.removeButtonText, { opacity: isMutating ? 0.4 : 1 }]} onPress={removeProductHandler}>Delete</Text>}
        </View >
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

    removeButtonText: {
        marginTop: 10,
        color: "#ff2222",
        fontWeight: 500
    }
});