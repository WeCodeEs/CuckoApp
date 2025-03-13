import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { CartItem } from '@/constants/types';

interface CartContextProps {
  cartItems: CartItem[];
  totalCartValue: number;
  addCartItem: (newItem: CartItem) => void;
  removeCartItem: (itemToRemove: CartItem) => void;
  increaseCartItemQuantity: (item: CartItem, amount: number) => void;
  decreaseCartItemQuantity: (item: CartItem, amount: number) => void;
  emptyCart: () => void;
  cartItemsCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCartValue, setTotalCartValue] = useState<number>(0);

  const updateTotalCartValue = (change: number) => {
    setTotalCartValue(prev => prev + change);
  };

  const isSameCartItem = (item: CartItem, newItem: CartItem): boolean => {
    if (item.product.id !== newItem.product.id) {
      return false;
    }
  
    if (newItem.selectedVariant) {
      if (!item.selectedVariant || item.selectedVariant.id !== newItem.selectedVariant.id) {
        return false;
      }
    }
  
    if (newItem.ingredients && newItem.ingredients.length > 0) {
      if (!item.ingredients || item.ingredients.length !== newItem.ingredients.length) {
        return false;
      }
      const newIngredientsIds = newItem.ingredients.map(i => i.ingredientId).sort();
      const itemIngredientsIds = item.ingredients.map(i => i.ingredientId).sort();
      if (JSON.stringify(newIngredientsIds) !== JSON.stringify(itemIngredientsIds)) {
        return false;
      }
    }
  
    return true;
  };
  

  const addCartItem = (newItem: CartItem) => {
    setCartItems(prevItems => {
      const index = prevItems.findIndex(item => isSameCartItem(item, newItem));
      let updatedItems = [...prevItems];
      if (index >= 0) {
        updatedItems[index].quantity += newItem.quantity;
      } else {
        updatedItems.push(newItem);
      }
      updateTotalCartValue(newItem.quantity * newItem.unitPrice);
      return updatedItems;
    });
  };
  

  const removeCartItem = (itemToRemove: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item =>
        JSON.stringify(item.product) === JSON.stringify(itemToRemove.product) &&
        JSON.stringify(item.selectedVariant) === JSON.stringify(itemToRemove.selectedVariant) &&
        JSON.stringify(item.ingredients) === JSON.stringify(itemToRemove.ingredients)
      );
      if (existingItem) {
        updateTotalCartValue(-existingItem.quantity * existingItem.unitPrice);
      }
      return prevItems.filter(item =>
        !(
          JSON.stringify(item.product) === JSON.stringify(itemToRemove.product) &&
          JSON.stringify(item.selectedVariant) === JSON.stringify(itemToRemove.selectedVariant) &&
          JSON.stringify(item.ingredients) === JSON.stringify(itemToRemove.ingredients)
        )
      );
    });
  };

  const increaseCartItemQuantity = (item: CartItem, amount: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(cartItem => {
        if (
          JSON.stringify(cartItem.product) === JSON.stringify(item.product) &&
          JSON.stringify(cartItem.selectedVariant) === JSON.stringify(item.selectedVariant) &&
          JSON.stringify(cartItem.ingredients) === JSON.stringify(item.ingredients)
        ) {
          cartItem.quantity += amount;
          updateTotalCartValue(amount * cartItem.unitPrice);
        }
        return cartItem;
      });
      return updatedItems;
    });
  };

  const decreaseCartItemQuantity = (item: CartItem, amount: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(cartItem => {
        if (
          JSON.stringify(cartItem.product) === JSON.stringify(item.product) &&
          JSON.stringify(cartItem.selectedVariant) === JSON.stringify(item.selectedVariant) &&
          JSON.stringify(cartItem.ingredients) === JSON.stringify(item.ingredients)
        ) {
          cartItem.quantity -= amount;
          updateTotalCartValue(-amount * cartItem.unitPrice);
        }
        return cartItem;
      });
      return updatedItems;
    });
  };

  const emptyCart = () => {
    setCartItems([]);
    setTotalCartValue(0);
  };

  const cartItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(() => ({
    cartItems,
    totalCartValue,
    addCartItem,
    removeCartItem,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    emptyCart,
    cartItemsCount,
  }), [cartItems, totalCartValue, cartItemsCount]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
