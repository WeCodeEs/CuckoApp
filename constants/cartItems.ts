import { Product, Variant, Ingredient, CartItem } from '@/constants/types';

  export let cartItems: CartItem[] = [];
  
  export const getCartItems = (): CartItem[] => cartItems;
  
  export const addcartItem = (
    product: Product,
    quantity: number,
    unitPrice: number,
    selectedVariant: Variant | undefined,
    ingredients: Ingredient[] | undefined
  ) => {
    console.log(`Producto agregado al carrito ${product}`);
    
    const existingIndex = cartItems.findIndex(cartItem =>
      JSON.stringify(cartItem.product) === JSON.stringify(product) && 
      JSON.stringify(cartItem.selectedVariant) === JSON.stringify(selectedVariant) &&
      JSON.stringify(cartItem.ingredients) === JSON.stringify(ingredients)
    );
    
    if (existingIndex >= 0) {
      cartItems[existingIndex].quantity += quantity;
    } else {
      cartItems.push({ product, quantity, unitPrice, selectedVariant, ingredients });
    }
  };
  
  export const removeCartItem = (
    product: Product,
    selectedVariant: Variant | undefined,
    ingredients: Ingredient[] | undefined
  ) => {
    console.log(`Producto eliminado del carrito ${product}`);
    cartItems = cartItems.filter(cartItem =>
      !(
        JSON.stringify(cartItem.product) === JSON.stringify(product) && 
        JSON.stringify(cartItem.selectedVariant) === JSON.stringify(selectedVariant) &&
        JSON.stringify(cartItem.ingredients) === JSON.stringify(ingredients)
      )
    );
  };
  