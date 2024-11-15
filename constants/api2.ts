import { ApiResponse, Menu, Product } from '@/constants/types';

const API_URL = process.env.EXPO_PUBLIC_API_URL2 ?? "";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? "";

if (!API_KEY || !API_URL) {
  console.error("API Key o API URL no definidos.");
  throw new Error("Las variables de entorno API_KEY o API_URL no están definidas.");
}

export async function fetchAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "X-Master-Key": API_KEY
        }
      });
      const data = await response.json();
      return data.record.products;
    } catch (error) {
      console.error("Error al obtener todos los productos:", error);
      throw error;
    }
  }
  
export async function fetchProductById(productId: number): Promise<Product | undefined> {
    try {
      const products = await fetchAllProducts();
      const product = products.find((product) => product.id === productId);
      return product;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      throw error;
    }
}


export async function fetchVariantsByProductId(productId: number) {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Master-Key": API_KEY
      }
    });
    const data = await response.json();
    const variants = data.record.variants.filter((variant: any) => variant.productId === productId);
    return variants;
  } catch (error) {
    console.error("Error al obtener variantes:", error);
    return [];
  }
}

export async function fetchCustomizableIngredientsByProductId(productId: number) {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Master-Key": API_KEY
      }
    });
    const data = await response.json();
    const customizableIngredients = data.record.customizableIngredients.filter(
      (ingredient: any) => ingredient.productId === productId
    );
    return customizableIngredients;
  } catch (error) {
    console.error("Error al obtener ingredientes personalizables:", error);
    return [];
  }
}

export async function fetchIngredientInfo(ingredientId: number) {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Master-Key": API_KEY
      }
    });
    const data = await response.json();
    const ingredient = data.record.ingredients.find((ing: any) => ing.id === ingredientId);
    return ingredient;
  } catch (error) {
    console.error("Error al obtener información del ingrediente:", error);
    return null;
  }
}  