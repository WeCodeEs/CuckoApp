import React from 'react';
import { StyleSheet } from 'react-native';
import { HStack } from './ui/hstack';
import { Button, ButtonIcon } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { RemoveIcon, AddIcon, TrashIcon } from "@/components/ui/icon";
import { Colors } from '@/constants/Colors';

interface CartItemQuantityProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItemQuantity: React.FC<CartItemQuantityProps> = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <HStack style={styles.amount} space='md'>
      <Button size="xs" onPress={onDecrease} style={styles.amount_btn}>
        <ButtonIcon as={
            quantity == 1 ? TrashIcon : RemoveIcon
          } 
          stroke={Colors.light.ash} 
        />
      </Button>
      <Text style={styles.quantityText} size="md">
        {quantity}
      </Text>
      <Button size="xs" onPress={onIncrease} style={styles.amount_btn}>
        <ButtonIcon as={AddIcon} stroke={Colors.light.ash} />
      </Button>
    </HStack>
  );
};

const styles = StyleSheet.create({
  amount: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount_btn: {
    backgroundColor: Colors.light.lightGray,
    borderRadius: 100,
    aspectRatio: 1,
  },
  quantityText: {
    textAlign: 'center',
  },
});

export default React.memo(CartItemQuantity);
