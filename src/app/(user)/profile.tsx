import { supabase } from '@/libs/supabase';
import { useAuth } from '@/Providers/AuthProvider';
import { Redirect } from 'expo-router';
import { useState } from 'react'
import { Text, Pressable, StyleSheet, Alert, View, ActivityIndicator } from 'react-native'

const profile = () => {
    const { session, isLoading } = useAuth();
    const [isSigningOut, setIsSigningOut] = useState<boolean>(false);


    if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />
    if (!isLoading && !session) return <Redirect href="/" />;

    const signOutHandler = async () => {
        setIsSigningOut(true);
        const { error } = await supabase.auth.signOut();
        setIsSigningOut(false);

        if (error) return Alert.alert("Error", error.message, [{ text: "ok" }]);

        alert("You signed out successfully.");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.emailTitle}>Your Email: <Text style={styles.email}>{session?.user.email}</Text></Text>


            <Pressable
                style={[styles.button, { opacity: isSigningOut ? 0.4 : 1 }]}
                onPress={signOutHandler}
            >
                <Text style={styles.buttonText}>{isSigningOut ? "Signing Out ..." : "Sign Out"}</Text>
            </Pressable>
        </View>
    )
};

export default profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10,
        gap: 15
    },

    emailTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "gray",
        marginHorizontal: "auto"
    },


    email: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000"
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