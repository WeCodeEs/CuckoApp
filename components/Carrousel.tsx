import React from "react";
import { View, Image, ImageSourcePropType, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { VStack } from "@/components/ui/vstack";
import { Colors } from '@/constants/Colors';

type Promo = {
    image: ImageSourcePropType;
};

const Carrousel: React.FC = () => {
    const promociones: Promo[] = [
        { image: require('@/assets/images/res_1.jpg') },
        { image: require('@/assets/images/res_2.jpg') },
        { image: require('@/assets/images/res_3.jpg') },
        { image: require('@/assets/images/res_4.jpg') },
    ];

    return (
        <View style={styles.container}>
            <Swiper
                loop
                autoplay
                autoplayTimeout={4}
                showsPagination
                paginationStyle={{ bottom: -20 }}
                activeDotStyle={{ backgroundColor: Colors['light'].tabIconDefault }}
                dotStyle={{ backgroundColor: Colors['light'].secondaryBackground }}
                scrollEnabled
                autoplayDirection
                loadMinimal
                loadMinimalSize={2}
            >
                {promociones.map((promo, index) => (
                    <VStack key={index} style={styles.vStack}>
                        <Image
                            source={promo.image}
                            style={styles.image}
                        />
                    </VStack>
                ))}
            </Swiper>
        </View>
    );
};

export default Carrousel;

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: '100%',
        alignSelf: 'center',
    },
    vStack: {
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
});
