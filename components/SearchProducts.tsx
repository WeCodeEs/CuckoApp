import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Animated, Dimensions, Keyboard } from 'react-native';
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Box } from "@/components/ui/box";
import menus from '@/constants/Productos.json';
import { Colors } from '@/constants/Colors';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type SearchProductsProps = {
  searchTerm: string;
  setSearchTerm: (text: string) => void;
};

const SearchProducts: React.FC<SearchProductsProps> = ({ searchTerm, setSearchTerm }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setFilteredProducts([]);
        setIsVisible(false);
      });
    } else {
      const products = menus.menus.flatMap(menu =>
        menu.categories.flatMap(category =>
          category.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
      setFilteredProducts(products);
      setIsVisible(true);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [searchTerm]);

  const renderEmptyComponent = () => {
    if (searchTerm.trim() !== '') {
      return <Text style={styles.emptyText}>No se encontraron productos</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {isVisible && (
        <Animated.View style={[styles.resultsList, { opacity: fadeAnim }]}>
          {filteredProducts.length === 0 ? (
            renderEmptyComponent()
          ) : (
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={true}
            >
              {filteredProducts.slice(0, 10).map(item => (
                <Box key={item.id} style={styles.productContainer}>
                  <Image source={{ uri: item.image }} style={styles.image} alt={item.name}/>
                  <VStack style={styles.textContainer}>
                    <Text bold={true} style={styles.productName}>{item.name}</Text>
                  </VStack>
                </Box>
              ))}
            </ScrollView>
          )}
        </Animated.View>
      )}
    </View>
  );
};

export default SearchProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 1000,
  },
  resultsList: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    maxHeight: Dimensions.get('window').height * 0.54,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10, 
  },
  scrollContainer: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: Colors.light.borderBox,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.borderBox,
    marginTop: 10,
    marginBottom: 10,
  },
});
