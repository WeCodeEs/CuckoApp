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
import { useToast } from "./ui/toast";

interface SearchProductsProps {
  searchTerm: string;
}

const SearchProducts: React.FC<SearchProductsProps> = ({ searchTerm }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation<NavigationProp<any>>();
  const toast = useToast();

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
      let filtered = products.filter((product) =>
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
  }, [searchTerm, products, fadeAnim]);

  const getItem = (data: Product[], index: number): Product => data[index];
  const getItemCount = (data: Product[]): number => data.length;

  const handleProductPress = async (productId: number) => {
    try {
      const productDetail = await fetchProductById(productId);
      if (!productDetail) {
        const errorMsg = "Producto no encontrado";
        toast.show({
          id: "error-search",
          placement: "top",
          duration: 5000,
          render: ({ id }) => (
            <ErrorToast
              id={id}
              message={errorMsg}
              onClose={() => toast.close(id)}
            />
          ),
        });
        return;
      }
      navigation.navigate("detail_product", {
        product: encodeURIComponent(JSON.stringify(productDetail)),
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      const errorMsg = "Error al obtener el producto";
      toast.show({
        id: "error-fetch",
        placement: "top",
        duration: 5000,
        render: ({ id }) => (
          <ErrorToast
            id={id}
            message={errorMsg}
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  };

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
          renderItem={({ item }) => (
            <Pressable
              style={styles.productContainer}
              onPress={() => handleProductPress((item as Product).id)}
            >
              <View style={styles.productContent}>
                <Image
                  source={{ uri: (item as Product).image }}
                  style={styles.image}
                  alt={(item as Product).name}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.productName}>{(item as Product).name}</Text>
                </View>
              </View>
            </Pressable>
          )}
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
