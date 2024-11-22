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
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Image } from "@/components/ui/image";
import { fetchProductById } from '@/constants/api';
import { Product } from '@/constants/types'; 
import { VStack } from '@/components/ui/vstack';
import { Pressable } from '@/components/ui/pressable';
import { Modal, ModalBackdrop, ModalContent, ModalBody, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Box } from '@/components/ui/box';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { TrashIcon, Heart } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const favoriteProductIds: number[] = [ 2, 3, 4, 5, 6];

const FavoritesScreen: React.FC = () => {
  const router: any = useRouter();
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

  const handleCardClick = (productId: number) => {
    router.push(`/detail_product?id=${productId}`);
  };

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
    <Pressable key={product.id} onPress={() => handleCardClick(product.id)}>
      <View style={styles.card}>
        <Image  size="md" source={{ uri: product.image }} alt={product.name}/>
        <View style={{justifyContent: 'center', alignContent: 'flex-start', width: '60%'}}>
          <VStack space="xs" style={{paddingLeft: 10}}>
            <Heading size='md' style={{fontWeight: 'normal',}}>{product.name}</Heading>
            <Text size='md'>${product.basePrice.toFixed(2)}</Text>
          </VStack>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Button style={styles.fav_btn} onPress={() => handleRemoveFavorite(product.id)}>
            <Heart size={20} color={Colors.light.background} fill={Colors.light.background} />
          </Button>
        </View>
      </View>
    </Pressable>
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
        <ModalContent  style={{borderRadius: 30}} className="max-w-[305px] items-center">
          <ModalHeader>
            <Box style={{backgroundColor: Colors.light.lightBlue}} className="w-[56px] h-[56px] rounded-full items-center justify-center">
              <Icon as={TrashIcon} stroke={Colors.light.darkBlue} size="xl" />
            </Box>
          </ModalHeader>
          <ModalBody className="mt-0 mb-4">
            <Heading size="md" style={{fontWeight: 'normal', paddingTop: 10}} className="text-typography-950 mb-2 text-center">
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
              style={{borderRadius: 30}}
            >
              <Text style={{}}>Cancelar</Text>
            </Button>
            <Button
              onPress={confirmRemoveFavorite}
              size="sm"
              className="flex-grow"
              style={{borderRadius: 30, backgroundColor: Colors.light.darkBlue,}}
            >
              <Text style={{color: Colors.light.background}}>Eliminar</Text>
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
  fav_btn: {
    aspectRatio: '1/1',
    borderRadius: 100,
    backgroundColor: Colors.light.mediumBlue,
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