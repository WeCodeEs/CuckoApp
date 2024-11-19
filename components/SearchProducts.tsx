import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { ActionsheetVirtualizedList } from "@/components/ui/actionsheet";
import { Pressable } from '@/components/ui/pressable';

interface Product {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  image: string;
}

interface SearchProductsProps {
  searchTerm: string;
}

const API_URL = 'https://api.jsonbin.io/v3/b/673600e7e41b4d34e454545e';
const API_KEY = '$2a$10$BjeoYTJyrlDGX.e.gpcmj.PU.DQY80BJKMO9eqGE03lENZtL5N8QS';

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'X-Master-Key': API_KEY,
      },
    });
    const data = await response.json();
    return data.record.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const SearchProducts: React.FC<SearchProductsProps> = ({ searchTerm }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    const loadProducts = async () => {
      const apiProducts = await fetchProducts();
      setProducts(apiProducts);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);

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
  }, [searchTerm, products]);

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
                onPress={() => navigation.navigate('detail_product', { productId: product.id })}
              >
                <View style={styles.productContent}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.image}
                    alt={product.name}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.productName}>{product.name}</Text>
                  </View>
                </View>
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
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.darkBlue,
    marginTop: 10,
    marginBottom: 10,
  },
  productContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderBox,
    backgroundColor: Colors.light.background,
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    color: Colors.light.darkBlue,
  },
});
