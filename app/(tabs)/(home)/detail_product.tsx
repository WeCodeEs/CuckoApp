import React, { useState } from 'react';
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Image } from "@/components/ui/image";
import { Icon, ClockIcon, AddIcon, RemoveIcon, CheckIcon, FavouriteIcon } from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { StyleSheet, ScrollView } from "react-native";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import Constants from 'expo-constants';
import { Checkbox, CheckboxIcon, CheckboxLabel, CheckboxIndicator } from "@/components/ui/checkbox";
import { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Heart, ChevronLeft } from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';
import { platillos, imagenes } from '../../../constants/platillos';

type RootStackParamList = {
    Detail_product: { platilloId: number };
};

type DetailProductRouteProp = RouteProp<RootStackParamList, 'Detail_product'>;

const Detail_product = () => {
    const navigation = useNavigation();
    const route = useRoute<DetailProductRouteProp>();
    const { platilloId } = route.params;
    const platillo = platillos.find(p => p.id === platilloId);
    const [isFavourite, setIsFavourite] = useState(false);

    const handlePress = () => {
        setIsFavourite(!isFavourite);
    };

    const stackBack = () => {
        navigation.goBack(); 
      };

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
                <View style={{ bottom: '-42%' }}>
                    <Text style={{ textAlign: 'center', color: '#fff', marginBottom: 5 }}>Detalles</Text>
                    <Image source={imagenes[platillo.id]} alt={platillo.nombre} size="2xl" />
                </View>
            </Center>
            <Center style={styles.general_container}>
                <Box style={styles.content_box}>
                    <Text style={styles.title} size={"2xl"}>{platillo.nombre}</Text>
                    <Center style={{ flexDirection: 'row' }}>
                        <Text style={styles.price} size={"2xl"}>${precioTotal.toFixed(2)}</Text>
                        <Center style={styles.amount}>
                            <Button size="md" onPress={disminuirCantidad} style={styles.amount_btn}>
                                <ButtonIcon as={RemoveIcon} stroke="#707070" />
                            </Button>
                            <Text style={{alignItems: 'center'}} size={"xl"}>{cantidad}</Text>
                            <Button size="md" onPress={aumentarCantidad} style={styles.amount_btn}>
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
                    <Text size={"sm"} style={{ justifyContent: 'flex-end', textAlign: 'left' }}>{platillo.descripcion}</Text>
                    <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Button size="sm" style={[styles.cart_btn,{width: '85%', marginRight: 15}]}>
                            <ButtonText>AGREGAR AL CARRITO</ButtonText>
                        </Button>
                        <Button size="lg" style={[styles.fav_btn,{borderColor: '#F07122', borderWidth: 1, backgroundColor: "#F07122"}]} onPress={handlePress}>
                                <Heart size={20} color="#fff" fill={isFavourite ? '#fff' : 'none'}/>
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
    amount_btn:{
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
        backgroundColor: "#fff" ,
        aspectRatio: '1/1', 
        borderRadius: 100,
    },
});