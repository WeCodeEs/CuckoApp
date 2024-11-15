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

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '@/constants/types';
import { fetchProductById } from '@/constants/api2';

export default function FavoritesScreen() {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ID del producto que deseas buscar
    const productId = 1; // Puedes cambiarlo por otro ID según necesites

    const fetchProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("Producto no encontrado");
        }
      } catch (err) {
        setError("Error en la solicitud");
      }
    };

    fetchProduct();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
      </View>
    );
  }

  // Renderización del producto encontrado
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description || 'Sin descripción disponible'}</Text>
      <Text style={styles.price}>Precio: ${product.basePrice.toFixed(2)}</Text>
      {/* Agrega más detalles si es necesario */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    color: 'green',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
