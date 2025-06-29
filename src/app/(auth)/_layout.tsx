import React from 'react'
import { Stack } from 'expo-router';


const AuthStack = () => {
    return (
        <Stack>
            <Stack.Screen
                name="signIn"
                options={{
                    title: "Sign In"
                }}
            />
            <Stack.Screen
                name="signUp"
                options={{
                    title: "Sign up"
                }}
            />
        </Stack>
    )
}

export default AuthStack;