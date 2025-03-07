import React, { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import { ActionsheetVirtualizedList } from "@/components/ui/actionsheet";
import { Pressable } from "@/components/ui/pressable";
import { Product } from "@/constants/types";
import { fetchAllProducts, fetchProductById } from "@/constants/api";
import ErrorToast from "@/components/ErrorToast";

interface SearchProductsProps {
  searchTerm: string;
}

const SearchProducts: React.FC<SearchProductsProps> = ({ searchTerm }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const apiProducts = await fetchAllProducts();
        setProducts(apiProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
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

  const handleProductPress = async (productId: number) => {
    try {
      const productDetail = await fetchProductById(productId);
      if (!productDetail) {
        setErrorMessage("Producto no encontrado");
        return;
      }
      navigation.navigate("detail_product", {
        product: encodeURIComponent(JSON.stringify(productDetail)),
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      setErrorMessage("Error al obtener el producto");
    }
  };

  return (
    <Animated.View style={[styles.viewContainer, { opacity: fadeAnim }]}>
      {errorMessage && (
        <ErrorToast
          id="error-search"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
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
                onPress={() => handleProductPress(product.id)}
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
    position: "absolute",
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
    textAlign: "center",
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
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    color: Colors.light.darkBlue,
  },
});
