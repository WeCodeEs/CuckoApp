import { Menu, Product, User, Faculty, Category, Notification, Order } from '@/constants/types';
import { supabaseClient } from "@/utils/supabase";
import { Session } from "@supabase/auth-js";
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'

const API_URL_MENU = process.env.EXPO_PUBLIC_API_URL_MENU ?? "";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? "";
const API_URL_NOTI = process.env.EXPO_PUBLIC_API_URL_NOTI ?? "";
const SUPA_EDGE_FUNC = process.env.EXPO_PUBLIC_SUPABASE_PROD_EDGE_FUNCTIONS_URL ?? "";

if (!API_KEY || !API_URL_MENU) {
  console.error("API Key o API URL no definidos.");
  throw new Error("Las variables de entorno API_KEY o API_URL no están definidas.");
}

export async function fetchAllMenus(): Promise<Menu[]> {
  try {
    const response = await fetch(API_URL_MENU, {
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
  const response = await fetch(API_URL_MENU, {
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
      const response = await fetch(API_URL_MENU, {
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
    const response = await fetch(API_URL_MENU, {
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
    const response = await fetch(API_URL_MENU, {
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
    const response = await fetch(API_URL_MENU, {
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
    const response = await fetch(API_URL_MENU, {
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
    const response = await fetch(API_URL_MENU, {
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

export async function fetchAllNotifications(): Promise<Notification[]> {
  try {
    const response = await fetch(API_URL_NOTI, {
      headers: {
        "X-Master-Key": API_KEY
      }
    });
    const data = await response.json();

    const notifications = data.record?.notifications;

    if (Array.isArray(notifications)) {
      return notifications;
    } else {
      console.error("La respuesta no contiene un arreglo de notificaciones:", data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener las notificaciones:", error);
    return [];
  }
}

export async function fetchPaymentIntent() : Promise<string> {
  try {
    const { data, error } = await supabaseClient.functions.invoke("create-payment-intent", {
      body:  { amount: 1000, currency: 'mxn' },
    });

    if (error) throw new Error(error);

    return data.clientSecret;
  } catch (error) {
    console.error("Error al llamar fetchPaymentIntent:", error);
    return "";
  }
};

export async function fetchAllOrders(): Promise<Order[]> {
  try {
    const response = await fetch(API_URL_MENU, {
      headers: { "X-Master-Key": API_KEY }
    });
    const data = await response.json();
    return data.record.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export async function fetchOrderById(orderId: number): Promise<Order | undefined> {
  try {
    const orders = await fetchAllOrders();
    return orders.find(order => order.id === orderId);
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return undefined;
  }
}

export async function signInWithOtp(phoneNumber: string) : Promise<any | null> {
  try {
    const { data, error } = await supabaseClient.auth.signInWithOtp({
      phone: phoneNumber,
    });

    if (error) {
      console.error("Error al registrar usuario:", error.message);
      return null;
    }

    console.log("signInWithOtp returned: ", data);
    return data ?? null;

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return null;
  }
};


export async function verifyOtp(phoneNumber: string, token: string) : Promise<Session | null> {
  try {
    const { data, error } = await supabaseClient.auth.verifyOtp({
      phone: phoneNumber,
      token: token,
      type: 'sms',

    });

    if (error) {
      console.error(`Error al verificar OTP: ${error.message}. OTP usado: ${token}. Telefono usado: ${phoneNumber}.`);
      return null;
    }

    console.log("Codigo OTP verificado: ", data);
    return data?.session ?? null;

  } catch (error) {
    console.error("Error al verificar OTP:", error);
    return null;
  }
};


export async function fetchUserIfRegistered(userToken: string) : Promise<string> {
  try {
    const { data, error } = await supabaseClient.functions.invoke("fetch-or-create-user-profile", {
      body:  { userToken: userToken},
    });

    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json()
      console.log('Function returned an error', errorMessage)
    } else if (error instanceof FunctionsRelayError) {
      console.log('Relay error:', error.message)
    } else if (error instanceof FunctionsFetchError) {
      console.log('Fetch error:', error.message)
    }

    return JSON.stringify(data);
  } catch (error) {
    console.error("Error al llamar fetchUserIfRegistered: ", error);
    return "";
  }
};

export async function saveNameAndLastName(userUuid: string, userName: string, userLastName: string) : Promise<string> {
  try {
    const { data, error } = await supabaseClient.functions.invoke("save-name-and-lastname", {
      body:  { uuid: userUuid, name: userName, lastName: userLastName},
    });

    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json()
      console.log('Function returned an error', errorMessage)
    } else if (error instanceof FunctionsRelayError) {
      console.log('Relay error:', error.message)
    } else if (error instanceof FunctionsFetchError) {
      console.log('Fetch error:', error.message)
    }

    return JSON.stringify(data);
  } catch (error) {
    console.error("Error al llamar saveNameAndLastName: ", error);
    return "";
  }
}

export async function saveEmailAndFaculty(userUuid: string, userEmail: string, userFacultyId: number) : Promise<string> {
  try {
    const { data, error } = await supabaseClient.functions.invoke("save-email-and-faculty", {
      body:  { uuid: userUuid, email: userEmail, facultyId: userFacultyId},
    });

    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json()
      console.log('Function returned an error', errorMessage)
    } else if (error instanceof FunctionsRelayError) {
      console.log('Relay error:', error.message)
    } else if (error instanceof FunctionsFetchError) {
      console.log('Fetch error:', error.message)
    }

    return JSON.stringify(data);
  } catch (error) {
    console.error("Error al llamar saveEmailAndFaculty: ", error);
    return "";
  }
}