import { Stack } from "expo-router";

export default function RegistrationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false                
      }}
    >
      <Stack.Screen name="registrationPhone" options={{ title: 'Registro'}} />
      <Stack.Screen name="registrationName" options={{ title: 'Formulario 2'}} />
      <Stack.Screen name="registrationForm" options={{ title: 'Formulario 1'}} />
    </Stack>
  );
}
