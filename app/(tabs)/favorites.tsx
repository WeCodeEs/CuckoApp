// import { View, Text, StyleSheet } from 'react-native';

// export default function FavoritesScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>Favorites</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { View } from "@/components/ui/view";
import Constants from 'expo-constants';

interface Pedido {
  id: number;
  platillos: number[];
  precioFinal: number;
  fecha: string;
  hora: string;
  estado: string;
}

const pedidos: Pedido[] = [
  {
    id: 1003,
    platillos: [101, 102],
    precioFinal: 150.00,
    fecha: '09 Oct 2024',
    hora: '3:16 PM',
    estado: 'En preparación',
  },
  {
    id: 1002,
    platillos: [103],
    precioFinal: 80.00,
    fecha: '09 Oct 2024',
    hora: '2:30 PM',
    estado: 'Listo',
  },
  {
    id: 1001,
    platillos: [103],
    precioFinal: 120.00,
    fecha: '08 Oct 2024',
    hora: '8:12 AM',
    estado: 'Entregado',
  },
];

const PedidoCard: React.FC<{ pedido: Pedido }> = ({ pedido }) => {
  const getBackgroundColor = () => {
    switch (pedido.estado) {
      case 'En preparación':
        return '#FFCA99'; // Naranja claro
      case 'Listo':
        return '#FFECAD'; // Amarillo claro
      case 'Entregado':
        return '#DBFAE1'; // Verde claro
      default:
        return '#F08080'; // Rojo claro por defecto
    }
  };

  const getTextColor = () => {
    switch (pedido.estado) {
      case 'En preparación':
        return '#E06C00'; // Naranja oscuro
      case 'Listo':
        return '#CC9C00'; // Amarillo oscuro
      case 'Entregado':
        return '#13902A'; // Verde oscuro
      default:
        return '#8B0000'; // Rojo oscuro por defecto
    }
  };

  return (
    <Box style={styles.card}>
      <View>
        <Text style={[styles.estado, { backgroundColor: getBackgroundColor(), color: getTextColor()}]}>{pedido.estado}</Text>
        <Text style={[styles.text,{paddingLeft: 6}]}>Número de pedido</Text>
        <Text style={[styles.text,{color: "#000",paddingLeft: 6, fontWeight: 'bold'}]}>{pedido.id}</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.precio}>${pedido.precioFinal.toFixed(2)}</Text>
        <Text style={styles.text}>{pedido.fecha}</Text>
        <Text style={styles.text}>{pedido.hora}</Text>
      </View>
    </Box>
  );
};

const FavoritesScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <VStack space={"lg"}>
        {pedidos.map((pedido) => (
          <PedidoCard key={pedido.id} pedido={pedido} />
        ))}
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 20 + Constants.statusBarHeight,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    margin: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
  },
  text: {
    fontSize: 14,
    //marginBottom: 8,
    lineHeight: 20,
  },
  num_pedido: {
    // fontSize: 14,
    // //marginBottom: 8,
    // lineHeight: 20,
    // color: "#000",
    // paddingLeft: 6,
  },
  precio: {
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 24,
    fontWeight: 'bold',
    color: "#000",
  },
  estado: {
    fontSize: 14,
    //fontWeight: 'bold',
    marginBottom: 5,
    lineHeight: 24,
    borderRadius: 60,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
});

export default FavoritesScreen;