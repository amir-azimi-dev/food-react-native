import { Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

const HeaderRight = () => {
    const colorScheme = useColorScheme();

    return (
        <Link href="/cart" asChild>
            <Pressable>
                {({ pressed }) => (
                    <FontAwesome
                        name="shopping-cart"
                        size={25}
                        style={{
                            marginRight: 15,
                            opacity: pressed ? 0.5 : 1,
                            color: Colors[colorScheme ?? "light"].tint
                        }}
                    />
                )}
            </Pressable>
        </Link>
    );
};

const MenuStack = () => {

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Menu",
                    headerRight: HeaderRight
                }}
            />
        </Stack>
    );
};

export default MenuStack;