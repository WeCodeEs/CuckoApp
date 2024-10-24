import { Stack } from 'expo-router';
import { CustomHeader } from '@/components/CustomHeader';

export default function HomeStack() {
  return (
    <Stack
      screenOptions={{
        header: () => <CustomHeader />                
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home'}} />
      <Stack.Screen name="detail_product" options={{ title: 'Details', headerShown: false}} />
    </Stack>
  );
}
