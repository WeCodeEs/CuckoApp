import { View, Text, StyleSheet } from 'react-native';
import RegistrationPhone from '../(registration)/registrationPhone';

export default function Configuration() {
  return (
    <View style={styles.container}>
      <Text>Configuración</Text>
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
