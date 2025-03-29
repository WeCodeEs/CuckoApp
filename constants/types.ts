import { Session } from "@supabase/auth-js";

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  active: boolean;
}

export interface Variant {
  id: number;
  productId: number;
  name: string;
  additionalPrice: number;
}

export interface CustomizableIngredient {
  id: number;
  productId: number;
  ingredientId: number;
  customizationType: string;
  info?: Ingredient;
}

export interface Ingredient {
  id: number;
  name: string;
  additionalPrice: number;
}

export interface User {
  uuid?: string;
  phone?: string;
  name?: string;
  lastName?: string;
  email?: string;
  facultyId?: number;
  avatar?: number | string | null; 
  session?: Session | null;
}

export interface Faculty {
  id: number;
  name: string;
}


export interface Category {
  id: number;
  menuId: number;
  name: string;
  description: string;
}

export interface Menu {
  id: number;
  name: string;
  description: string;
  status: 'Activo' | 'Inactivo';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  selectedVariant: Variant | undefined;
  ingredients: CustomizableIngredient[] | undefined;
};

export interface Order {
  id: number;
  items: { id: number; quantity: number }[];
  finalPrice: number;
  date: string;
  time: string;
  status: string;
}
