import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { View } from "@/components/ui/view";
import { VStack } from '@/components/ui/vstack';
import { Soup, ClipboardList } from 'lucide-react-native';
import { Clock, CheckCircle, ShoppingBag } from 'lucide-react-native';
import { useLocalSearchParams } from "expo-router";
import { Colors } from '@/constants/Colors';

interface Pedido {
  id: number;
  platillos: { id: number, cantidad: number }[];
  precioFinal: number;
  fecha: string;
  hora: string;
  estado: string;
}

const OrderDetailsScreen: React.FC = () => {
  const { pedido } = useLocalSearchParams();
  const parsedPedido: Pedido = pedido ? JSON.parse(pedido as string) : null;

  if (!parsedPedido) {
    return <Text>No se encontró el pedido.</Text>;
  }

  const getBackgroundColor = () => {
    switch (parsedPedido.estado) {
      case 'En preparación': return Colors.light.preparingBackground;
      case 'Listo': return Colors.light.readyBackground;
      case 'Entregado': return Colors.light.deliveredBackground;
      default: return Colors.light.errorBackground;
    }
  };

  const getTextColor = () => {
    switch (parsedPedido.estado) {
      case 'En preparación': return Colors.light.preparing;
      case 'Listo': return Colors.light.ready;
      case 'Entregado': return Colors.light.delivered;
      default: return Colors.light.errorText;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Heading size={"2xl"} style={styles.order_id}>Pedido {parsedPedido.id}</Heading>
      <Text size={"md"} style={styles.date}>{parsedPedido.fecha}, {parsedPedido.hora}</Text>

      <View style={{ alignSelf: 'center' }}>
        <View style={[styles.statusContainer, { backgroundColor: getBackgroundColor() }]}>
          {parsedPedido.estado === 'En preparación' ? <Clock size={16} color={getTextColor()}/>
          : parsedPedido.estado === 'Listo' ? <ShoppingBag size={16} color={getTextColor()}/>
          : <CheckCircle size={16} color={getTextColor()}/>}
          <Text size='md' style={[styles.status, { color: getTextColor(), marginLeft: 6 }]}>{parsedPedido.estado}</Text>
        </View>
      </View>

      <View style={[styles.subtitle_container, { marginHorizontal: 30 }]}>
        <Soup size={30} color={Colors.light.darkBlue} style={styles.icon}/>
        <Heading size={"xl"} style={styles.subtitle}>Productos ordenados</Heading>
      </View>

      <VStack space='xl'>
        {parsedPedido.platillos.map((platillo, index) => (
          <View key={index} style={styles.details_row}>
            <Text size={"xs"} style={styles.count}>x{platillo.cantidad}</Text>
            <Text size={"lg"} style={styles.dish}>Platillo ejemplo {platillo.id}</Text>
            <Text size={"lg"} style={styles.dish_price}>$10.00</Text>
          </View>
        ))}
      </VStack>

      <View style={[styles.details_row, { alignItems: 'center' }]}>
        <View style={styles.subtitle_container}>
          <ClipboardList size={27} color={Colors.light.darkBlue} style={styles.icon}/>
          <Heading size={"xl"} style={styles.subtitle}>Total</Heading>
        </View>
        <Heading size={"xl"} style={styles.price}>${parsedPedido.precioFinal.toFixed(2)}</Heading>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  order_id: {
    color: Colors.light.darkBlue,
    paddingTop: 20,
    alignSelf: 'center',
    fontWeight: 'normal',
  },
  date: {
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 16,
    color:  Colors.light.ash,
  },
  statusContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 20, 
    marginBottom: 18, 
    alignSelf: 'flex-start' 
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
    color:  Colors.light.darkBlue,
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
    color: Colors.light.background,
    height: 25,
    width: '7%',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.light.mediumBlue,
  },
  dish: {
    paddingLeft: 6,
    width: '65%',
    textAlignVertical: 'center',
    color: Colors.light.ash,
  },
  dish_price: {
    color: Colors.light.ash,
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

export default OrderDetailsScreen;