import { Stack } from 'expo-router';
import { CustomHeader } from '@/components/CustomHeader';

export default function CartStack() {
  return (
    <Stack
      screenOptions={{
        header: () => <CustomHeader />                
      }}
    >
      <Stack.Screen name="cartScreen" options={{ title: 'Carrito', headerShown: false}} />
    </Stack>
  );
}
