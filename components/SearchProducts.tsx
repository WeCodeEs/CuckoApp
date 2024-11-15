import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import menus from '@/constants/Productos.json';
import { Colors } from '@/constants/Colors';
import { ActionsheetVirtualizedList } from "@/components/ui/actionsheet";
import { Pressable } from '@/components/ui/pressable';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface SearchProductsProps {
  searchTerm: string;
}

const SearchProducts: React.FC<SearchProductsProps> = ({ searchTerm }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const products: Product[] = menus.menus.flatMap((menu: any) =>
        menu.categories.flatMap((category: any) =>
          category.products.filter((product: Product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
      setFilteredProducts(products);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setFilteredProducts([]);
      });
    }
  }, [searchTerm]);

  const getItem = (data: Product[], index: number): Product => data[index];
  const getItemCount = (data: Product[]): number => data.length;

    return (
        <Animated.View style={[styles.viewContainer, { opacity: fadeAnim }]}>
          {filteredProducts.length === 0 ? (
            <Text style={styles.emptyText}>No se encontraron productos</Text>
          ) : (
            <ActionsheetVirtualizedList
              data={filteredProducts}
              keyExtractor={(item) => (item as Product).id.toString()}
              getItem={getItem}
              getItemCount={getItemCount}
              renderItem={({ item }) => {
                const product = item as Product;
                return (
                  <Pressable
                    style={styles.productContainer}
                    onPress={() => navigation.navigate('detail_product', { productId: product.id })}>
                      <Image source={{ uri: product.image }} style={styles.image} alt={product.name} />
                        <VStack style={styles.textContainer}>
                          <Text bold={true} style={styles.productName}>{product.name}</Text>
                        </VStack>
                    </Pressable>
                );
              }}
              contentContainerStyle={styles.listContent}
            />
          )}
        </Animated.View>
      );
  
};

export default SearchProducts;

const styles = StyleSheet.create({
  viewContainer: {
    position: 'absolute',
    top: 100, 
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.light.background,
    zIndex: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.light.borderBox,
    paddingHorizontal: 15,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    marginTop: 5,
    color: Colors.dark.tabIconSelected,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.borderBox,
    marginTop: 20,
  },
});
