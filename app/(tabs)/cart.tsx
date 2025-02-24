import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Image } from "@/components/ui/image";
import { CartItem } from '@/constants/types'; 
import { VStack } from '@/components/ui/vstack';
import { Pressable } from '@/components/ui/pressable';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Heart } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { getcartItems } from '@/constants/cartItems';
import CartModal from '@/components/RemoveFromCartModal';


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
      const index = cartItems.findIndex(item => item.product.id === selectedProductId);
      if (index > -1) {
        cartItems.splice(index, 1);
        console.log('Producto eliminado del carrito ', selectedProductId);
      }
      setCartItems((prevCartItems) =>
        prevCartItems.filter((cartItem) => cartItem.product.id !== selectedProductId)
      );
      setShowModal(false);
      setSelectedProductId(null);
    }
  };

  const renderProductCard = (cartItem: CartItem) => {
    const compositeKey = `${cartItem.product.id}-${cartItem.selectedVariant?.id ?? 'default'}-${
      cartItem.ingredients ? cartItem.ingredients.map(ing => ing.id).join('-') : 'noIngredients'
    }`;
  
    return (
      <Pressable key={compositeKey} onPress={() => handleCardClick(cartItem.product.id)}>
        <View style={styles.card}>
          <Image size="md" source={{ uri: cartItem.product.image }} alt={cartItem.product.name} />
          <View style={{ justifyContent: 'center', alignContent: 'flex-start', width: '60%' }}>
            <VStack space="xs" style={{ paddingLeft: 10 }}>
              <Heading size="md" style={{ fontWeight: 'normal' }}>{cartItem.product.name}</Heading>
              <Text size="md">${cartItem.product.basePrice.toFixed(2)}</Text>
              <Text size="md">{cartItem.quantity}</Text>
              {cartItem.selectedVariant && (
                <Text size="md">{cartItem.selectedVariant.name}</Text>
              )}
              {cartItem.ingredients && cartItem.ingredients.map(ingredient => (
                <Text key={ingredient.id} size="md">{ingredient.name}</Text>
              ))}
            </VStack>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Button style={styles.fav_btn} onPress={() => handleRemoveFromCart(cartItem.product.id)}>
              <Heart size={20} color={Colors.light.background} fill={Colors.light.background} />
            </Button>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {cartItems.length > 0 ? (
        <VStack space="lg">
          {cartItems.map((product) => renderProductCard(product))}
        </VStack>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aún no tienes productos favoritos. ¡Comienza a agregar!</Text>
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
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 10,
  },
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
  productImage: {
    width: 60,
    height: 60,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: Colors.light.ash,
  },
  fav_btn: {
    aspectRatio: '1/1',
    borderRadius: 100,
    backgroundColor: Colors.light.mediumBlue,
  }
});