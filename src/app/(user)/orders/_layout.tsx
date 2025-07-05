import { Stack } from 'expo-router';

const OrdersStack = () => {
  return (
    <Stack>
        <Stack.Screen
            name="index"
            options={{
                title: "Orders"
            }}
        />
        <Stack.Screen
            name="[id]"
            options={{
                title: "Loading ..."
            }}
        />
    </Stack>
  )
}

export default OrdersStack;