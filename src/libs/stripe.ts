import { Alert } from "react-native";
import { supabase } from "./supabase";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
    const { data, error } = await supabase.functions.invoke('payment-sheet', {
        body: { amount }
    });

    if (!data) {
        Alert.alert(`Error: ${error?.message ?? 'no data'}`);
        return {};
    }

    return data;
};

export const initializePaymentSheet = async (amount: number): Promise<boolean> => {
    const { paymentIntent, publishableKey, customer, ephemeralKey } = await fetchPaymentSheetParams(amount);

    if (!publishableKey || !paymentIntent) return false;

    const { error } = await initPaymentSheet({
        merchantDisplayName: "Portfolio",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        defaultBillingDetails: {
            name: 'Amir Azimi',
        },
    });

    return true;
};

export const openPaymentSheet = async (): Promise<boolean> => {
    const { error } = await presentPaymentSheet();

    if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        return false;
    } else {
        Alert.alert('Success', 'Your order is confirmed!');
        return true;
    }
};