import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Image } from "@/components/ui/image";
import { VStack } from '@/components/ui/vstack';
import { Text } from "@/components/ui/text";
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { CartItem } from '@/constants/types';

interface CartItemCardProps {
  cartItem: CartItem;
  onCardPress: (productId: number) => void;
  onRemove: (productId: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ cartItem, onCardPress, onRemove }) => {
  return (
    <Pressable onPress={() => onCardPress(cartItem.product.id)}>
      <View style={styles.card}>
        <Image
          size="md"
          source={{ uri: cartItem.product.image }}
          alt={cartItem.product.name}
        />
        <View style={styles.detailsContainer}>
          <VStack space="xs" style={styles.details}>
            <Heading size="md" style={{ fontWeight: 'normal' }}>
              {cartItem.product.name}
            </Heading>
            <Text size="md">${cartItem.product.basePrice.toFixed(2)}</Text>
            <Text size="md">{cartItem.quantity}</Text>
            {cartItem.selectedVariant && (
              <Text size="md">{cartItem.selectedVariant.name}</Text>
            )}
            {cartItem.ingredients &&
              cartItem.ingredients.map((ingredient) => (
                <Text key={ingredient.id} size="md">
                  {ingredient.name}
                </Text>
              ))}
          </VStack>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.fav_btn} onPress={() => onRemove(cartItem.product.id)}>
            <Heart size={20} color={Colors.light.background} fill={Colors.light.background} />
          </Button>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: 15,
    padding: 16,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    margin: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
  },
  detailsContainer: {
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '60%',
  },
  details: {
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fav_btn: {
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: Colors.light.mediumBlue,
  },
});

export default CartItemCard;
