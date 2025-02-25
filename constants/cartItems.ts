import { CartItem } from '@/constants/types';

export let cartItems: CartItem[] = [];
export let totalCartValue: number = 0;

export const getCartItems = (): CartItem[] => cartItems;
export const getTotalCartValue = (): number => totalCartValue;

export const addCartItem = (newCartItem: CartItem) => {
  console.log(`Producto agregado al carrito ${newCartItem.product}`);
  
  const existingIndex = cartItems.findIndex(cartItem =>
    JSON.stringify(cartItem.product) === JSON.stringify(newCartItem.product) && 
    JSON.stringify(cartItem.selectedVariant) === JSON.stringify(newCartItem.selectedVariant) &&
    JSON.stringify(cartItem.ingredients) === JSON.stringify(newCartItem.ingredients)
  );

  let changeInValue: number;
  
  if (existingIndex >= 0) {
    cartItems[existingIndex].quantity += newCartItem.quantity;
  } else {
    cartItems.push(newCartItem);
  }
  
  changeInValue = newCartItem.quantity * newCartItem.unitPrice;
  updateTotalCartValue(changeInValue);
};

export const removeCartItem = (cartItemToRemove: CartItem) => {
  console.log(`Producto eliminado del carrito ${cartItemToRemove.product}`);
  
  const changeInValue = -cartItemToRemove.quantity * cartItemToRemove.unitPrice;
  updateTotalCartValue(changeInValue);
  
  cartItems = cartItems.filter(cartItem =>
    !(
      JSON.stringify(cartItem.product) === JSON.stringify(cartItemToRemove.product) &&
      JSON.stringify(cartItem.selectedVariant) === JSON.stringify(cartItemToRemove.selectedVariant) &&
      JSON.stringify(cartItem.ingredients) === JSON.stringify(cartItemToRemove.ingredients)
    )
  );
};

export const increaseCartItemQuantity = (cartItemToIncrease: CartItem, addedQuantity: number) => {
  console.log(`El item ${cartItemToIncrease} ha incrementado su cantidad en ${addedQuantity}`);
  const selectedCartItem = cartItems.find(cartItem =>
    JSON.stringify(cartItem.product) === JSON.stringify(cartItemToIncrease.product) &&
    JSON.stringify(cartItem.selectedVariant) === JSON.stringify(cartItemToIncrease.selectedVariant) &&
    JSON.stringify(cartItem.ingredients) === JSON.stringify(cartItemToIncrease.ingredients)
  );
  selectedCartItem!.quantity+= addedQuantity;
  const changeInValue = addedQuantity * (selectedCartItem!.unitPrice);
  updateTotalCartValue(changeInValue);
};

export const dereaseCartItemQuantity = (cartItemToDecrease: CartItem, removedQuantity: number) => {
  console.log(`El item ${cartItemToDecrease} ha reducido su cantidad en ${removedQuantity}`);
  const selectedCartItem = cartItems.find(cartItem =>
    JSON.stringify(cartItem.product) === JSON.stringify(cartItemToDecrease.product) &&
    JSON.stringify(cartItem.selectedVariant) === JSON.stringify(cartItemToDecrease.selectedVariant) &&
    JSON.stringify(cartItem.ingredients) === JSON.stringify(cartItemToDecrease.ingredients)
  );
  selectedCartItem!.quantity-= removedQuantity;
  const changeInValue = -removedQuantity * (selectedCartItem!.unitPrice);
  updateTotalCartValue(changeInValue);
};

export const emptyCart = () => {
  console.log(`Se ha vaciado el carrito`);
  cartItems.length = 0;
  const currentValue = getTotalCartValue();
  updateTotalCartValue(-currentValue);
};

const updateTotalCartValue = (changeInValue: number) => {
  console.log(`Valor anterior de los elementos del carrito ${totalCartValue}`);
  totalCartValue += changeInValue;
  console.log(`Valor actualizado de los elementos del carrito ${totalCartValue}`);
};
