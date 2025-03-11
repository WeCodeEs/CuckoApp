import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Pressable } from '@/components/ui/pressable';
import { Clock, ChevronRight, CheckCircle, ShoppingBag } from 'lucide-react-native';
import { useRouter } from "expo-router"; 
import { Colors } from '@/constants/Colors';
import { Order } from '@/constants/types';
import { fetchAllOrders, fetchOrderById } from '@/constants/api';
import { useToast } from '@/components/ui/toast';
import ErrorToast from '@/components/ErrorToast';

const OrderHistoryScreen: React.FC = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchAllOrders();
        setOrders([...fetchedOrders]);
      } catch (error) {
        console.error("Error retornando los pedidos", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.light.darkBlue} />;
  }

  return (
    <ScrollView style={styles.container}>
      <VStack space={"lg"}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </VStack>
    </ScrollView>
  );
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const router = useRouter();
  const toast = useToast();

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

  const handlePress = async () => {
    try {
      const orderFromDB = await fetchOrderById(order.id);
      if (!orderFromDB) {
        toast.show({
          id: "order-not-found",
          placement: "top",
          duration: 5000,
          render: ({ id }) => (
            <ErrorToast
              id={id}
              message="Pedido no encontrado"
              onClose={() => toast.close(id)}
            />
          ),
        });
        return;
      }
      router.push({ pathname: "/(tabs)/(home)/order_details", params: { orderId: order.id } });
    } catch (error) {
      console.error("Error verificando la existencia del pedido:", error);
      toast.show({
        id: "order-error",
        placement: "top",
        duration: 5000,
        render: ({ id }) => (
          <ErrorToast
            id={id}
            message="Error verificando el pedido"
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={{ maxWidth: '68%' }}>
        <Heading style={styles.orderText} size='lg'>Pedido {order.id}</Heading>
        <View style={{ alignSelf: 'flex-start' }}>
          <View style={[styles.statusContainer, { backgroundColor: getBackgroundColor() }]}>
            {(order.status === 'En preparación' || order.status === 'Esperando confirmación') ? (
              <Clock size={14} color={getTextColor()} style={styles.icon}/>
            ) : order.status === 'Listo' ? (
              <ShoppingBag size={14} color={getTextColor()} style={styles.icon}/>
            ) : (
              <CheckCircle size={14} color={getTextColor()} style={styles.icon}/>
            )}
            <Text size='sm' style={[styles.status, { color: getTextColor(), marginLeft: 6 }]}>{order.status}</Text>
          </View>
        </View>
        <Text style={styles.date}>{order.date}</Text>
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: '35%' }}>
        <ChevronRight size={30} color={Colors.light.darkBlue}/>
        <Heading size='lg' style={styles.price}>${order.finalPrice.toFixed(2)}</Heading>
      </View>
    </Pressable>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
  },
  orderText: {
    color: Colors.light.darkBlue,
    padding: 2,
    paddingLeft: 6,
    fontWeight: 'normal',
  },
  icon: {
    marginVertical: 'auto',
    alignSelf: 'flex-start',
  },
  statusContainer: {
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
    color: Colors.light.darkBlue,
  },
});

export default OrderHistoryScreen;
