import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { CustomHeader } from '@/components/CustomHeader';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCart } from '@/contexts/CartContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { cartItemsCount } = useCart();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarShowLabel: false,
        header: () => <CustomHeader />,
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'House' : 'House'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'Heart' : 'Heart'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(cart)"
        options={{
          title: 'Carrito',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'ShoppingCart' : 'ShoppingCart'} color={color} />
          ),
          tabBarBadge: cartItemsCount > 0 ? cartItemsCount.toString() : undefined,
          tabBarBadgeStyle: {backgroundColor: Colors.light.mediumBlue, color: Colors.light.background}
        }}
      />
    </Tabs>
  );
}
