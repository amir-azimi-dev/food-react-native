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
    </Stack>
  )
}

export default OrdersStack;