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

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Soup, ClipboardList } from 'lucide-react-native';
import { View } from "@/components/ui/view";
import { VStack } from '@/components/ui/vstack';
import { Clock, CheckCircle, ShoppingBag } from 'lucide-react-native';


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
    platillos: [1, 4],
    precioFinal: 150.00,
    fecha: '09 Oct 2024',
    hora: '3:16 PM',
    estado: 'En preparación',
  },
  {
    id: 1002,
    platillos: [3],
    precioFinal: 80.00,
    fecha: '09 Oct 2024',
    hora: '2:30 PM',
    estado: 'Listo',
  },
  {
    id: 1001,
    platillos: [1, 4],
    precioFinal: 120.00,
    fecha: '08 Oct 2024',
    hora: '8:12 AM',
    estado: 'Entregado',
  },
];

const getBackgroundColor = (estado: string) => {
  switch (estado) {
    case 'En preparación':
      return '#FFCA99';
    case 'Listo':
      return '#FFECAD';
    case 'Entregado':
      return '#DBFAE1';
    default:
      return '#F08080';
  }
};

const getTextColor = (estado: string) => {
  switch (estado) {
    case 'En preparación':
      return '#E06C00'; 
    case 'Listo':
      return '#CC9C00'; 
    case 'Entregado':
      return '#13902A'; 
    default:
      return '#8B0000'; 
  }
};

const CartScreen: React.FC = () => {
  // Seleccionar el pedido con ID 1003 (provisional)
  const pedido = pedidos.find(p => p.id === 1003);

  if (!pedido) {
    return <Text>No se encontró el pedido.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Heading size={"2xl"} style={styles.order_id}> Pedido {pedido.id} </Heading>
      <Text size={"md"} style={styles.date}> {pedido.fecha}, {pedido.hora} </Text>
      <View style={{ alignSelf: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: getBackgroundColor(pedido.estado), paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, marginBottom: 18, alignSelf: 'flex-start' }}>
          {pedido.estado === 'En preparación' ? (
            <Clock size={16} color={getTextColor(pedido.estado)}/>
          ) : pedido.estado === 'Listo' ? (
            <ShoppingBag size={16} color={getTextColor(pedido.estado)}/>
          ) : (
            <CheckCircle size={16} color={getTextColor(pedido.estado)}/>
          )}
          <Text size='md' style={[styles.status, { color: getTextColor(pedido.estado), marginLeft: 6 }]}>
            {pedido.estado}
          </Text>
        </View>
      </View>
      <View style={[styles.subtitle_container, {marginHorizontal: 30}]}>
        <Soup size={30} color="#183542" style={styles.icon}/>
        <Heading  size={"xl"} style={styles.subtitle}> Productos ordenados </Heading>
      </View>
      
      <VStack space='xl'>
        <View style={styles.details_row}>
          <Text size={"xs"} style={styles.count}>x1</Text>
          <Text size={"lg"} style={styles.dish}>Platillo ejemplo 1</Text>
          <Text size={"lg"} style={styles.dish_price}>$40.00</Text>
        </View>
        <View style={styles.details_row}>
          <Text size={"xs"} style={styles.count}>x3</Text>
          <Text size={"lg"} style={styles.dish}>Platillo ejemplo 2</Text>
          <Text size={"lg"} style={styles.dish_price}>$60.00</Text>
        </View>
        <View style={styles.details_row}>
          <Text size={"xs"} style={styles.count}>x2</Text>
          <Text size={"lg"} style={styles.dish}>Platillo ejemplo 3</Text>
          <Text size={"lg"} style={styles.dish_price}>$65.00</Text>
        </View>
      </VStack>

      <View style={[styles.details_row, {alignItems: 'center'}]}>
        <View style={styles.subtitle_container}>
          <ClipboardList size={27} color="#183542" style={styles.icon}/>
          <Heading  size={"xl"} style={styles.subtitle}> Total </Heading>
        </View>
        <View>
          <Heading size={"xl"} style={styles.price}>$165.00</Heading>
        </View>
      </View>   
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  order_id: {
    color: '#183542',
    paddingTop: 20,
    alignSelf: 'center',
    fontWeight: 'normal',
  },
  date: {
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  status: {
    borderRadius: 60,
    paddingTop: 2,
    paddingRight: 2,
  },
  subtitle_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 35,
  },
  icon: {
    marginVertical: 'auto',
    minWidth: '7%',
  },  
  subtitle: {
    fontWeight: 'normal',
    color: '#183542',
    paddingLeft: 6,
    textAlignVertical: 'bottom',
    paddingTop: 5,
  },
  details_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  count: {
    alignSelf: 'flex-start',
    borderRadius: 5,
    color: '#000',
    height: 25,
    width: '7%',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: '#49BCCE',
  },
  dish: {
    paddingLeft: 6,
    width: '65%',
    textAlignVertical: 'center',
  },
  dish_price: {
    color: '#000',
    height: 30,
    width: '25%',
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  price: {
    textAlign: 'right',
    fontWeight: 'normal',
    paddingTop: 5,
  },
});

export default CartScreen;
