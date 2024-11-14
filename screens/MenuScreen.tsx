import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Button} from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Icon } from '@/components/ui/icon';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { Search, Coffee, Sandwich, ChefHat, Salad, ForkKnife, GlassWater} from "lucide-react-native";
import Carrusel from '@/components/Carrusel';
import { Colors } from '@/constants/Colors';
import SearchProducts from '@/components/SearchProducts';

interface Platillo {
  id: number;
  name: string;
  price: number;
  image: any;
  alt: string;
}

interface PlatillosData {
  comida: Platillo[];
  snacks: Platillo[];
  ensaladas: Platillo[];
  platillos: Platillo[];
  cafe: Platillo[];
  limonadas: Platillo[];
}

const platillos: PlatillosData = {
  comida: [
    { id: 1, name: "Ensalada Cajún", price: 55.00, image: require('@/assets/images/ensalada1.png'), alt: 'Ensalada Cajun' },
    { id: 2, name: "Ensalada Curry", price: 65.0, image: require('@/assets/images/ensalada2.png'), alt: 'Ensalada Curry' },
    { id: 3, name: "Baguette", price: 45.00, image: require('@/assets/images/baguette.png'), alt: 'Baguette' },
    { id: 4, name: "Croissant", price: 25.00, image: require('@/assets/images/croissant.png'), alt: 'Croissant' },
    { id: 5, name: "Tlayuda", price: 65.00, image: require('@/assets/images/tlayuda.png'), alt: 'Tlayuda' },
    { id: 6, name: "Hamburguesa", price: 50.00, image: require('@/assets/images/hamburguesa.png'), alt: 'Hamburguesa' },
  ],
  snacks: [
    { id: 7, name: "Prueba1", price: 10.00, image: require('@/assets/images/baguette.png'), alt: 'Baguette' },
    { id: 8, name: "Hamburguesa", price: 50.00, image: require('@/assets/images/hamburguesa.png'), alt: 'Baguette' },
  ],
  
  ensaladas: [
    { id: 9, name: "Prueba2", price: 10.00, image: require('@/assets/images/croissant.png'), alt: 'Prueba' },
    { id: 10, name: "Ensalada Cajún", price: 55.00, image: require('@/assets/images/ensalada1.png'), alt: 'Ensalada Cajun' },
  ],
  platillos: [
    { id: 11, name: "Prueba3", price: 10.00, image: require('@/assets/images/baguette.png'), alt: 'Prueba'  },
    { id: 12, name: "Tlayuda", price: 65.00, image: require('@/assets/images/tlayuda.png'), alt: 'Tlayuda' },
  ],
  cafe: [
    { id: 13, name: "Prueba4", price: 10.00, image: require('@/assets/images/croissant.png'), alt: 'Prueba' },
    { id: 14, name: "Baguette", price: 45.00, image: require('@/assets/images/baguette.png'), alt: 'Baguette' },
  ],
  limonadas: [
    { id: 15, name: "Prueba5", price: 10.00, image: require('@/assets/images/baguette.png'), alt: 'Prueba' },
    { id: 16, name: "Ensalada Curry", price: 65.00, image: require('@/assets/images/ensalada2.png'), alt: 'Ensalada Curry' },
  ],
};

const MenuScreen = () => {
  const navigation: any = useNavigation();
  const [activeButton, setActiveButton] = useState<keyof PlatillosData>("comida");
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
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

              <SearchProducts searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

              <Carrusel />
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollCategoryViewContent}>
              <HStack space="sm" style={styles.buttonRow}>
                {Object.keys(platillos).map((key) => (
                  <VStack key={key} style={{ alignItems: 'center' }}>
                    <Button onPress={() => setActiveButton(key as keyof PlatillosData)} variant="link">
                      <Box style={[styles.iconContainer, activeButton === key && styles.activeIconContainer]}>
                        <Icon as={key === 'comida' ? ChefHat : key === 'snacks' ? Sandwich : key === 'ensaladas' ? Salad : key === 'platillos' ? ForkKnife : key === 'cafe' ? Coffee : GlassWater} size='xl' />
                      </Box>
                    </Button>
                    <Text style={styles.activeButtonText}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                  </VStack>
                ))}
              </HStack>
            </ScrollView>

            <View style={styles.grid}>
              {platillos[activeButton].map((platillo) => (
                <VStack key={platillo.id} style={styles.vStackItem}>
                  <TouchableOpacity onPress={() => navigation.navigate('detail_product', { platilloId: platillo.id })} style={styles.TouchableOpacity}>

                    <Image size="xl" source={platillo.image} alt={platillo.name} style={styles.image} />
                    <Text size="lg" bold= {true} style={styles.itemText}>{platillo.name}</Text>
                    <Text size="lg" bold= {true} style={styles.itemPrice}>$ {platillo.price.toFixed(2)}</Text>

                  </TouchableOpacity>

                  <Button
                    size="sm"
                    style={styles.addButton}
                    onPress={() => navigation.navigate('detail_product', { platilloId: platillo.id })}
                  >
                    <Text style={styles.addButtonText}>+</Text>
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
  scrollCategoryViewContent: {
    flexGrow: 1, 
    justifyContent: 'center',
    paddingTop: 12,
  },
  center: {
    backgroundColor: Colors.light.background,
    width: '100%',
    flex: 1,
  },
  box: {
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 5,
    maxWidth: '96%',
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
    position: 'static',
    zIndex: 1000,
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
    backgroundColor: Colors.light.background,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    zIndex: 100,
  },
  inputFieldLarge: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 18,
    backgroundColor: Colors.light.background,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: -5,
  },
  iconContainer: {
    marginHorizontal: 1,
    borderColor: Colors.light.background,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  activeIconContainer: {
    backgroundColor: Colors.dark.tabIconSelected ,
  },
  activeButtonText: {
    color: Colors.light.text,
    marginTop: 8,
    fontSize: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 1,
  },
  vStackItem: {
    width: '45%',
    marginBottom: 20,
    alignItems: 'center',
  },
  TouchableOpacity: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
  },
  itemText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
  itemPrice: {
    marginTop: 3,
    marginBottom: 6,
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.dark.tabIconSelected,
  },
  addButton: {
    marginTop: 6,
    width: 43,
    height: 43,
    borderRadius: 23,
    backgroundColor: Colors.light.mediumBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: Colors.dark.text,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: 'black',
    textAlign: 'center',
  },
});
