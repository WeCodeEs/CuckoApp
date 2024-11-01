import { View, Text, StyleSheet } from 'react-native';

export default function RegistrationForm() {
  return (
    <View style={styles.container}>
      <Text>Formulario de Registro</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
