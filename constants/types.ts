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
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  lada: string;
  phone: string;
  role: string;
  facultyId: number | null;
  creationDate: string;
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
