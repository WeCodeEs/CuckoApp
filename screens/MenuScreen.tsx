import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Icon } from '@/components/ui/icon';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
import { Search, Coffee, Sandwich, ChefHat, Salad, ForkKnife, GlassWater, Croissant } from "lucide-react-native";
import Carrusel from '@/components/Carrousel';
import { Colors } from '@/constants/Colors';
import SearchProducts from '@/components/SearchProducts';

interface Platillo {
  id: number;
  name: string;
  basePrice: number;
  image: string;
}

interface PlatillosData {
  desayunos: Platillo[];
  antojitos: Platillo[];
  platillos: Platillo[];
  ensaladas: Platillo[];
  cafe: Platillo[];
  bebidas: Platillo[];
  grabandgo: Platillo[];
}

const API_URL = 'https://api.jsonbin.io/v3/b/673600e7e41b4d34e454545e';
const API_KEY = '$2a$10$BjeoYTJyrlDGX.e.gpcmj.PU.DQY80BJKMO9eqGE03lENZtL5N8QS';

const fetchData = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'X-Master-Key': API_KEY,
      },
    });
    const data = await response.json();
    return data.record; // Ajustamos según la estructura de la respuesta de JsonBin
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const MenuScreen = () => {
  const navigation: any = useNavigation();
  const [menuData, setMenuData] = useState<PlatillosData | null>(null);
  const [activeButton, setActiveButton] = useState<keyof PlatillosData>("desayunos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadMenuData = async () => {
      const data = await fetchData();
      if (data) {
        const formattedData: PlatillosData = {
          desayunos: data.products.filter((p: any) => [1, 2, 3, 4, 5].includes(p.categoryId)),
          antojitos: data.products.filter((p: any) => [6, 7, 8, 9].includes(p.categoryId)),
          platillos: data.products.filter((p: any) => [10, 11, 12, 13, 14, 15].includes(p.categoryId)),
          ensaladas: data.products.filter((p: any) => [16].includes(p.categoryId)),
          cafe: data.products.filter((p: any) => [17, 18, 19].includes(p.categoryId)),
          bebidas: data.products.filter((p: any) => [20, 21, 22, 23, 24].includes(p.categoryId)),
          grabandgo:data.products.filter((p: any) => [25, 26].includes(p.categoryId)),
        };
        setMenuData(formattedData);
      }
    };

    loadMenuData();
  }, []);

  return (
    <View style={styles.container}>
      {searchTerm.trim() !== '' && <SearchProducts searchTerm={searchTerm} />}
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
                <Carrusel />
              </View>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollCategoryViewContent}>
                <HStack space="sm" style={styles.buttonRow}>
                  {menuData && Object.keys(menuData).map((key) => (
                    <VStack key={key} style={{ alignItems: 'center' }}>
                      <Button onPress={() => setActiveButton(key as keyof PlatillosData)} variant="link">
                        <Box style={[styles.iconContainer, activeButton === key && styles.activeIconContainer]}>
                          <Icon as={key === 'desayunos' ? ChefHat : key === 'antojitos' ? Sandwich : key === 'platillos' ? ForkKnife :key === 'ensaladas' ? Salad : key === 'cafe' ? Coffee : key === 'bebidas' ? GlassWater : Croissant} size='xl' />
                        </Box>
                      </Button>
                      <Text style={styles.activeButtonText}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                    </VStack>
                  ))}
                </HStack>
              </ScrollView>

              <View style={styles.grid}>
                {menuData && menuData[activeButton].map((platillo) => (
                  <VStack key={platillo.id} style={styles.vStackItem}>
                    <TouchableOpacity onPress={() => navigation.navigate('detail_product', { platilloId: platillo.id })} style={styles.TouchableOpacity}>
                      <Image size="xl" source={{ uri: platillo.image }} alt={platillo.name} style={styles.image} />
                      <Text size="lg" bold={true} style={styles.itemText}>{platillo.name}</Text>
                      <Text size="lg" bold={true} style={styles.itemPrice}>$ {platillo.basePrice.toFixed(2)}</Text>
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
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    paddingHorizontal: 10,
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
