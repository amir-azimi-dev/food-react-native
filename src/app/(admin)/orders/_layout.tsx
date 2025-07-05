import { Stack } from 'expo-router';

const OrdersStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="list"
        options={{ headerShown: false }}
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