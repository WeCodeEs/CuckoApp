import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { StyleSheet, ScrollView } from "react-native";
import { Center } from "@/components/ui/center";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
// import platillos from '../constants/platillos';

import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Box } from "@/components/ui/box";
import { Search, Coffee, Sandwich, ChefHat, Salad, ForkKnife, GlassWater} from "lucide-react-native";
import { Icon } from '@/components/ui/icon';
import { HStack } from '@/components/ui/hstack';
import Carrusel from '../components/Carrusel';


const platillos = {
  comida: [
    { id: 1, nombre: "Ensalada Cajún", price: "$ 55.00", imagen: require('@/assets/images/ensalada1.png'), alt: 'Ensalada Cajun' },
    { id: 2, nombre: "Ensalada Curry", price: "$ 65.00", imagen: require('@/assets/images/ensalada2.png'), alt: 'Ensalada Curry' },
    { id: 3, nombre: "Baguette", price: "$ 45.00", imagen: require('@/assets/images/baguette.png'), alt: 'Baguette' },
    { id: 4, nombre: "Croissant", price: "$ 25.00", imagen: require('@/assets/images/croissant.png'), alt: 'Croissant' },
    { id: 5, nombre: "Tlayuda", price: "$ 65.00", imagen: require('@/assets/images/tlayuda.png'), alt: 'Tlayuda' },
    { id: 6, nombre: "Hamburguesa", price: "$ 50.00", imagen: require('@/assets/images/hamburguesa.png'), alt: 'Hamburguesa' },
  ],
  snacks: [
    { id: 7, nombre: "Prueba1", price: "$ 00.00", imagen: require('@/assets/images/baguette.png'), alt: 'Baguette' },
    { id: 8, nombre: "Hamburguesa", price: "$ 50.00", imagen: require('@/assets/images/hamburguesa.png'), alt: 'Baguette' },
  ],
  ensaladas: [
    { id: 9, nombre: "Prueba2", price: "$ 00.00", imagen: require('@/assets/images/croissant.png'), alt: 'Prueba' },
    { id: 10, nombre: "Ensalada Cajún", price: "$ 55.00", imagen: require('@/assets/images/ensalada1.png'), alt: 'Ensalada Cajun' },
  ],
  platillos: [
    { id: 11, nombre: "Prueba3", price: "$ 00.00", imagen: require('@/assets/images/baguette.png'), alt: 'Prueba'  },
    { id: 12, nombre: "Tlayuda", price: "$ 65.00", imagen: require('@/assets/images/tlayuda.png'), alt: 'Tlayuda' },
  ],
  cafe: [
    { id: 13, nombre: "Prueba4", price: "$ 00.00", imagen: require('@/assets/images/croissant.png'), alt: 'Prueba' },
    { id: 14, nombre: "Baguette", price: "$ 45.00", imagen: require('@/assets/images/baguette.png'), alt: 'Baguette' },
  ],
  limonadas: [
    { id: 15, nombre: "Prueba5", price: "$ 00.00", imagen: require('@/assets/images/baguette.png'), alt: 'Prueba' },
    { id: 16, nombre: "Ensalada Curry", price: "$ 65.00", imagen: require('@/assets/images/ensalada2.png'), alt: 'Ensalada Curry' },
  ],
};

const MenuScreen = () => {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState("comida");

  return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Center style={styles.center}>
          <Box style={styles.box}>
            <VStack style={styles.vStack}>
              <Box style={styles.headingBox}>
                <Heading size={"lg"} bold="false" style={styles.headingLeft}>
                  ¿Qué te gustaría{'\n'}comer hoy?
                </Heading>
              </Box>

              <Input size="xl" style={styles.inputContainer}>
                <InputSlot>
                  <Icon as={Search} size="md" />
                </InputSlot>
                <InputField
                    style={styles.inputFieldLarge}
                    placeholder="Buscar"
                />
              </Input>

              <Carrusel />

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <HStack space="sm" style={styles.buttonRow}>
                  <VStack alignItems="center">
                    <Button onPress={() => setActiveButton("comida")} variant="link">
                      <Box style={[styles.iconContainer, activeButton === "comida" && styles.activeIconContainer]}>
                        <Icon as={ChefHat} size="20" />
                      </Box>
                    </Button>
                    <Text style={styles.activeButtonText}>Comida</Text>
                  </VStack>
                  <VStack alignItems="center">
                    <Button onPress={() => setActiveButton("snacks")} variant="link">
                      <Box style={[styles.iconContainer, activeButton === "snacks" && styles.activeIconContainer]}>
                        <Icon as={Sandwich} size="20" />
                      </Box>
                    </Button>
                    <Text style={styles.activeButtonText}>Snacks</Text>
                  </VStack>
                  <VStack alignItems="center">
                    <Button onPress={() => setActiveButton("ensaladas")} variant="link">
                      <Box style={[styles.iconContainer, activeButton === "ensaladas" && styles.activeIconContainer]}>
                        <Icon as={Salad} size="20" />
                      </Box>
                    </Button>
                    <Text style={styles.activeButtonText}>Ensaladas</Text>
                  </VStack>
                  <VStack alignItems="center">
                    <Button onPress={() => setActiveButton("platillos")} variant="link">
                      <Box style={[styles.iconContainer, activeButton === "platillos" && styles.activeIconContainer]}>
                        <Icon as={ForkKnife} size="20" />
                      </Box>
                    </Button>
                    <Text style={styles.activeButtonText}>Platillos</Text>
                  </VStack>
                  <VStack alignItems="center">
                    <Button onPress={() => setActiveButton("cafe")} variant="link">
                      <Box style={[styles.iconContainer, activeButton === "cafe" && styles.activeIconContainer]}>
                        <Icon as={Coffee} size="20" />
                      </Box>
                    </Button>
                    <Text style={styles.activeButtonText}>Café</Text>
                  </VStack>
                  <VStack alignItems="center">
                    <Button onPress={() => setActiveButton("limonadas")} variant="link">
                      <Box style={[styles.iconContainer, activeButton === "limonadas" && styles.activeIconContainer]}>
                        <Icon as={GlassWater} size="20" />
                      </Box>
                    </Button>
                    <Text style={styles.activeButtonText}>Limonadas</Text>
                  </VStack>
                </HStack>
              </ScrollView>

              <View style={styles.grid}>
                {platillos[activeButton].map(platillo => (
                    <VStack key={platillo.id}  style={styles.vStackItem}>
                      <Image size="xl" source={platillo.imagen} alt={platillo.nombre} style={styles.image} />
                      <Text size="lg" bold="true" style={styles.itemText}>{platillo.nombre}</Text>
                      <Text size="lg" bold="true" style={styles.itemPrice}>{platillo.price}</Text>
                      <Button
                          size="sm"
                          style={styles.addButton}
                          onPress={() => navigation.navigate('detail_product', { platilloId: platillo.id })}
                      >
                        <ButtonText style={styles.addButtonText}>+</ButtonText>
                      </Button>
                    </VStack>
                ))}
              </View>
            </VStack>
          </Box>
        </Center>
      </ScrollView>

  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  
  scrollViewContent: {
    flexGrow: 1,
    padding: 0,
  },
  center: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
  },
  box: {
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 5,
    maxWidth: '96%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    elevation: 1,
    backgroundColor: 'white',
    flex: 1,
  },
  vStack: {
    paddingBottom: 24,
    flex: 1,
  },
  headingBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headingLeft: {
    textAlign: 'left',
    marginLeft: 5,
    marginBottom: 15,
    fontWeight: 'normal',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputFieldLarge: {
    flex: 1,
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 1,
  },
  itemContainer: {
    width: '45%',
    alignItems: 'center',
  },
  scrollViewContent: {
    padding: 0,
  },
  center: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
  },
  box: {
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 5,
    maxWidth: '96%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    elevation: 1,
    backgroundColor: 'white',
    flex: 1,
  },
  vStack: {
    paddingBottom: 24,
    flex: 1,
  },
  headingBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headingLeft: {
    textAlign: 'left',
    marginLeft: 5,
    marginBottom: 15,
    fontWeight: 'normal',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputFieldLarge: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: -5,
  },
  iconContainer: {
    marginHorizontal: 1,
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: 50,
    height: 60,
  },
  activeIconContainer: {
    backgroundColor: '#f07122',
    borderWidth: 0,
  },
  buttonText: {
    color: '#888',
    marginTop: 8,
    fontSize: 9,
  },
  activeButtonText: {
    color: 'black',
    marginTop: 8,
    fontSize: 10,
  },
  vStackItem: {
    alignItems: 'center',
    width: '50%',
    marginBottom: 16,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 50,
  },
  itemText: {
    marginTop: 8,
    fontSize: 12,
  },
  itemPrice: {
    marginTop: 3,
    fontWeight: 'bold',
    color: '#f07122',
  },
  addButton: {
    marginTop: 6,
    backgroundColor: '#49bcce',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: 'normal',
  },
});