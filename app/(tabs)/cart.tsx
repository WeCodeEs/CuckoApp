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

const CartScreen: React.FC = () => {
  const router: any = useRouter();
  const { cartItems, totalCartValue, removeCartItem, emptyCart } = useCart();
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEmptyCartModal, setIsEmptyCartModal] = useState(false);

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

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <VStack space="md">
              {cartItems.map((cartItem) => (
                <CartItemCard
                  key={`${cartItem.product.id}-${cartItem.selectedVariant?.id ?? 'default'}-${
                    cartItem.ingredients ? cartItem.ingredients.map(ing => ing.id).join('-') : 'noIngredients'
                  }`}
                  cartItem={cartItem}
                  onCardPress={handleCardClick}
                  onRemove={() => handleRemoveFromCart(cartItem)}
                />
              ))}
            </VStack>
            <View style={styles.dividerContainer}>
              <Divider/>
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
              <Button size="md" style={styles.paymentButton}>
                <ButtonText size="sm" style={styles.paymentButtonText}>
                  CONTINUAR
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
    shadowColor: '#000',
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
