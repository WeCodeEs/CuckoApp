// import { View, Text, StyleSheet } from 'react-native';

// export default function FavoritesScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>Favorites</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Image } from "@/components/ui/image";
import { fetchProductById } from '@/constants/api';
import { Product } from '@/constants/types'; 
import { VStack } from '@/components/ui/vstack';
import { Modal, ModalBackdrop, ModalContent, ModalBody, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Box } from '@/components/ui/box';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { TrashIcon } from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { Colors } from '@/constants/Colors';

const favoriteProductIds: number[] = [1, 2, 3, 4, 5];

const FavoritesScreen: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const fetchFavoriteProducts = async () => {
    try {
      const products: Product[] = [];
      for (const id of favoriteProductIds) {
        const product = await fetchProductById(id);
        if (product) {
          products.push(product);
        }
      }
      setFavoriteProducts(products);
    } catch (error) {
      console.error('Error al obtener los productos favoritos:', error);
    }
  };

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const handleRemoveFavorite = (productId: number) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const confirmRemoveFavorite = () => {
    if (selectedProductId !== null) {
      const index = favoriteProductIds.indexOf(selectedProductId);
      if (index > -1) {
        favoriteProductIds.splice(index, 1);
        setFavoriteProducts(favoriteProducts.filter(p => p.id !== selectedProductId));
      }
      setShowModal(false);
      setSelectedProductId(null);
    }
  };

  const renderProductCard = (product: Product) => (
    <View key={product.id} style={styles.card}>
      <Image  size="md" source={{ uri: product.image }} alt={product.name}/>
      <VStack space="xs">
        <Text className="font-semibold text-lg">{product.name}</Text>
        <Text className="text-sm text-gray-500">${product.basePrice.toFixed(2)}</Text>
      </VStack>
      <Button onPress={() => handleRemoveFavorite(product.id)}>
        <Text className="text-red-600">❤️</Text>
      </Button>
    </View>
  );

  return (
    <ScrollView className="flex-1 p-4">
      <VStack space="lg">
        {favoriteProducts.map((product) => renderProductCard(product))}
      </VStack>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <ModalBackdrop />
        <ModalContent className="max-w-[305px] items-center">
          <ModalHeader>
            <Box className="w-[56px] h-[56px] rounded-full bg-background-error items-center justify-center">
              <Icon as={TrashIcon} className="stroke-error-600" size="xl" />
            </Box>
          </ModalHeader>
          <ModalBody className="mt-0 mb-4">
            <Heading size="md" className="text-typography-950 mb-2 text-center">
              Eliminar de favoritos
            </Heading>
            <Text size="sm" className="text-typography-500 text-center">
              ¿Deseas eliminar este producto de tus favoritos?
            </Text>
          </ModalBody>
          <ModalFooter className="w-full flex-row space-x-2">
            <Button
              variant="outline"
              action="secondary"
              size="sm"
              onPress={() => setShowModal(false)}
              className="flex-grow"
            >
              <Text>Cancelar</Text>
            </Button>
            <Button
              onPress={confirmRemoveFavorite}
              size="sm"
              className="flex-grow"
            >
              <Text>Eliminar</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ScrollView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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
    color: '#888',
  },
  heartIcon: {
    fontSize: 18,
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
});