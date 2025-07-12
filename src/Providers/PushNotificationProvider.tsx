import { PropsWithChildren, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/libs/notifications";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/libs/supabase";


const PushNotificationProvider = ({ children }: PropsWithChildren) => {
    const [expoPushToken, setExpoPushToken] = useState<string>("");
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);

    const { session } = useAuth();

    useEffect(() => {
        if (!session) return;

        (async () => {
            try {
                const token = await registerForPushNotificationsAsync();
                setExpoPushToken(token ?? "");
                await updateUserExpoPushToken(token ?? "");
                
            } catch (error) {
                setExpoPushToken(`${error}`);
            }
        })();

        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, [session]);

    const updateUserExpoPushToken = async (newToken: string): Promise<void> => {
        if (!session || !newToken) return;
        await supabase.from("profiles").update({ expo_push_token: newToken }).eq("id", session.user.id);
    };


    return children;
};

export default PushNotificationProvider;