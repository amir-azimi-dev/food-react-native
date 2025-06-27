import { Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

const HeaderRight = (iconName: "plus" | "edit", target: "/(admin)/menu" | "/cart") => {
    const colorScheme = useColorScheme();

    return (
        <Link href={target} asChild>
            <Pressable>
                {({ pressed }) => (
                    <FontAwesome
                        name={iconName}
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
                    headerRight: () => HeaderRight("plus", "/(admin)/menu")
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Menu",
                    headerRight: () => HeaderRight("edit", "/cart")
                }}
            />
        </Stack>
    );
};

export default MenuStack;