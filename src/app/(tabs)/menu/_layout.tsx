import { Stack } from "expo-router";

const MenuStack = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ title: "Menu" }}
            />
        </Stack>
    );
};

export default MenuStack;