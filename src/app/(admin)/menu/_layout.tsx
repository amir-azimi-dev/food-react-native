import { Stack } from "expo-router";
import AdminHeaderRight from "@/components/AdminHeaderRight";

const MenuStack = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Menu",
                    headerRight: () => AdminHeaderRight("plus", "/create")
                }}
            />
        </Stack>
    );
};

export default MenuStack;