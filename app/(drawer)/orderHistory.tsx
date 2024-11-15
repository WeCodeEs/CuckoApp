import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { View } from "@/components/ui/view";
import { Pressable } from '@/components/ui/pressable';
import { Clock, ChevronRight, CheckCircle, ShoppingBag } from 'lucide-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

type RootStackParamList = {
  order_details: { pedido: Pedido };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'order_details'>;

interface Pedido {
  id: number;
  platillos: { id: number, cantidad: number }[];
  precioFinal: number;
  fecha: string;
  hora: string;
  estado: string;
}

const pedidos: Pedido[] = [
  {
    id: 1003,
    platillos: [{ id: 1, cantidad: 2 }, { id: 4, cantidad: 1 }],
    precioFinal: 150.00,
    fecha: '09 Oct 2024',
    hora: '3:16 PM',
    estado: 'En preparación',
  },
  {
    id: 1002,
    platillos: [{ id: 3, cantidad: 1 }, { id: 2, cantidad: 3 }],
    precioFinal: 80.00,
    fecha: '09 Oct 2024',
    hora: '2:30 PM',
    estado: 'Listo',
  },
  {
    id: 1001,
    platillos: [{ id: 4, cantidad: 4 }, { id: 2, cantidad: 1 }],
    precioFinal: 120.00,
    fecha: '08 Oct 2024',
    hora: '8:12 AM',
    estado: 'Entregado',
  },
];

const PedidoCard: React.FC<{ pedido: Pedido }> = ({ pedido }) => {
  const navigation = useNavigation<NavigationProp>();

  const getBackgroundColor = () => {
    switch (pedido.estado) {
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

  const getTextColor = () => {
    switch (pedido.estado) {
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

  return (
    <Pressable style={styles.card} onPress={() => navigation.navigate('order_details', {pedido})}>
      <View style={{ maxWidth: '68%'}}>
        <Heading style={styles.order} size='lg'>Pedido {pedido.id}</Heading>
        <View style={{ alignSelf: 'flex-start' }}>
          <View style={[styles.status_container, {backgroundColor: getBackgroundColor()}]}>
            {pedido.estado === 'En preparación' ? (
              <Clock size={14} color={getTextColor()} style={styles.icon}/>
            ) : pedido.estado === 'Listo' ? (
              <ShoppingBag size={14} color={getTextColor()} style={styles.icon}/>
            ) : (
              <CheckCircle size={14} color={getTextColor()} style={styles.icon}/>
            )}
            <Text size='sm' style={[styles.status, { color: getTextColor(), marginLeft: 6 }]}>
              {pedido.estado}
            </Text>
          </View>
        </View>
        <Text style={styles.date}>{pedido.fecha}</Text>
      </View>
      <View style={{height: 'auto', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: '35%'}}>
        <ChevronRight size={30} color={Colors.light.darkBlue}/>
        <Heading size='lg' style={styles.price}>${pedido.precioFinal.toFixed(2)}</Heading>
      </View>
    </Pressable>
  );
};

const OrderHistoryScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <VStack space={"lg"}>
        {pedidos.map((pedido) => (
          <PedidoCard key={pedido.id} pedido={pedido}/>
        ))}
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: 15,
    padding: 16,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    margin: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
  },
  order: {
    color:  Colors.light.darkBlue,
    padding: 2,
    paddingLeft: 6, 
    fontWeight: 'normal',
  },
  icon: {
   marginVertical: 'auto',
   alignSelf: 'flex-start',
  },
  status_container: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal: 5, 
    paddingVertical: 2, 
    borderRadius: 20, 
    marginBottom: 18, 
    alignSelf: 'flex-start'
  },
  status: {
    borderRadius: 60,
    paddingRight: 2,
  },
  date: {
    paddingLeft: 6, 
    fontSize: 12,
    lineHeight: 20,
    color: Colors.light.ash,
  },
  price: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal',
    color:  Colors.light.darkBlue,
  },
});

export default OrderHistoryScreen;