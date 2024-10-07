import React, { useState } from 'react';
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Image } from "@/components/ui/image";
import { Icon, ClockIcon, AddIcon, RemoveIcon, CheckIcon } from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { StyleSheet, ScrollView } from "react-native";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import Constants from 'expo-constants';
import { Checkbox, CheckboxIcon, CheckboxLabel, CheckboxIndicator } from "@/components/ui/checkbox";
import { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

type RootStackParamList = {
  Detail_product: { platilloId: number };
};

type DetailProductRouteProp = RouteProp<RootStackParamList, 'Detail_product'>;

const platillos = [
    {
        id: 1,
        nombre: "Ensalada Cajún",
        tiempo: "30 min",
        precio: 55,
        personalizable: true,
        ingredientes: ["Pollo", "Lechuga", "Tomate", "Pimiento", "Cebolla", "Zanahoria"],
        descripcion: "Mezcla de lechugas, tomate y cebolla con pollo sazonado al estilo cajún, acompañado de pimientos frescos y zanahoria."
    },
    {
        id: 2,
        nombre: "Ensalada Curry con nuez de la India",
        tiempo: "30 min",
        precio: 55,
        personalizable: true,
        ingredientes: ["Pollo", "Lechuga", "Calabaza", "Pimiento", "Zanahoria", "Nuez de la India"],
        descripcion: "Lechugas frescas, zanahoria, calabacitas y pimiento rojo con pechuga de pollo asada en salsa curry y nuez de la India. Servida con nuestro aderezo de temporada Curry Ranch."
    },
    {
        id: 3,
        nombre: "Baguette",
        tiempo: "30 min",
        precio: 55,
        personalizable: false,
        ingredientes: [],
        descripcion: "Crujiente baguette relleno de jamón, queso, lechuga, tomate y aderezo de mostaza."
    },
    {
        id: 4,
        nombre: "Croissant",
        tiempo: "30 min",
        precio: 55,
        personalizable: false,
        ingredientes: [],
        descripcion: "Croissant horneado relleno de jamón, queso suizo y un toque de mantequilla."
    }
];

const imagenes: { [key: number]: any } = {
    1: require("@/assets/images/platillos/ensalada_cajun.png"),
    2: require("@/assets/images/platillos/ensalada_curry.png"),
    3: require("@/assets/images/platillos/baguette.png"),
    4: require("@/assets/images/platillos/croissant.png"),
};

export default function Detail_product( ) {
    const route = useRoute<DetailProductRouteProp>();
    const { platilloId } = route.params;
    const platillo = platillos.find(p => p.id === platilloId);

    if (!platillo) {
        return (
            <Center style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 + Constants.statusBarHeight }}>
                <Text>Platillo no encontrado</Text>
            </Center>
        );
    }

    const [cantidad, setCantidad] = useState(1);
    const [precioTotal, setPrecioTotal] = useState(platillo.precio);

    const aumentarCantidad = () => {
        const nuevaCantidad = cantidad + 1;
        setCantidad(nuevaCantidad);
        setPrecioTotal(nuevaCantidad * platillo.precio);
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
        const nuevaCantidad = cantidad - 1;
        setCantidad(nuevaCantidad);
        setPrecioTotal(nuevaCantidad * platillo.precio);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Center style={styles.header_container}>
                <View style={{ bottom: '-45%' }}>
                    <Text style={{ textAlign: 'center', color: '#fff', marginBottom: 5 }}>Detalles</Text>
                    <Image source={imagenes[platillo.id]} alt={platillo.nombre} size="2xl" />
                </View>
            </Center>
            <Center style={styles.general_container}>
                <Box style={styles.content_box} className="p-5 max-w-250 border border-background-300">
                    <Text style={styles.title} className="text-center" size={"2xl"}>{platillo.nombre}</Text>
                    <View style={styles.time} className="flex items-center justify-center">
                        <Icon as={ClockIcon} className="text-typography-500 w-5 h-5" />
                        <Text size={"md"} style={{ justifyContent: 'flex-end', paddingLeft: 7, paddingTop: '0.65%' }}>{platillo.tiempo}</Text>
                    </View>
                    <Center style={{ flexDirection: 'row' }}>
                        <Text className="text-center font-bold" style={styles.price} size={"2xl"}>${precioTotal.toFixed(2)}</Text>
                        <Center style={styles.amount}>
                            <Button size="lg" onPress={disminuirCantidad} className="rounded-full p-3.5 h-10 w-10" style={{ backgroundColor: '#F4F5F6' }}>
                                <ButtonIcon as={RemoveIcon} stroke="#707070" />
                            </Button>
                            <Text className="text-center font-bold" size={"xl"}>{cantidad}</Text>
                            <Button size="lg" onPress={aumentarCantidad} className="rounded-full p-3.5 h-10 w-10" style={{ backgroundColor: '#F4F5F6' }}>
                                <ButtonIcon as={AddIcon} stroke="#707070" />
                            </Button>
                        </Center>
                    </Center>
                    {platillo.personalizable && (
                        <>
                            <Text size={"xl"} style={styles.subtitle}>Ingredientes</Text>
                            <View>
                                {platillo.ingredientes.reduce<JSX.Element[]>((rows, ingrediente, index) => {
                                    if (index % 2 === 0) {
                                        const nextIngredient = platillo.ingredientes[index + 1];
                                        rows.push(
                                            <View key={`row-${index}`} style={styles.row}>
                                                <View style={styles.checkboxContainer}>
                                                    <Checkbox
                                                        size="md"
                                                        isInvalid={false}
                                                        isDisabled={false}
                                                        value={`checkbox-left-${index}`}
                                                        style={styles.ingredient}
                                                        defaultIsChecked={false}
                                                    >
                                                        <CheckboxIndicator style={{ alignSelf: 'flex-start', marginTop: '2%' }}>
                                                            <CheckboxIcon as={CheckIcon} />
                                                        </CheckboxIndicator>
                                                        <CheckboxLabel style={styles.label}>{ingrediente}</CheckboxLabel>
                                                    </Checkbox>
                                                </View>

                                                {nextIngredient && (
                                                    <View style={styles.checkboxContainer}>
                                                        <Checkbox
                                                            size="md"
                                                            isInvalid={false}
                                                            isDisabled={false}
                                                            value={`checkbox-right-${index + 1}`}
                                                            style={styles.ingredient}
                                                            defaultIsChecked={false}
                                                        >
                                                            <CheckboxIndicator style={{ alignSelf: 'flex-start', marginTop: '2%' }}>
                                                                <CheckboxIcon as={CheckIcon} />
                                                            </CheckboxIndicator>
                                                            <CheckboxLabel style={styles.label}>{nextIngredient}</CheckboxLabel>
                                                        </Checkbox>
                                                    </View>
                                                )}
                                            </View>
                                        );
                                    }
                                    return rows;
                                }, [])}
                            </View>
                        </>
                    )}
                    <Text size={"xl"} style={styles.subtitle}>Descripción</Text>
                    <Text size={"sm"} className="text-left" style={{ justifyContent: 'flex-end' }}>{platillo.descripcion}</Text>
                    <Button size="sm" className="rounded-full" style={styles.cart_btn}>
                        <ButtonText>AGREGAR AL CARRITO</ButtonText>
                    </Button>
                </Box>
            </Center>
        </ScrollView>
    );
}

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
        height: 190,
        backgroundColor: '#F07122',
    },
    general_container: {
        backgroundColor: '#F07122',
        width: '100%',
        height: 'auto',
    },
    content_box: {
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
        padding: 10,
        paddingHorizontal: 50,
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
    },
    amount: {
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'space-between',
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
        alignItems: 'flex-start',
        paddingLeft: 15,
    },
    ingredient: {
        paddingBottom: 5,
        alignSelf: 'flex-start',
    },
    label: {
        flexWrap: 'wrap',
        textAlignVertical: 'top',
        paddingRight: 25,
    },
    cart_btn: {
        alignSelf: 'center',
        width: '85%',
        marginVertical: 30,
        paddingVertical: 18,
        height: 'auto',
        backgroundColor: '#F07122',
    },
});