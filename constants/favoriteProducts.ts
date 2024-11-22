let favoriteProductIds: number[] = [2, 3, 4, 5, 6];

export const getFavoriteProductIds = () => favoriteProductIds;

export const addFavoriteProductId = (id: number) => {
  if (!favoriteProductIds.includes(id)) {
    favoriteProductIds.push(id);
  }
};

export const removeFavoriteProductId = (id: number) => {
  favoriteProductIds = favoriteProductIds.filter((productId) => productId !== id);
};
