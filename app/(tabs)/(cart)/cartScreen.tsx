import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { CartItem } from '@/constants/types';
import { VStack } from '@/components/ui/vstack';
import CartModal from '@/components/CartModal';
import CartItemCard from '@/components/CartItemCard';
import { Colors } from '@/constants/Colors';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Center } from '@/components/ui/center';
import { useCart } from '@/contexts/CartContext';
import { Divider } from '@/components/ui/divider';
import CuckooIsotipo from '@/assets/images/vectors/CuckooIsotipo';
import { Clock, ChevronDown } from 'lucide-react-native';
import DeliveryTimeModal from '@/components/DeliveryTimeModal';
import { useStripe } from '@stripe/stripe-react-native';
import { fetchPaymentIntent } from "@/constants/api";
import ErrorToast from '@/components/ErrorToast';
import { useToast } from '@/components/ui/toast';

const CartScreen: React.FC = () => {
  const router: any = useRouter();
  const { cartItems, totalCartValue, removeCartItem, emptyCart } = useCart();
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEmptyCartModal, setIsEmptyCartModal] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState("Preparación Inmediata");

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState<string>();

  const toast = useToast();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = (selectedTime: string | null) => {
    setModalVisible(false);
    setDeliveryTime(selectedTime ? `Pedido para las ${selectedTime}` : "Preparación Inmediata");
  };

  const handleCardClick = (productId: number) => {
    router.push(`/detail_product?id=${productId}`);
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    setSelectedCartItem(cartItem);
    setIsEmptyCartModal(false);
    setShowModal(true);
  };

  const confirmRemoveFromCart = () => {
    if (selectedCartItem !== null) {
      removeCartItem(selectedCartItem);
      console.log('Producto eliminado del carrito ', selectedCartItem.product.id);
      setShowModal(false);
      setSelectedCartItem(null);
    }
  };

  const handleEmptyCart = () => {
    setIsEmptyCartModal(true);
    setShowModal(true);
  };

  const confirmEmptyCart = () => {
    emptyCart();
    console.log('Se vació el carrito');
    setShowModal(false);
  };

  const handlePayment = async () => {
    if (isProcessingPayment) return;
    
    setIsProcessingPayment(true);
  
    try {
      const clientSecret = await fetchPaymentIntent();
      if (!clientSecret) return;
  
      setClientSecret(clientSecret);
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Cuckoo Coffee & Resto ®",
      });
  
      if (error) {
        console.error("Error al inicializar Payment Sheet:", error.message);
        toast.show({
          id: "payment-init-error",
          placement: "top",
          duration: 5000,
          render: ({ id }) => (
            <ErrorToast
              id={id}
              message={`Error al inicializar el pago: ${error.message}`}
              onClose={() => toast.close(id)}
            />
          ),
        });
        return;
      }
  
      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) {
        console.error("Error durante el pago:", paymentError.code, paymentError.declineCode, paymentError.message);
        toast.show({
          id: "payment-error",
          placement: "top",
          duration: 5000,
          render: ({ id }) => (
            <ErrorToast
              id={id}
              message={`Error durante el pago: ${paymentError.message}`}
              onClose={() => toast.close(id)}
            />
          ),
        });
      } else {
        console.log("Pago completado con éxito: ");

        // TODO: Construir un objeto de tipo order
        // const now = new Date();
        // const newOrder = {
        //   items: cartItems.map(cartItem => ({
        //     id: cartItem.product.id,
        //     quantity: cartItem.quantity ?? 1, 
        //   })),
        //   finalPrice: totalCartValue,
        //   date: now.toLocaleDateString(),
        //   time: now.toLocaleTimeString(),
        //   status: "Esperando confirmación",
        // };

        try {
          // TODO: Insertar el pedido (order) en la Base de Datos y
          // usar esa fila insertada para alimentar order_details.tsx
          // const createdOrder = await createOrder(newOrder);
          emptyCart();
          router.push({ 
            pathname: '/(tabs)/(home)/order_details', 
            params: { orderId: 1 , paymentSuccess: true } 
            // TODO: Incluir el ID del pedido en los parámetros
            // params: { orderId: createdOrder.id } 
          });
        } catch (error) {
          console.error("Error creando el pedido:", error);
          toast.show({
            id: "order-create-error",
            placement: "top",
            duration: 5000,
            render: ({ id }) => (
              <ErrorToast
                id={id}
                message="Error al crear el pedido"
                onClose={() => toast.close(id)}
              />
            ),
          });
        }
      }
    } catch (err) {
      console.error("Error general en el proceso de pago:", err);
      toast.show({
        id: "payment-general-error",
        placement: "top",
        duration: 5000,
        render: ({ id }) => (
          <ErrorToast
            id={id}
            message="Ocurrió un error durante el proceso de pago."
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };
  

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Center>
              <Button size="md" style={styles.hourButton} onPress={handleOpenModal}>
                <Clock size={16} color={Colors.light.background} />
                <Text size="md" style={styles.hourButtonText}>{deliveryTime}</Text>
                <ChevronDown size={20} color={Colors.light.background} />
              </Button>
            </Center>
            <VStack space="md">
              {cartItems.map((cartItem) => (
                <CartItemCard
                  key={`${cartItem.product.id}-${cartItem.selectedVariant?.id ?? 'default'}-${cartItem.ingredients ? cartItem.ingredients.map(ing => ing.id).join('-') : 'noIngredients'
                    }`}
                  cartItem={cartItem}
                  onCardPress={handleCardClick}
                  onRemove={() => handleRemoveFromCart(cartItem)}
                />
              ))}
            </VStack>
            <View style={styles.dividerContainer}>
              <Divider />
            </View>
            <View style={styles.emptyCartButtonContainer}>
              <Button size="md" variant="link" action="negative" onPress={handleEmptyCart}>
                <ButtonText>Vaciar Carrito</ButtonText>
              </Button>
            </View>
            <CartModal
              isVisible={showModal}
              onClose={() => setShowModal(false)}
              onConfirmDelete={confirmRemoveFromCart}
              onConfirmEmpty={confirmEmptyCart}
              cartItem={selectedCartItem}
              isEmptyCartModal={isEmptyCartModal}
            />
          </ScrollView>
          <DeliveryTimeModal isVisible={modalVisible} onClose={handleCloseModal}/>
          <HStack style={styles.paymentBar}>
            <VStack style={styles.subtotalContainer}>
              <Text size="sm" style={styles.subtotalText}>
                Subtotal:
              </Text>
              <Heading size="lg" style={styles.subtotal}>
                ${totalCartValue.toFixed(2)}
              </Heading>
            </VStack>
            <Center>
              <Button 
                size="md" 
                style={styles.paymentButton} 
                onPress={handlePayment}
                disabled={isProcessingPayment} 
              >
                <ButtonText size="sm" style={styles.paymentButtonText}>
                  CONFIRMAR
                </ButtonText>
              </Button>
            </Center>
          </HStack>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Center style={styles.emptyCartContainer}>
            <CuckooIsotipo style={styles.svg} />
            <Text style={styles.emptyText}>
              Aún no tienes productos en el carrito.
            </Text>
            <Heading size='md' style={styles.emptyText}>
              ¡Comienza a agregar!
            </Heading>
          </Center>
        </View>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
    padding: 10,
  },
  hourButton: {
    borderRadius: 30,
    backgroundColor: Colors.light.mediumBlue,
    marginTop: 4,
    marginBottom: 12,
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  hourButtonText: {
    color: Colors.light.background,
    marginHorizontal: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    paddingHorizontal: 20,
    color: Colors.light.text,
    textAlign: 'center',
  },
  dividerContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  emptyCartButtonContainer: {
    width: '100%',
    padding: 6
  },
  paymentBar: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.light.tabIconSelected,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  subtotalText: {
    color: Colors.light.lightGray,
  },
  subtotalContainer: {},
  subtotal: {
    fontWeight: 'bold',
    color: 'white',
  },
  paymentButton: {
    borderRadius: 30,
    backgroundColor: Colors.light.background,
  },
  paymentButtonText: {
    color: Colors.light.tabIconSelected,
  },
  emptyCartContainer: {
    height: '100%',
    width: '100%',
    marginTop: -150,
    padding: 10,
  },
  svg: {
    position: 'relative',
    width: '70%',
    aspectRatio: '1/1',
  },
});
