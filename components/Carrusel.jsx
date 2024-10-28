import React from "react";
import { View, Image } from "react-native";
import Swiper from "react-native-swiper";
import { VStack } from "@/components/ui/vstack";
import { Colors } from '@/constants/Colors';

const Carrusel = () => {

  const promociones = [
    { image: require('@/assets/images/promo1.png') },
    { image: require('@/assets/images/promo2.png') },
    { image: require('@/assets/images/promo3.png') },
    { image: require('@/assets/images/promo4.png') },
  ];

  return (
    <View style={{ height: 150, width: '100%', alignSelf: 'center'}}>
      <Swiper
        loop
        autoplay
        autoplayTimeout={4}
        showsPagination
        paginationStyle={{ bottom: -20}}
        activeDotStyle={{ backgroundColor: Colors['light'].tabIconDefault }} 
        dotStyle={{ backgroundColor: Colors['light'].secondaryBackground }}
        scrollEnabled={true}
        autoplayDirection={true}
        loadMinimal
        loadMinimalSize={2}
        autoplayAnimateTransition={true}
        androidScaleType="center"
      >
        {promociones.map((promo, index) => (
          <VStack key={index} style={{ alignItems: 'center'}}>
            <Image
              source={promo.image}
              style={{
                width: '100%',
                height: 150,
                resizeMode: 'cover',
                borderRadius: 10,
                
              }}
            />
          </VStack>
        ))}
      </Swiper>
    </View>
  );
};

export default Carrusel;
