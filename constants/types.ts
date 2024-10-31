export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    customizableIngredients?: { id: number; ingredientName: string; extraPrice: number; }[];
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