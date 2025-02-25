import { Product, Variant, Ingredient, CartItem } from '@/constants/types';

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

const updateTotalCartValue = (changeInValue: number) => {
  console.log(`Valor anterior de los elementos del carrito ${totalCartValue}`);
  totalCartValue += changeInValue;
  console.log(`Valor actualizado de los elementos del carrito ${totalCartValue}`);
};
