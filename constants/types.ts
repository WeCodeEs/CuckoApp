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

export interface Category {
    name: string;
    products: Product[];
}

export interface Menu {
    id: number;
    name: string;
    description: string;
    status: boolean;
    categories: Category[];
}

export interface ApiResponse {
    record: {
        menus: Menu[];
    };
}