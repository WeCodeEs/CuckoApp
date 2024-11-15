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
import { platillos, imagenes } from '../../../constants/platillos';
import { Product, Variant, CustomizableIngredient, Ingredient } from '@/constants/types';
import { fetchProductById, fetchVariantsByProductId, fetchCustomizableIngredientsByProductId, fetchIngredientInfo } from '@/constants/api2';
import { Radio, RadioGroup, RadioIndicator, RadioLabel, RadioIcon } from '@/components/ui/radio';

type RootStackParamList = {
    Detail_product: { platilloId: number };
};

type DetailProductRouteProp = RouteProp<RootStackParamList, 'Detail_product'>;

const Detail_product = () => {
    const route = useRoute<DetailProductRouteProp>();
    const { platilloId } = route.params;

    const [product, setProduct] = useState<Product | null>(null);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<string>(
        variants.length > 0 ? variants[0].id.toString() : ""
    );
    const [ingredients, setIngredients] = useState<CustomizableIngredient[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [isFavourite, setIsFavourite] = useState(false);

    const [cantidad, setCantidad] = useState(1);
    const [precioTotal, setPrecioTotal] = useState<number>(0);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const fetchedProduct = await fetchProductById(platilloId);
                if (fetchedProduct) {
                    setProduct(fetchedProduct);
                    setPrecioTotal(fetchedProduct.basePrice || 0);

                    const fetchedVariants = await fetchVariantsByProductId(platilloId);
                    setVariants(fetchedVariants);
                    if (fetchedVariants.length > 0) {
                        setSelectedVariant(fetchedVariants[0].id.toString());
                    }

                    const fetchedIngredients = await fetchCustomizableIngredientsByProductId(platilloId);
                    const ingredientDetails = await Promise.all(
                        fetchedIngredients.map(async (ingredient: CustomizableIngredient) => {
                            const info = await fetchIngredientInfo(ingredient.ingredientId);
                            return { ...ingredient, info };
                        })
                    );
                    setIngredients(ingredientDetails);
                } else {
                    setError("Producto no encontrado");
                }
            } catch (err) {
                setError("Error en la solicitud");
            }
        };

        fetchProductData();
    }, [platilloId]);

    const handlePress = () => {
        setIsFavourite(!isFavourite);
    };

    const aumentarCantidad = () => {
        if (cantidad < 10) {
            const nuevaCantidad = cantidad + 1;
            setCantidad(nuevaCantidad);
            setPrecioTotal(nuevaCantidad * (product?.basePrice || 0));
        }
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            const nuevaCantidad = cantidad - 1;
            setCantidad(nuevaCantidad);
            setPrecioTotal(nuevaCantidad * (product?.basePrice || 0));
        }
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
                <Text style={styles.errorText}>Producto no encontrado</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Center style={styles.header_container}>
                <View style={{ bottom: '-42%' }}>
                    <Text style={{ textAlign: 'center', color: '#fff', marginBottom: 5 }}>Detalles</Text>
                    <Image source={product.image} alt={product.name} size="2xl" />
                </View>
            </Center>
            <Center style={styles.general_container}>
                <Box style={styles.content_box}>
                    <Text style={styles.title} size={"2xl"}>{product.name}</Text>
                    <Center style={{ flexDirection: 'row' }}>
                        <Text style={styles.price} size={"2xl"}>${precioTotal.toFixed(2)}</Text>
                        <Center style={styles.amount}>
                            <Button size="md" onPress={disminuirCantidad} style={styles.amount_btn}>
                                <ButtonIcon as={RemoveIcon} stroke="#707070" />
                            </Button>
                            <Text style={{ alignItems: 'center' }} size={"xl"}>{cantidad}</Text>
                            <Button size="md" onPress={aumentarCantidad} style={styles.amount_btn}>
                                <ButtonIcon as={AddIcon} stroke="#707070" />
                            </Button>
                        </Center>
                    </Center>

                    {variants.length > 0 && (
                        <>
                            <Text size={"xl"} style={styles.subtitle}>Variantes</Text>
                            <RadioGroup
                                value={selectedVariant}
                                onChange={(value) => setSelectedVariant(value)}
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
                                    <Text style={styles.additionalPrice}>
                                        ${variant.additionalPrice.toFixed(2)}
                                    </Text>
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
                                        <Text style={styles.additionalPrice}>
                                            {ingredient.info?.additionalPrice && ingredient.info?.additionalPrice > 0
                                                    && `$${ingredient.info?.additionalPrice.toFixed(2)}`
                                            }
                                        </Text>
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
                        <Button size="lg" style={[styles.fav_btn, { borderColor: '#F07122', borderWidth: 1, backgroundColor: "#F07122" }]} onPress={handlePress}>
                            <Heart size={20} color="#fff" fill={isFavourite ? '#fff' : 'none'} />
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
        backgroundColor: '#F07122',
        paddingTop: 10 + Constants.statusBarHeight,
    },
    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    header_container: {
        zIndex: 1,
        width: '100%',
        height: 195,
        backgroundColor: '#F07122',
    },
    general_container: {
        backgroundColor: '#F07122',
        width: '100%',
        height: 'auto',
    },
    content_box: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#d1d5db',
        backgroundColor: '#fff',
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
        color: '#F07122',
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
        backgroundColor: '#F4F5F6',
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
        flexDirection: 'row', justifyContent: 'space-between'
    },
    additionalPrice:{
        height: '100%', 
        verticalAlign:'middle', 
        paddingRight: 15
    },
    ingredient: {
        paddingBottom: 5,
        alignSelf: 'flex-start',
    },
    label: {
        flexWrap: 'wrap',
        verticalAlign:'top',
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
        backgroundColor: '#F07122',
        marginRight: '3%',
        borderRadius: 50,
        alignItems: 'center',
    },
    fav_btn: {
        backgroundColor: "#fff",
        aspectRatio: '1/1',
        borderRadius: 100,
    },
    errorText: {

    }
});