import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { CartItem } from '@/constants/types'; 
import { VStack } from '@/components/ui/vstack';
import CartModal from '@/components/RemoveFromCartModal';
import CartItemCard from '@/components/CartItemCard';
import { Colors } from '@/constants/Colors';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Center } from '@/components/ui/center';
import { useCart } from '@/contexts/CartContext';

const CartScreen: React.FC = () => {
  const router: any = useRouter();
  const { cartItems, totalCartValue, removeCartItem } = useCart();
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (productId: number) => {
    router.push(`/detail_product?id=${productId}`);
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    setSelectedCartItem(cartItem);
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

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <VStack space="lg">
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
            <CartModal
              isVisible={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={confirmRemoveFromCart}
              cartItem={selectedCartItem}
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
          <Text style={styles.emptyText}>
            Aún no tienes productos en el carrito. ¡Comienza a agregar!
          </Text>
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
  }
});
