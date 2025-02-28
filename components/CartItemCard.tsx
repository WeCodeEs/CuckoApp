import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from "@/components/ui/image";
import { VStack } from '@/components/ui/vstack';
import { Text } from "@/components/ui/text";
import { Heading } from '@/components/ui/heading';
import { Colors } from '@/constants/Colors';
import { CartItem } from '@/constants/types';
import { HStack } from './ui/hstack';
import { useCart } from '@/contexts/CartContext';
import CartItemQuantity from '@/components/CartItemQuantity';

interface CartItemCardProps {
  cartItem: CartItem;
  onCardPress: (productId: number) => void;
  onRemove: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ cartItem, onRemove }) => {
  const variantValue = cartItem.selectedVariant ? cartItem.selectedVariant.name : "";
  
  const ingredientsArray = cartItem.ingredients
    ? cartItem.ingredients.map(ingredient =>
        ingredient.customizationType === "Addable"
          ? `Con ${ingredient.info?.name ?? "Ingrediente"}`
          : `Sin ${ingredient.info?.name ?? "Ingrediente"}`
      )
    : [];

  const quantity = cartItem.quantity;
  const totalPrice = cartItem.quantity * cartItem.unitPrice;

  const { increaseCartItemQuantity, decreaseCartItemQuantity } = useCart();

  const increaseQuantity = () => {
    if (quantity < 10) {
      increaseCartItemQuantity(cartItem, 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      decreaseCartItemQuantity(cartItem, 1);
    }
  };

  const removeItem = () => {
    onRemove();
  };

  let combinedText = "";
  if (variantValue && ingredientsArray.length > 0) {
    combinedText = `${variantValue} · ${ingredientsArray.join(" · ")}`;
  } else if (variantValue) {
    combinedText = variantValue;
  } else if (ingredientsArray.length > 0) {
    combinedText = ingredientsArray.join(" · ");
  }

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          size="md"
          source={{ uri: cartItem.product.image }}
          alt={cartItem.product.name}
        />
      </View>
      <VStack space="xs" style={styles.detailsContainer}>
        <Heading size="sm" isTruncated={true} style={styles.productName}>
          {cartItem.product.name}
        </Heading>
        <View style={styles.details}>
          {combinedText !== "" && (
            <HStack>
              <Text size="2xs">{combinedText}</Text>
            </HStack>
          )}
        </View>
        <Heading size="xs" style={styles.price}>
          ${totalPrice.toFixed(2)}
        </Heading>
      </VStack>
      <View style={styles.priceContainer}>
        <CartItemQuantity 
          quantity={quantity} 
          onIncrease={increaseQuantity} 
          onDecrease={decreaseQuantity}
          onDecreaseToZero={removeItem}
        />
      </View>
    </View>
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
  imageContainer: {
    justifyContent: 'center',
  },
  detailsContainer: {
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '55%',
    paddingLeft: 10,
    paddingRight: 5,
  },
  productName: { 
    fontWeight: 'normal',
  },
  details: {
    marginTop: -6,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    fontWeight: 'normal',
    color: Colors.light.mediumDarkBlue,
  },
});

export default React.memo(CartItemCard);
