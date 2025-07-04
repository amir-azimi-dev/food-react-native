import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native'
import { Link, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { supabase } from '@/libs/supabase';

const SignIn = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);

    const router = useRouter();

    const signInHandler = async () => {
        if (isLoading) return;

        const isFormValid = validateForm();
        if (!isFormValid) return;

        setIsLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setIsLoading(false);

        if (error) return Alert.alert("Error", error.message, [{ text: "ok" }]);

        alert("You signed in successfully.")
        resetForm();
        setTimeout(() => router.replace("/"), 50);
    };

    const validateForm = (): boolean => {
        let newErrors: string[] = [];

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            newErrors = [...newErrors, "Email is invalid."];
        }

        if (password.length < 8) {
            newErrors = [...newErrors, "Password must have at least 8 characters."];
        }

        setErrors(newErrors);
        const isFormValid = newErrors.length ? false : true;
        return isFormValid;
    };

    const resetForm = (): void => {
        setEmail("");
        setPassword("");
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="test@gmail.com"
                    keyboardType="email-address"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            {errors.length > 0 && (
                <View style={styles.errorContainer}>
                    {errors.map((error, index) => (
                        <Text key={index} style={styles.error}>{error}</Text>
                    ))}
                </View>
            )}

            <Pressable style={[styles.button, { opacity: isLoading ? 0.4 : 1 }]} onPress={signInHandler}>
                <Text style={styles.buttonText}>{isLoading ? "Signing In ..." : "Sign In"}</Text>
            </Pressable>

            <Text style={styles.linkText}>
                don't hav an account?{" "}
                <Link style={styles.link} href="/signUp">Sign Up</Link>
            </Text>
        </View>
    )
};

export default SignIn;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10,
        paddingTop: 20
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

    linkText: {
        marginTop: 10,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.light.tint
    },

    link: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.light.tint,
        textDecorationLine: "underline"
    }
});