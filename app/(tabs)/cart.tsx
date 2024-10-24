// import { View, Text, StyleSheet } from 'react-native';

// export default function CartScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>Cart</Text>
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





// import { StyleSheet, ScrollView  } from 'react-native';
// import { Text } from '@/components/ui/text';
// import { View } from "@/components/ui/view";
// import { Heading } from '@/components/ui/heading';


// export default function CartScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       <Heading className="text-center" size={"2xl"} style={styles.id_pedido}>Pedido 3001</Heading>
//       <Text size={"md"} className="text-left" style={styles.fecha}>08 Oct 2024, 10:35 AM</Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   id_pedido: {
//     color: '#000',
//     padding: 20,
//     alignSelf: 'center',
//   },
//   fecha: {
//     alignSelf: 'center',
//   }


// });

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Soup, ClipboardList } from 'lucide-react-native';

// Datos de los pedidos
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

// Función para obtener el color de fondo basado en el estado
const getBackgroundColor = (estado: string) => {
  switch (estado) {
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

// Función para obtener el color del texto basado en el estado
const getTextColor = (estado: string) => {
  switch (estado) {
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

const CartScreen: React.FC = () => {
  // Seleccionar el pedido con ID 1003
  const pedido = pedidos.find(p => p.id === 1003);

  if (!pedido) {
    return <Text>No se encontró el pedido.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Renderizar la información del pedido */}
      <Heading className="text-center" size={"2xl"} style={styles.id_pedido}> Pedido {pedido.id} </Heading>
      <Text size={"md"} className="text-left" style={styles.fecha}> {pedido.fecha}, {pedido.hora} </Text>
      <Text
        style={[
          styles.estado,
          { backgroundColor: getBackgroundColor(pedido.estado), color: getTextColor(pedido.estado) }
        ]}
      >
        {pedido.estado}
      </Text>
      <Soup size={30} color="#000" style={styles.iconos}/>
      <ClipboardList size={30} color="#000" style={styles.iconos}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  id_pedido: {
    color: '#000',
    padding: 20,
    alignSelf: 'center',
  },
  fecha: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  estado: {
    alignSelf: 'center',
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 24,
    borderRadius: 60,
    paddingHorizontal: 10,
  },
  iconos: {
    marginLeft: 20,
    marginTop: 20,
  }
});

export default CartScreen;
