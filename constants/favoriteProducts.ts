export let favoriteProductIds: number[] = [];

export const getFavoriteProductIds = () => favoriteProductIds;

export const addFavoriteProductId = (id: number) => {
  console.log("Producto agregado a favoritos "+ id)
  if (!favoriteProductIds.includes(id)) {
    favoriteProductIds.push(id);
  }
};

export const removeFavoriteProductId = (id: number) => {
  console.log("Producto eliminado de favoritos "+ id)
  favoriteProductIds = favoriteProductIds.filter((productId) => productId !== id);
};
