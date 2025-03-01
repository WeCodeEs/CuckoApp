import { View, Text, StyleSheet } from 'react-native';

export default function CartSchedule() {
  return (
    <View style={styles.container}>
      <Text>Programar Envío</Text>
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

