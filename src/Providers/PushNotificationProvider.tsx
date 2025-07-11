import { PropsWithChildren, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync, sendPushNotification } from "@/libs/notifications";
import { Button } from "react-native";


const PushNotificationProvider = ({ children }: PropsWithChildren) => {
    const [expoPushToken, setExpoPushToken] = useState<string>("");
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);

    useEffect(() => {
        (async () => {
            try {
                const token = await registerForPushNotificationsAsync();
                setExpoPushToken(token ?? "");
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
    }, []);

    return children;
};

export default PushNotificationProvider;