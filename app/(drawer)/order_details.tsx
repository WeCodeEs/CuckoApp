import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Soup, ClipboardList } from 'lucide-react-native';
import { View } from "@/components/ui/view";
import { VStack } from '@/components/ui/vstack';
import { Clock, CheckCircle, ShoppingBag } from 'lucide-react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Center } from '@/components/ui/center';
import { Colors } from '@/constants/Colors';

type RootStackParamList = {
    order_details: { pedido: Pedido };
  };

interface Pedido {
  id: number;
  platillos: number[];
  precioFinal: number;
  fecha: string;
  hora: string;
  estado: string;
}

const getBackgroundColor = (estado: string) => {
  switch (estado) {
    case 'En preparación':
      return Colors.light.preparingBackground;
    case 'Listo':
      return Colors.light.readyBackground;
    case 'Entregado':
      return Colors.light.deliveredBackground;
    default:
      return Colors.light.errorBackground;
  }
};

const getTextColor = (estado: string) => {
  switch (estado) {
    case 'En preparación':
      return Colors.light.preparing;
    case 'Listo':
      return Colors.light.ready; 
    case 'Entregado':
      return Colors.light.delivered; 
    default:
      return Colors.light.errorText;
  }
};

type OrderDetailsRouteProp = RouteProp<RootStackParamList, 'order_details'>;

const OrderDetailsScreen: React.FC = () => {
  const route = useRoute<OrderDetailsRouteProp>();
  const { pedido } = route.params;

  if (!pedido) {
    return <Text>No se encontró el pedido.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Heading size={"2xl"} style={styles.order_id}> Pedido {pedido.id} </Heading>
      <Text size={"md"} style={styles.date}> {pedido.fecha}, {pedido.hora} </Text>
      <View style={{ alignSelf: 'center' }}>
          <View style={[styles.statusContainer,{backgroundColor: getBackgroundColor(pedido.estado)}]}>
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
        <Soup size={30} color={Colors.light.darkBlue} style={styles.icon}/>
        <Heading  size={"xl"} style={styles.subtitle}> Productos ordenados </Heading>
      </View>
      
      {/* Lista de pedidos temporal en espera del esquema final en jsonbin */}
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
          <ClipboardList size={27} color={Colors.light.darkBlue} style={styles.icon}/>
          <Heading  size={"xl"} style={styles.subtitle}> Total </Heading>
        </View>
        <View>
          <Heading size={"xl"} style={styles.price}>${pedido.precioFinal.toFixed(2)}</Heading>
        </View>
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