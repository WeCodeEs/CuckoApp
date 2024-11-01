import { View, Text, StyleSheet } from 'react-native';

export default function PaymentMethods() {
  return (
    <View style={styles.container}>
      <Text>Métodos de Pago</Text>
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
