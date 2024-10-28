import { View, Text, StyleSheet } from 'react-native';

export default function Configuration() {
  return (
    <View style={styles.container}>
      <Text>Historial Pedidos</Text>
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
