import { Stack } from 'expo-router';

const OrdersStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="list"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}

export default OrdersStack;