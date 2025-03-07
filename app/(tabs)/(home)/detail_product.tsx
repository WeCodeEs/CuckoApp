import React, { useState, useEffect } from "react";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Image } from "@/components/ui/image";
import { AddIcon, RemoveIcon, CheckIcon, CircleIcon } from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { StyleSheet, ScrollView } from "react-native";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import Constants from "expo-constants";
import { Checkbox, CheckboxIcon, CheckboxLabel, CheckboxIndicator } from "@/components/ui/checkbox";
import { useSearchParams } from "expo-router/build/hooks";
import { Heart } from "lucide-react-native";
import { Product, Variant, CustomizableIngredient } from "@/constants/types";
import {
  fetchVariantsByProductId,
  fetchCustomizableIngredientsByProductId,
  fetchIngredientInfo,
} from "@/constants/api";
import { Radio, RadioGroup, RadioIndicator, RadioLabel, RadioIcon } from "@/components/ui/radio";
import { Colors } from "@/constants/Colors";
import { addFavoriteProductId, getFavoriteProductIds, favoriteProductIds } from "@/constants/favoriteProducts";
import FavoriteModal from "@/components/RemoveFavoriteModal";
import { useRouter } from "expo-router";
import { useCart } from "@/contexts/CartContext";

const Detail_product = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  let initialProduct: Product | null = null;
  try {
    if (productParam) {
      initialProduct = JSON.parse(decodeURIComponent(productParam));
    }
  } catch (e) {
    console.error("Error parsing product parameter:", e);
  }

  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [ingredients, setIngredients] = useState<CustomizableIngredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<CustomizableIngredient[]>([]);
  const [additionalVariantPrice, setAdditionalVariantPrice] = useState<number>(0);
  const [additionalIngredientsPrice, setAdditionalIngredientsPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isFavourite, setIsFavourite] = useState(
    product ? getFavoriteProductIds().includes(product.id) : false
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (product) {
        try {
          const fetchedVariants = await fetchVariantsByProductId(product.id);
          setVariants(fetchedVariants);
          const initialVariant = fetchedVariants.length > 0 ? fetchedVariants[0] : null;
          if (initialVariant) {
            setSelectedVariant(initialVariant);
            setSelectedVariantId(initialVariant.id.toString());
            setAdditionalVariantPrice(initialVariant.additionalPrice || 0);
          }
          const fetchedIngredients = await fetchCustomizableIngredientsByProductId(product.id);
          const ingredientDetails = await Promise.all(
            fetchedIngredients.map(async (ingredient: CustomizableIngredient) => {
              const info = await fetchIngredientInfo(ingredient.ingredientId);
              return { ...ingredient, info };
            })
          );
          setIngredients(ingredientDetails);
          updateTotalPrice(product.basePrice || 0, initialVariant?.additionalPrice || 0, 0);
        } catch (err) {
          console.error("Error fetching additional product data:", err);
        }
      }
    };
    fetchAdditionalData();
  }, [product]);

  const updateTotalPrice = (
    basePrice: number,
    variantPrice: number = additionalVariantPrice,
    ingredientPrice: number = additionalIngredientsPrice,
    newQuantity: number = quantity
  ) => {
    const unit = basePrice + variantPrice + ingredientPrice;
    const total = unit * newQuantity;
    setUnitPrice(unit);
    setTotalPrice(total);
  };

  const handleVariantChange = (variantId: string) => {
    const selectedVar = variants.find((variant) => variant.id.toString() === variantId);
    if (selectedVar) {
      setSelectedVariantId(variantId);
      setSelectedVariant(selectedVar);
      const price = selectedVar.additionalPrice || 0;
      setAdditionalVariantPrice(price);
      updateTotalPrice(product?.basePrice || 0, price, additionalIngredientsPrice);
    }
  };

  const handleIngredientToggle = (ingredientId: number, isSelected: boolean) => {
    console.log(`Toggle ingrediente ${ingredientId}`);
    const ingredient = ingredients.find((item) => item.info?.id === ingredientId);

    if (ingredient) {
      setSelectedIngredients((prevIngredients) => {
        let updatedIngredients;
        if (isSelected) {
          updatedIngredients = [...prevIngredients, ingredient];
          console.log(`Ingrediente agregado: ${ingredient.info?.name}`);
        } else {
          updatedIngredients = prevIngredients.filter(
            (selectedIngredient) => selectedIngredient.ingredientId !== ingredient.ingredientId
          );
          console.log(`Ingrediente eliminado: ${ingredient.info?.name}`);
        }
        return updatedIngredients;
      });

      if (ingredient.info?.additionalPrice) {
        setAdditionalIngredientsPrice((prevPrice) => {
          const priceChange = isSelected ? ingredient.info!.additionalPrice : -ingredient.info!.additionalPrice;
          return prevPrice + priceChange;
        });

        updateTotalPrice(
          product?.basePrice || 0,
          additionalVariantPrice,
          isSelected
            ? additionalIngredientsPrice + ingredient.info.additionalPrice
            : additionalIngredientsPrice - ingredient.info.additionalPrice
        );
      }
    }
  };

  const increaseQuantity = () => {
    if (quantity < 10) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateTotalPrice(product?.basePrice || 0, additionalVariantPrice, additionalIngredientsPrice, newQuantity);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateTotalPrice(product?.basePrice || 0, additionalVariantPrice, additionalIngredientsPrice, newQuantity);
    }
  };

  const handlePressFavorite = () => {
    if (isFavourite) {
      setShowModal(true);
    } else {
      if (product) addFavoriteProductId(product.id);
      setIsFavourite(true);
    }
  };

  const { addCartItem } = useCart();

  const handlePressCart = () => {
    const orderedIngredients = [...selectedIngredients].sort((a, b) => a.ingredientId - b.ingredientId);
    if (product && selectedVariant) {
      addCartItem({
        product: product,
        quantity: quantity,
        unitPrice: unitPrice,
        selectedVariant: selectedVariant,
        ingredients: orderedIngredients,
      });
    }
    router.back();
  };

  const confirmRemoveFavorite = () => {
    if (product) {
      const index = favoriteProductIds.indexOf(product.id);
      if (index > -1) {
        favoriteProductIds.splice(index, 1);
        console.log(`Producto eliminado de favoritos: ${product.id}`);
      }
      setIsFavourite(false);
      setShowModal(false);
    }
  };

  const handleCancelRemoveFavorite = () => {
    setShowModal(false);
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Center style={styles.header_container}>
        <View style={{ bottom: "-42%", width: "100%", alignItems: "center" }}>
          <Text style={{ textAlign: "center", color: Colors.light.background, marginBottom: 5 }}>
            Detalles
          </Text>
          <Image size="2xl" source={product.image} alt={product.name} />
        </View>
      </Center>
      <Center style={styles.general_container}>
        <Box style={styles.content_box}>
          <Text style={styles.title} size={"2xl"}>
            {product.name}
          </Text>
          <Center style={{ flexDirection: "row" }}>
            <Text style={styles.price} size={"2xl"}>
              ${totalPrice.toFixed(2)}
            </Text>
            <Center style={styles.amount}>
              <Button size="md" onPress={decreaseQuantity} style={styles.amount_btn}>
                <ButtonIcon as={RemoveIcon} stroke={Colors.light.ash} />
              </Button>
              <Text style={{ alignItems: "center" }} size={"xl"}>
                {quantity}
              </Text>
              <Button size="md" onPress={increaseQuantity} style={styles.amount_btn}>
                <ButtonIcon as={AddIcon} stroke={Colors.light.ash} />
              </Button>
            </Center>
          </Center>
          <Text size={"xl"} style={styles.subtitle}>
            Descripción
          </Text>
          <Text size={"sm"} style={{ justifyContent: "flex-end", textAlign: "left" }}>
            {product.description}
          </Text>

          {variants.length > 0 && (
            <>
              <Text size={"xl"} style={styles.subtitle}>
                Variantes
              </Text>
              <RadioGroup value={selectedVariantId} onChange={(value) => handleVariantChange(value)}>
                {variants.map((variant, index) => (
                  <View key={`variant-${index}`} style={styles.checkboxContainer}>
                    <Radio key={`variant-${variant.id}`} value={variant.id.toString()} size="md">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel style={styles.label}>{variant.name}</RadioLabel>
                    </Radio>
                    {variant.additionalPrice > 0 && (
                      <Text style={styles.additionalPrice}>
                        ${variant.additionalPrice.toFixed(2)}
                      </Text>
                    )}
                  </View>
                ))}
              </RadioGroup>
            </>
          )}

          {ingredients.length > 0 && (
            <>
              <Text size={"xl"} style={styles.subtitle}>
                Personalizar
              </Text>
              <View>
                {ingredients.map((ingredient, index) => (
                  <View key={`ingredient-${index}`} style={styles.checkboxContainer}>
                    <Checkbox
                      size="md"
                      isInvalid={false}
                      isDisabled={false}
                      value={`checkbox-ingredient-${index}`}
                      style={styles.ingredient}
                      defaultIsChecked={false}
                      onChange={(isChecked) =>
                        handleIngredientToggle(ingredient.ingredientId, isChecked)
                      }
                    >
                      <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel style={styles.label}>
                        {ingredient.customizationType === "Addable"
                          ? `Con ${ingredient.info?.name ?? "Ingrediente"}`
                          : `Sin ${ingredient.info?.name ?? "Ingrediente"}`}
                      </CheckboxLabel>
                    </Checkbox>
                    {ingredient.info?.additionalPrice != null &&
                      ingredient.info.additionalPrice > 0 && (
                        <Text style={styles.additionalPrice}>
                          ${ingredient.info.additionalPrice.toFixed(2)}
                        </Text>
                      )}
                  </View>
                ))}
              </View>
            </>
          )}

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Button
              size="sm"
              style={[styles.cart_btn, { width: "85%", marginRight: 15 }]}
              onPress={handlePressCart}
            >
              <ButtonText>AGREGAR AL CARRITO</ButtonText>
            </Button>
            <Button
              size="lg"
              style={[styles.fav_btn, { backgroundColor: Colors.light.tabIconSelected }]}
              onPress={handlePressFavorite}
            >
              <Heart
                key={isFavourite ? "filled" : "empty"}
                size={20}
                color={Colors.light.background}
                fill={isFavourite ? Colors.light.background : "none"}
              />
            </Button>
          </View>
        </Box>
      </Center>
      <FavoriteModal
        isVisible={showModal}
        onClose={handleCancelRemoveFavorite}
        onConfirm={confirmRemoveFavorite}
      />
    </ScrollView>
  );
};

export default Detail_product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.tabIconSelected,
    paddingTop: 10 + Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
  },
  header_container: {
    zIndex: 1,
    width: "100%",
    height: 195,
    backgroundColor: Colors.light.tabIconSelected,
  },
  general_container: {
    backgroundColor: Colors.light.tabIconSelected,
    width: "100%",
    height: "auto",
  },
  content_box: {
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
    backgroundColor: Colors.light.background,
    height: "auto",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
  },
  title: {
    top: "auto",
    marginTop: "25%",
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 50,
    textAlign: "center",
  },
  price: {
    color: Colors.light.tabIconSelected,
    marginRight: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  amount: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount_btn: {
    backgroundColor: Colors.light.lightGray,
    borderRadius: 100,
    aspectRatio: "1/1",
  },
  subtitle: {
    paddingTop: 30,
    paddingBottom: 15,
  },
  checkboxContainer: {
    flex: 1,
    paddingLeft: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  additionalPrice: {
    height: "100%",
    verticalAlign: "middle",
    paddingRight: 15,
  },
  ingredient: {
    paddingBottom: 5,
    alignSelf: "flex-start",
  },
  label: {
    flexWrap: "wrap",
    verticalAlign: "top",
    paddingRight: 25,
  },
  btns_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cart_btn: {
    width: "85%",
    marginVertical: 30,
    paddingVertical: 10,
    height: "45%",
    backgroundColor: Colors.light.tabIconSelected,
    marginRight: "3%",
    borderRadius: 50,
    alignItems: "center",
  },
  fav_btn: {
    aspectRatio: "1/1",
    borderRadius: 100,
    backgroundColor: Colors.light.tabIconSelected,
  },
  errorText: {
    color: Colors.light.background,
  },
});
