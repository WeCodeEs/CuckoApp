import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { ActionsheetScrollView } from "@/components/ui/actionsheet";
import { Pressable } from "@/components/ui/pressable";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Search, Coffee, Sandwich, ChefHat, Salad, ForkKnife, GlassWater, Croissant } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { fetchAllProducts, fetchAllCategories, fetchAllMenus } from '@/constants/api';
import { Product, Menu } from "@/constants/types";
import Carrusel from "@/components/Carrousel";
import SearchProducts from "@/components/SearchProducts";

const MenuScreen = () => {
  const router: any = useRouter();
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const menusData = await fetchAllMenus();
        const categoriesData = await fetchAllCategories();
        const productsData = await fetchAllProducts();

        setMenus(menusData);
        setCategories(categoriesData);
        setProducts(productsData);

        if (menusData.length > 0) {
          setActiveMenuId(menusData[0].id);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const handleNavigation = (productId: number) => {
    router.push(`/detail_product?id=${productId}`);
  };

  const filteredProducts =
    activeMenuId !== null
      ? products.filter((product) =>
          categories.some(
            (category) =>
              category.menuId === activeMenuId &&
              category.id === product.categoryId
          )
        )
      : [];

  return (
    <View style={styles.container}>
      {searchTerm.trim() !== "" && <SearchProducts searchTerm={searchTerm} />}
      <ActionsheetScrollView contentContainerStyle={styles.scrollViewContent}>
        <Center style={styles.center}>
          <Box style={styles.box}>
            <VStack style={styles.vStack}>
              <View style={styles.menuContainer}>
                <Box style={styles.headingBox}>
                  <Heading size={"lg"} bold={false} style={styles.headingLeft}>
                    ¿Qué te gustaría comer hoy?
                  </Heading>
                </Box>

                <Input size="xl" style={styles.inputContainer}>
                  <InputSlot>
                    <Icon as={Search} size="xl" />
                  </InputSlot>
                  <InputField
                    style={styles.inputFieldLarge}
                    placeholder="Buscar"
                    value={searchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                  />
                </Input>
                <Carrusel />
              </View>

              <ActionsheetScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollCategoryViewContent}
              >
                <HStack space="sm" style={styles.buttonRow}>
                  {menus.map((menu) => (
                    <VStack key={menu.id} style={{ alignItems: "center" }}>
                      <Button
                        onPress={() => setActiveMenuId(menu.id)}
                        variant="link">
                        <Box
                          style={[styles.iconContainer, activeMenuId === menu.id && styles.activeIconContainer]}>
                          <Icon
                            as={
                              menu.name.includes("Desayunos") ? ChefHat
                              : menu.name.includes("Antojitos") ? Sandwich
                              : menu.name.includes("Café") ? Coffee
                              : menu.name.includes("Ensaladas") ? Salad
                              : menu.name.includes("Platillos") ? ForkKnife
                              : menu.name.includes("Bebidas") ? GlassWater
                              : Croissant
                            } size="xl"
                          />
                        </Box>
                      </Button>
                      <Text style={styles.activeButtonText}>{menu.name}</Text>
                    </VStack>
                  ))}
                </HStack>
              </ActionsheetScrollView>

              <View style={styles.grid}>
                {filteredProducts.map((product) => (
                  <VStack key={product.id} style={styles.vStackItem}>
                    <Pressable
                      onPress={() => handleNavigation(product.id)}
                      style={styles.TouchableOpacity} >
                      <Image
                        size="xl"
                        source={{ uri: product.image }}
                        alt={product.name}
                        style={styles.image}/>
                      <Text size="lg" bold={true} style={styles.itemText}>
                        {product.name}
                      </Text>
                      <Text size="lg" bold={true} style={styles.itemPrice}>
                        $ {product.basePrice.toFixed(2)}
                      </Text>
                    </Pressable>

                    <Button
                      size="sm"
                      style={styles.addButton}
                      onPress={() => handleNavigation(product.id)}>
                      <Text style={styles.addButtonText}>+</Text>
                    </Button>
                  </VStack>
                ))}
              </View>
            </VStack>
          </Box>
        </Center>
      </ActionsheetScrollView>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 0,
  },
  scrollCategoryViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: 12,
  },
  center: {
    backgroundColor: Colors.light.background,
    width: "100%",
    flex: 1,
  },
  box: {
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 5,
    maxWidth: "96%",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    elevation: 1,
    backgroundColor: Colors.light.background,
    flex: 1,
  },
  vStack: {
    paddingBottom: 24,
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    position: "static",
    zIndex: 1000,
  },
  headingBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  headingLeft: {
    textAlign: "left",
    marginLeft: 5,
    marginBottom: 15,
    fontWeight: "normal",
  },
  inputContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    zIndex: 100,
  },
  inputFieldLarge: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 18,
    backgroundColor: Colors.light.background,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: -5,
  },
  iconContainer: {
    marginHorizontal: 1,
    borderColor: Colors.light.background,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    width: 50,
    height: 50,
  },
  activeIconContainer: {
    backgroundColor: Colors.dark.tabIconSelected,
  },
  activeButtonText: {
    color: Colors.light.text,
    marginTop: 8,
    fontSize: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 1,
  },
  vStackItem: {
    width: "45%",
    marginBottom: 20,
    alignItems: "center",
  },
  TouchableOpacity: {
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
  },
  itemText: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  itemPrice: {
    marginTop: 3,
    marginBottom: 6,
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.dark.tabIconSelected,
  },
  addButton: {
    marginTop: 6,
    width: 43,
    height: 43,
    borderRadius: 23,
    backgroundColor: Colors.light.mediumBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: Colors.dark.text,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "black",
    textAlign: "center",
  },
});
