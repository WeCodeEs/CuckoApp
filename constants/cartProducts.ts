export let cartProductsIds: number[] = [];

export const getCartProductIds = () => cartProductsIds;

export const addCartProductId = (id: number) => {
  console.log("Producto agregado al carrito "+ id)
  if (!cartProductsIds.includes(id)) {
    cartProductsIds.push(id);
  }
};

export const removeCartProductId = (id: number) => {
  console.log("Producto eliminado del carrito "+ id)
  cartProductsIds = cartProductsIds.filter((productId) => productId !== id);
};
