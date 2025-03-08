// order_details.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { View } from "@/components/ui/view";
import { VStack } from '@/components/ui/vstack';
import { Soup, ClipboardList } from 'lucide-react-native';
import { Clock, CheckCircle, ShoppingBag } from 'lucide-react-native';
import { useLocalSearchParams } from "expo-router";
import { Colors } from '@/constants/Colors';
import { useToast } from '@/components/ui/toast';
import ErrorToast from '@/components/ErrorToast';
import { Order } from '@/constants/types';
import { fetchOrderById } from '@/constants/api';

const OrderDetailsScreen: React.FC = () => {
  const { orderId } = useLocalSearchParams();
  const toast = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const fetchedOrder = await fetchOrderById(Number(orderId));
        if (!fetchedOrder) {
          throw new Error("Pedido no encontrado");
        }
        setOrder(fetchedOrder);
      } catch (error) {
        console.error("Error verificando la existencia del pedido:", error);
        toast.show({
          id: "order-error",
          placement: 'top',
          duration: 5000,
          render: ({ id }) => (
            <ErrorToast
              id={id}
              message="Pedido no encontrado"
              onClose={() => toast.close(id)}
            />
          ),
        });
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.light.darkBlue} />;
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>Pedido no encontrado</Text>
      </View>
    );
  }

  const getBackgroundColor = () => {
    switch (order.status) {
      case 'Esperando confirmación': return Colors.light.lightGray;
      case 'En preparación': return Colors.light.preparingBackground;
      case 'Listo': return Colors.light.readyBackground;
      case 'Entregado': return Colors.light.deliveredBackground;
      default: return Colors.light.errorBackground;
    }
  };

  const getTextColor = () => {
    switch (order.status) {
      case 'Esperando confirmación': return Colors.light.ash;
      case 'En preparación': return Colors.light.preparing;
      case 'Listo': return Colors.light.ready;
      case 'Entregado': return Colors.light.delivered;
      default: return Colors.light.errorText;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Heading size={"2xl"} style={styles.orderId}>Pedido {order.id}</Heading>
      <Text size={"md"} style={styles.date}>{order.date}, {order.time}</Text>

      <View style={{ alignSelf: 'center' }}>
        <View style={[styles.statusContainer, { backgroundColor: getBackgroundColor() }]}>
          {(order.status === 'En preparación' || order.status === 'Esperando confirmación') ? <Clock size={16} color={getTextColor()}/>
          : order.status === 'Listo' ? <ShoppingBag size={16} color={getTextColor()}/>
          : <CheckCircle size={16} color={getTextColor()}/>}
          <Text size='md' style={[styles.status, { color: getTextColor(), marginLeft: 6 }]}>{order.status}</Text>
        </View>
      </View>

      <View style={[styles.subtitleContainer, { marginHorizontal: 30 }]}>
        <Soup size={30} color={Colors.light.darkBlue} style={styles.icon}/>
        <Heading size={"xl"} style={styles.subtitle}>Productos Ordenados</Heading>
      </View>

      <VStack space='xl'>
        {order.items.map((item, index) => (
          <View key={index} style={styles.detailsRow}>
            <Text size={"xs"} style={styles.count}>x{item.quantity}</Text>
            <Text size={"lg"} style={styles.dish}>Platillo ejemplo {item.id}</Text>
            <Text size={"lg"} style={styles.dishPrice}>$10.00</Text>
          </View>
        ))}
      </VStack>

      <View style={[styles.detailsRow, { alignItems: 'center' }]}>
        <View style={styles.subtitleContainer}>
          <ClipboardList size={27} color={Colors.light.darkBlue} style={styles.icon}/>
          <Heading size={"xl"} style={styles.subtitle}>Total</Heading>
        </View>
        <Heading size={"xl"} style={styles.price}>${order.finalPrice.toFixed(2)}</Heading>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  orderId: {
    color: Colors.light.darkBlue,
    paddingTop: 20,
    alignSelf: 'center',
    fontWeight: 'normal',
  },
  date: {
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: Colors.light.ash,
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
  subtitleContainer: {
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
    color: Colors.light.darkBlue,
    paddingLeft: 6,
    textAlignVertical: 'bottom',
    paddingTop: 5,
  },
  detailsRow: {
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
  dishPrice: {
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
