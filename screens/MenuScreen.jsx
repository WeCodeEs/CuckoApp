import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { StyleSheet } from "react-native";
import { Center } from "@/components/ui/center";
import { useNavigation } from '@react-navigation/native';

const platillos = [
  { id: 1, nombre: 'Ensalada Cajún', imagen: require('@/assets/images/platillos/ensalada_cajun.png'), precio: '$55.00' },
  { id: 2, nombre: 'Ensalada Curry', imagen: require('@/assets/images/platillos/ensalada_curry.png'), precio: '$55.00' },
  { id: 3, nombre: 'Baguette', imagen: require('@/assets/images/platillos/baguette.png'), precio: '$55.00' },
  { id: 4, nombre: 'Croissant', imagen: require('@/assets/images/platillos/croissant.png'), precio: '$55.00' },
];

const MenuScreen = () => {
  const navigation = useNavigation();

  return (
    <Center className="bg-white h-full w-full" style={styles.container}>
      <View className="flex flex-row flex-wrap justify-around" style={styles.grid}>
        {platillos.map(platillo => (
          <VStack key={platillo.id} className="items-center mb-4" style={styles.itemContainer}>
            <Image source={platillo.imagen} alt="imagen" className="w-24 h-24 rounded-full" />
            <Text size="lg" className="mt-2">{platillo.nombre}</Text>
            <Text size="lg" className="mt-1 font-semibold text-orange-500">{platillo.precio}</Text>
            <Button
              size="xl"
              className="mt-2 bg-blue-500 p-2 rounded-full"
              onPress={() => navigation.navigate('detail_product', { platilloId: platillo.id })}
            >
              <ButtonText className="text-white text-xl">+</ButtonText>
            </Button>
          </VStack>
        ))}
      </View>
    </Center>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  grid: {
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    width: '45%',
    alignItems: 'center',
  },
});
