import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Animated } from 'react-native';
import menus from '@/constants/Productos.json';

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
  const fadeAnim = useState(new Animated.Value(0))[0]; // Valor animado para opacidad

  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Cuando se borra el texto, hacer que se desvanezca
      Animated.timing(fadeAnim, {
        toValue: 0, // Opacidad a 0
        duration: 300, // Duración de la animación
        useNativeDriver: true, // Usa el controlador nativo para un mejor rendimiento
      }).start(() => {
        setFilteredProducts([]); // Resetea la lista de productos después de que se desvanezca
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
      // Iniciar la animación de desvanecimiento hacia adentro
      Animated.timing(fadeAnim, {
        toValue: 1, // Opacidad a 1
        duration: 300, // Duración de la animación
        useNativeDriver: true, // Usa el controlador nativo para un mejor rendimiento
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
      <Animated.View style={[styles.resultsList, { opacity: fadeAnim }]}>
        <ScrollView>
          {filteredProducts.length === 0 ? (
            renderEmptyComponent()
          ) : (
            filteredProducts.map(item => (
              <View key={item.id} style={styles.productContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.productName}>{item.name}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default SearchProducts;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    flex: 1,
    position: 'relative',
    zIndex: 10,
  },
  resultsList: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 20,
    overflow: 'visible',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
    marginBottom: 10,
  },
});
