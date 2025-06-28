import { Pressable } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";


const AdminHeaderRight = (iconName: "plus" | "edit", target: "/" | "/create" | `/create${"" | `?id=${string}`}`) => {
    return (
        <Link href={`/(admin)/menu${target}`} asChild>
            <Pressable>
                {({ pressed }) => (
                    <FontAwesome
                        name={iconName}
                        size={25}
                        style={{
                            marginRight: 15,
                            opacity: pressed ? 0.5 : 1,
                            color: Colors.light.tint
                        }}
                    />
                )}
            </Pressable>
        </Link>
    );
};

export default AdminHeaderRight;