import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Image } from "@/components/ui/image";
import { fetchProductById } from '@/constants/api';
import { Product } from '@/constants/types'; 
import { VStack } from '@/components/ui/vstack';
import { Pressable } from '@/components/ui/pressable';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Heart } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { getCartProductIds } from '@/constants/cartProducts';
import CartModal from '@/components/RemoveFromCartModal';

const cartProductIds = getCartProductIds();

const CartScreen: React.FC = () => {
  const router: any = useRouter();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchItemsInCart = async () => {
        try {
          const products = await Promise.all(
            cartProductIds.map((id) => fetchProductById(id))
          );
          setCartProducts(products.filter((product) => product !== undefined) as Product[]);
          console.log('Renderizando productos en el carrito', cartProductIds);
        } catch (error) {
          console.error('Error al cargar el carrito:', error);
        }
      };
  
      fetchItemsInCart();
    }, [cartProductIds])
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
      const index = cartProductIds.indexOf(selectedProductId);
      if (index > -1) {
        cartProductIds.splice(index, 1);
        console.log('Producto eliminado del carrito ', selectedProductId);
      }
      setCartProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== selectedProductId)
      );
      setShowModal(false);
      setSelectedProductId(null);
    }
  };

  const renderProductCard = (product: Product) => (
    /* TODO: AÑADIR COMO SEGUNDO PARÁMETRO CANTIDAD DE PRODUCTOS SELECCIONADA */
    <Pressable key={product.id} onPress={() => handleCardClick(product.id)}>
      <View style={styles.card}>
        <Image  size="md" source={{ uri: product.image }} alt={product.name}/>
        <View style={{justifyContent: 'center', alignContent: 'flex-start', width: '60%'}}>
          <VStack space="xs" style={{paddingLeft: 10}}>
            <Heading size='md' style={{fontWeight: 'normal'}}>{product.name}</Heading>
            <Text size='md'>${product.basePrice.toFixed(2)}</Text>
          </VStack>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Button style={styles.fav_btn} onPress={() => handleRemoveFromCart(product.id)}>
            <Heart size={20} color={Colors.light.background} fill={Colors.light.background} />
          </Button>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {cartProducts.length > 0 ? (
        <VStack space="lg">
          {cartProducts.map((product) => renderProductCard(product))}
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