import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { CartItem } from '@/constants/types'; 
import { VStack } from '@/components/ui/vstack';
import CartModal from '@/components/RemoveFromCartModal';
import { getcartItems, removeCartItem } from '@/constants/cartItems';
import CartItemCard from '@/components/CartItemCard';
import { Colors } from '@/constants/Colors';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Center } from '@/components/ui/center';

const CartScreen: React.FC = () => {
  const router: any = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(getcartItems());
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const items = [...getcartItems()];
      setCartItems(items);
      console.log('Cart items updated:', items);
    }, [])
  );

  const handleCardClick = (productId: number) => {
    router.push(`/detail_product?id=${productId}`);
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    setSelectedCartItem(cartItem);
    setShowModal(true);
  };

  const confirmRemoveFromCart = () => {
    if (selectedCartItem !== null) {
      removeCartItem(
        selectedCartItem.product,
        selectedCartItem.selectedVariant,
        selectedCartItem.ingredients
      );
      setCartItems((prevCartItems) =>
        prevCartItems.filter((cartItem) =>
          !(
            JSON.stringify(cartItem.product) === JSON.stringify(selectedCartItem.product) &&
            JSON.stringify(cartItem.selectedVariant) === JSON.stringify(selectedCartItem.selectedVariant) &&
            JSON.stringify(cartItem.ingredients) === JSON.stringify(selectedCartItem.ingredients)
          )
        )
      );
      console.log('Producto eliminado del carrito ', selectedCartItem.product.id);
      setShowModal(false);
      setSelectedCartItem(null);
    }
  };

  return (
    <>
    
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {cartItems.length > 0 ? (
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
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aún no tienes productos en el carrito. ¡Comienza a agregar!</Text>
          </View>
        )}
        <CartModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmRemoveFromCart}
        />
      </ScrollView>
      <HStack style={styles.paymentBar}>
        <VStack style={styles.subtotalContainer}>
          <Text size='sm'>
            Subtotal:
          </Text>
          <Heading size='lg' style={styles.subtotal}>
            $358.00
          </Heading>
        </VStack>
        <Center>
          <Button size="md" style={styles.paymentButton}>
            <ButtonText>
              CONTINUAR
            </ButtonText>
          </Button>
        </Center>
      </HStack>
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
    backgroundColor: Colors.light.background, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 }, 
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  subtotalContainer : {
  },
  subtotal: {
    fontWeight: 'bold',
  },
  paymentButton: {
    borderRadius: 30,
    backgroundColor: Colors.light.tabIconSelected,
  }
});
