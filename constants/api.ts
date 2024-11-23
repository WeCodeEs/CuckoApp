import { Menu, Product, User, Faculty, Category } from '@/constants/types';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? "";

if (!API_KEY || !API_URL) {
  console.error("API Key o API URL no definidos.");
  throw new Error("Las variables de entorno API_KEY o API_URL no están definidas.");
}

export async function fetchAllMenus(): Promise<Menu[]> {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Master-Key": API_KEY
      }
    });
    const data = await response.json();

    const menus = data.record?.menus;

    if (Array.isArray(menus)) {
      return menus;
    } else {
      console.error("La respuesta no contiene un arreglo de menús:", data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los menús:", error);
    return [];
  }
}

export async function fetchAllCategories(): Promise<Category[]> {
  const response = await fetch(API_URL, {
    headers: {
      "X-Master-Key": API_KEY
    }
  });
  const data = await response.json();
  return data.record.categories;
}

export async function fetchMenuById(menuId: number): Promise<Menu | null> {
  try {
    const menus: Menu[] = await fetchAllMenus();

    if (!menus || menus.length === 0) {
      console.error("No se encontraron menús o la respuesta está vacía.");
      return null;
    }

    const menu = menus.find((menu) => menu.id === menuId);
    return menu || null;
  } catch (error) {
    console.error("Error al obtener el menú por ID:", error);
    return null;
  }
}

export async function fetchProductsByMenuId(menuId: number): Promise<Product[]> {
  try {
    const allCategories = await fetchAllCategories();

    const menuCategories = allCategories.filter((category: Category) => category.menuId === menuId);

    if (menuCategories.length === 0) {
      console.error(`No se encontraron categorías para el menú con ID ${menuId}.`);
      return [];
    }

    const allProducts = await fetchAllProducts();

    const menuProducts: Product[] = allProducts.filter((product: Product) =>
      menuCategories.some((category: Category) => category.id === product.categoryId)
    );

    if (menuProducts.length === 0) {
      console.error(`No se encontraron productos para el menú con ID ${menuId}.`);
    }

    return menuProducts;
  } catch (error) {
    console.error("Error al obtener los productos del menú:", error);
    return [];
  }
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

export async function checkPhoneNumberRegistration(phoneNumber: string): Promise<boolean> {
  try {
    const users = await fetchAllUsers();
    const isPhoneNumberRegistered = users.some((user) => user.phone === phoneNumber);
    return isPhoneNumberRegistered;
  } catch (error) {
    console.error("Error al validar el número de teléfono:", error);
    return false;
  }
}

export async function fetchAllUsers(): Promise<any[]> {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Master-Key": API_KEY
      }
    });
    const data = await response.json();
    return data.record.users;
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    return [];
  }
}

export async function fetchUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
  try {
    const users = await fetchAllUsers();

    const user = users.find((user) => user.phone === phoneNumber);

    return user;
  } catch (error) {
    console.error("Error al obtener el usuario por número de teléfono:", error);
    throw error;
  }
}

export async function fetchAllFaculties(): Promise<any[]> {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Master-Key": API_KEY
      }
    });
    const data = await response.json();
    return data.record.faculties;
  } catch (error) {
    console.error("Error al obtener todas las facultades:", error);
    return [];
  }
}


export async function fetchFacultyById(facultyId: number): Promise<Faculty | undefined> {
  try {
    const faculties = await fetchAllFaculties();
    const faculty = faculties.find((faculty) => faculty.id === facultyId);
    return faculty;
  } catch (error) {
    console.error("Error al obtener la facultad por ID:", error);
    throw error;
  }
}