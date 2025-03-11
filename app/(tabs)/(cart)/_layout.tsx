import { Stack } from 'expo-router';
import { CustomHeader } from '@/components/CustomHeader';
import { StripeProvider } from '@stripe/stripe-react-native';

const STRIPE_PUBLIC_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY ?? "";

export default function CartStack() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
      <Stack
        screenOptions={{
          header: () => <CustomHeader />                
        }}
      >
        <Stack.Screen name="cartScreen" options={{ title: 'Carrito', headerShown: false}} />
      </Stack>
    </StripeProvider>
  );
}
