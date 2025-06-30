import { useState } from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Alert } from "react-native";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/Providers/AuthProvider";
import { supabase } from "@/libs/supabase";

const index = () => {
    const [isSigningOt, setIsSigningOut] = useState<boolean>(false);
    const { session, isLoading } = useAuth();


    const signOutHandler = async () => {
        setIsSigningOut(true);
        const { error } = await supabase.auth.signOut();
        setIsSigningOut(false);

        if (error) return Alert.alert("Error", error.message, [{ text: "ok" }]);

        alert("You signed out successfully.");
    };

    if (!isLoading && !session) return <Redirect href="/signIn" />;
    if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />

    return (
        <View style={styles.container}>
            <Link href={"/(user)"} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>User</Text>
                </Pressable>
            </Link>
            <Link href={"/(admin)/menu"} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Admin</Text>
                </Pressable>
            </Link>
            <Link href={"/(auth)/signIn"} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Sign In/Up</Text>
                </Pressable>
            </Link>
            <Pressable
                style={[styles.button, { opacity: isSigningOt ? 0.4 : 1 }]}
                onPress={signOutHandler}
            >
                <Text style={styles.buttonText}>{isSigningOt ? "Signing Out ..." : "Sign Out"}</Text>
            </Pressable>
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10,
        gap: 10
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
});