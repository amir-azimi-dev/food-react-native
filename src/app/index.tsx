import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

const index = () => {
    return (
        <View style={styles.container}>
            <Link href={'/(user)'} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>User</Text>
                </Pressable>
            </Link>
            <Link href={'/(admin)/menu'} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Admin</Text>
                </Pressable>
            </Link>
            <Link href={'/(auth)/signIn'} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Sign In/Up</Text>
                </Pressable>
            </Link>
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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