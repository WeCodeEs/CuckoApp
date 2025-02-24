export type CartProduct = {
    id: number;
    quantity: number;
    unitPrice: number;
    selectedVariant: string;
    ingredients: string[];
  };
  
  export let cartProducts: CartProduct[] = [];
  
  export const getCartProducts = (): CartProduct[] => cartProducts;
  
  export const addCartProduct = (
    id: number,
    quantity: number,
    unitPrice: number,
    selectedVariant: string,
    ingredients: string[]
  ) => {
    console.log(`Producto agregado al carrito ${id}`);
    
    const existingIndex = cartProducts.findIndex(product =>
      product.id === id &&
      product.selectedVariant === selectedVariant &&
      JSON.stringify(product.ingredients) === JSON.stringify(ingredients)
    );
    
    if (existingIndex >= 0) {
      cartProducts[existingIndex].quantity += quantity;
    } else {
      cartProducts.push({ id, quantity, unitPrice, selectedVariant, ingredients });
    }
  };
  
  export const removeCartProduct = (
    id: number,
    selectedVariant: string,
    ingredients: string[]
  ) => {
    console.log(`Producto eliminado del carrito ${id}`);
    cartProducts = cartProducts.filter(product =>
      !(
        product.id === id &&
        product.selectedVariant === selectedVariant &&
        JSON.stringify(product.ingredients) === JSON.stringify(ingredients)
      )
    );
  };
  