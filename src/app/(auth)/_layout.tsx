import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/Providers/AuthProvider';
import { ActivityIndicator } from 'react-native';


const AuthStack = () => {
    const { session, isLoading } = useAuth();
    
    if (!isLoading && session) return <Redirect href="/" />;
    if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />

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