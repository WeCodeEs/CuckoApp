import { Stack } from "expo-router";

export default function RegistrationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false                
      }}
    >
      <Stack.Screen name="registrationPhone" options={{ title: 'Registro'}} />
      <Stack.Screen name="registartionForm" options={{ title: 'Formulario de registro'}} />
    </Stack>
  );
}
