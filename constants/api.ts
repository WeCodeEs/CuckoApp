import { ApiResponse, Menu, Product } from '@/constants/types';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? "";

if (!API_KEY || !API_URL) {
  console.error("API Key o API URL no definidos.");
  throw new Error("Las variables de entorno API_KEY o API_URL no están definidas.");
}

export async function fetchMenus(): Promise<Menu[]> {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Master-Key": API_KEY
      }
    });
    const data: ApiResponse = await response.json();
    return data.record.menus;
  } catch (error) {
    console.error("Error al obtener los menús:", error);
    throw error;
  }
}

export async function fetchMenuByName(menuName: string): Promise<Menu | null> {
    try {
      const response = await fetch(API_URL, {
        headers: { 'X-Master-Key': API_KEY },
      });
      const data = await response.json();
      const menu = data.record.menus.find((menu: Menu) => menu.name === menuName);
      return menu || null;
    } catch (error) {
      console.error("Error fetching menu:", error);
      return null;
    }
  }

export async function fetchProductById(productId: number): Promise<Product | undefined> {
  try {
    const menus = await fetchMenus();
    const product = menus
      .flatMap((menu) => menu.categories)
      .flatMap((category) => category.products)
      .find((product) => product.id === productId);
    
    return product;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
}
