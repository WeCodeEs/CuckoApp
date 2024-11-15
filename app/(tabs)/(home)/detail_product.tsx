import React, { useState, useEffect } from 'react';
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Image } from "@/components/ui/image";
import { AddIcon, RemoveIcon, CheckIcon, CircleIcon } from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { StyleSheet, ScrollView } from "react-native";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import Constants from 'expo-constants';
import { Checkbox, CheckboxIcon, CheckboxLabel, CheckboxIndicator } from "@/components/ui/checkbox";
import { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Heart } from "lucide-react-native";
import { Product, Variant, CustomizableIngredient, Ingredient } from '@/constants/types';
import { fetchProductById, fetchVariantsByProductId, fetchCustomizableIngredientsByProductId, fetchIngredientInfo } from '@/constants/api';
import { Radio, RadioGroup, RadioIndicator, RadioLabel, RadioIcon } from '@/components/ui/radio';
import { Colors } from '@/constants/Colors';

type RootStackParamList = {
    Detail_product: { platilloId: number };
};

type DetailProductRouteProp = RouteProp<RootStackParamList, 'Detail_product'>;

const Detail_product = () => {
    const route = useRoute<DetailProductRouteProp>();
    const { platilloId } = route.params;

    const [product, setProduct] = useState<Product | null>(null);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<string>("");
    const [ingredients, setIngredients] = useState<CustomizableIngredient[]>([]);
    const [additionalVariantPrice, setAdditionalVariantPrice] = useState<number>(0);
    const [additionalIngredientsPrice, setAdditionalIngredientsPrice] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const [isFavourite, setIsFavourite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const fetchedProduct = await fetchProductById(platilloId);
                if (fetchedProduct) {
                    setProduct(fetchedProduct);

                    const fetchedVariants = await fetchVariantsByProductId(platilloId);
                    setVariants(fetchedVariants);

                    const initialVariant = fetchedVariants.length > 0 ? fetchedVariants[0] : null;
                    if (initialVariant) {
                        setSelectedVariant(initialVariant.id.toString());
                        setAdditionalVariantPrice(initialVariant.additionalPrice || 0);
                    }

                    const fetchedIngredients = await fetchCustomizableIngredientsByProductId(platilloId);
                    const ingredientDetails = await Promise.all(
                        fetchedIngredients.map(async (ingredient: CustomizableIngredient) => {
                            const info = await fetchIngredientInfo(ingredient.ingredientId);
                            return { ...ingredient, info };
                        })
                    );
                    setIngredients(ingredientDetails);
                    updateTotalPrice(fetchedProduct.basePrice || 0, initialVariant?.additionalPrice || 0, 0);
                } else {
                    setError("Producto no encontrado");
                }
            } catch (err) {
                setError("Error en la solicitud");
            }
        };

        fetchProductData();
    }, [platilloId]);

    const updateTotalPrice = (
        basePrice: number,
        variantPrice: number = additionalVariantPrice,
        ingredientPrice: number = additionalIngredientsPrice,
        newQuantity: number = quantity
    ) => {
        const total = (basePrice + variantPrice + ingredientPrice) * newQuantity;
        setTotalPrice(total);
    }

    const handleVariantChange = (variantId: string) => {
        const selectedVariant = variants.find((variant) => variant.id.toString() === variantId);
        if (selectedVariant) {
            setSelectedVariant(variantId);
            const price = selectedVariant.additionalPrice || 0;
            setAdditionalVariantPrice(price);
            updateTotalPrice(product?.basePrice || 0, price, additionalIngredientsPrice);
        }
    };

    const handleIngredientToggle = (ingredientId: number, isSelected: boolean) => {
        const ingredient = ingredients.find((item) => item.info?.id === ingredientId);
        if (ingredient && ingredient.info?.additionalPrice) {
            const priceChange = isSelected ? ingredient.info.additionalPrice : -ingredient.info.additionalPrice;
            const newIngredientPrice = additionalIngredientsPrice + priceChange;
            setAdditionalIngredientsPrice(newIngredientPrice);
            updateTotalPrice(product?.basePrice || 0, additionalVariantPrice, newIngredientPrice);
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

    const handlePress = () => {
        setIsFavourite(!isFavourite);
    };

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
                <Text style={styles.errorText}>Buscando platillo...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Center style={styles.header_container}>
                <View style={{ bottom: '-42%', width: '100%', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', color: Colors.light.background, marginBottom: 5 }}>Detalles</Text>
                    <Image size="2xl" source={product.image} alt={product.name} />
                </View>
            </Center>
            <Center style={styles.general_container}>
                <Box style={styles.content_box}>
                    <Text style={styles.title} size={"2xl"}>{product.name}</Text>
                    <Center style={{ flexDirection: 'row' }}>
                        <Text style={styles.price} size={"2xl"}>${totalPrice.toFixed(2)}</Text>
                        <Center style={styles.amount}>
                            <Button size="md" onPress={decreaseQuantity} style={styles.amount_btn}>
                                <ButtonIcon as={RemoveIcon} stroke={Colors.light.ash} />
                            </Button>
                            <Text style={{ alignItems: 'center' }} size={"xl"}>{quantity}</Text>
                            <Button size="md" onPress={increaseQuantity} style={styles.amount_btn}>
                                <ButtonIcon as={AddIcon} stroke={Colors.light.ash} />
                            </Button>
                        </Center>
                    </Center>

                    {variants.length > 0 && (
                        <>
                            <Text size={"xl"} style={styles.subtitle}>Variantes</Text>
                            <RadioGroup
                                value={selectedVariant}
                                onChange={(value) => handleVariantChange(value)}
                            >
                                {variants.map((variant, index) => (
                                    <View key={`variant-${index}`} style={styles.checkboxContainer}>
                                        <Radio
                                            key={`variant-${variant.id}`}
                                            value={variant.id.toString()}
                                            size="md"
                                        >
                                            <RadioIndicator>
                                                <RadioIcon as={CircleIcon} />
                                            </RadioIndicator>
                                            <RadioLabel style={styles.label}>
                                                {variant.name}
                                            </RadioLabel>
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
                            <Text size={"xl"} style={styles.subtitle}>Personalizar</Text>
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
                                        {ingredient.info?.additionalPrice != null && ingredient.info.additionalPrice > 0 && (
                                            <Text style={styles.additionalPrice}>
                                                ${ingredient.info.additionalPrice.toFixed(2)}
                                            </Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </>
                    )}

                    <Text size={"xl"} style={styles.subtitle}>Descripción</Text>
                    <Text size={"sm"} style={{ justifyContent: 'flex-end', textAlign: 'left' }}>{product.description}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Button size="sm" style={[styles.cart_btn, { width: '85%', marginRight: 15 }]}>
                            <ButtonText>AGREGAR AL CARRITO</ButtonText>
                        </Button>
                        <Button size="lg" style={[styles.fav_btn, { backgroundColor: Colors.light.tabIconSelected }]} onPress={handlePress}>
                            <Heart size={20} color={Colors.light.background} fill={isFavourite ? Colors.light.background : 'none'} />
                        </Button>
                    </View>
                </Box>
            </Center>
        </ScrollView>
    );
}

export default Detail_product;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.tabIconSelected,
        paddingTop: 10 + Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        flexGrow: 1,
        backgroundColor: Colors.light.background,
    },
    header_container: {
        zIndex: 1,
        width: '100%',
        height: 195,
        backgroundColor: Colors.light.tabIconSelected,
    },
    general_container: {
        backgroundColor: Colors.light.tabIconSelected,
        width: '100%',
        height: 'auto',
    },
    content_box: {
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.light.lightGray,
        backgroundColor: Colors.light.background,
        height: 'auto',
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomWidth: 0,
    },
    title: {
        top: 'auto',
        marginTop: '25%',
        paddingTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 50,
        textAlign: 'center',
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    price: {
        color: Colors.light.tabIconSelected,
        marginRight: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    amount: {
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amount_btn: {
        backgroundColor: Colors.light.lightGray,
        borderRadius: 100,
        aspectRatio: '1/1',
    },
    subtitle: {
        paddingTop: 30,
        paddingBottom: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 10,
    },
    checkboxContainer: {
        flex: 1,
        paddingLeft: 15,
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    additionalPrice: {
        height: '100%',
        verticalAlign: 'middle',
        paddingRight: 15
    },
    ingredient: {
        paddingBottom: 5,
        alignSelf: 'flex-start',
    },
    label: {
        flexWrap: 'wrap',
        verticalAlign: 'top',
        paddingRight: 25,
    },
    btns_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cart_btn: {
        width: '85%',
        marginVertical: 30,
        paddingVertical: 10,
        height: '45%',
        backgroundColor: Colors.light.tabIconSelected,
        marginRight: '3%',
        borderRadius: 50,
        alignItems: 'center',
    },
    fav_btn: {
        aspectRatio: '1/1',
        borderRadius: 100,
        backgroundColor: Colors.light.tabIconSelected,
    },
    errorText: {
        color: Colors.light.background,
    }
});