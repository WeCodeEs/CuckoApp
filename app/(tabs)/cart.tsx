import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { CartItem } from '@/constants/types'; 
import { VStack } from '@/components/ui/vstack';
import CartModal from '@/components/RemoveFromCartModal';
import { getcartItems } from '@/constants/cartItems';
import CartItemCard from '@/components/CartItemCard';
import { Colors } from '@/constants/Colors';

const CartScreen: React.FC = () => {
  const router: any = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(getcartItems());
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

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

  const handleRemoveFromCart = (productId: number) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const confirmRemoveFromCart = () => {
    if (selectedProductId !== null) {
      setCartItems((prevCartItems) =>
        prevCartItems.filter((cartItem) => cartItem.product.id !== selectedProductId)
      );
      console.log('Producto eliminado del carrito ', selectedProductId);
      setShowModal(false);
      setSelectedProductId(null);
    }
  };

  return (
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
              onRemove={handleRemoveFromCart}
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
});
