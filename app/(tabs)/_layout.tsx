import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { CustomHeader } from '@/components/CustomHeader';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        //Indica el color de una tab cuando está activa o no
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        //Oculta el "title" de cada tabIcon
        tabBarShowLabel: false,
        //Muestra u oculta el header
        // headerShown: false,
        //Muestra un header personalizado
        // header: () => <CustomHeader />,
      }}>
      <Tabs.Screen
        //Define a qué vista se redirigirá cuando se de clic sobre la tab
        name="(home)"
        options={{
          //Define el texto que se mostrará debajo del ícono
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            //Define el ícono que se mostrará
            <TabBarIcon name={focused ? 'House' : 'House'} color={color} />
            //Los nombres de ícono compuestos no usan guiones, sino CammelCase
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
        name="cart"
        options={{
          title: 'Carrito',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'ShoppingCart' : 'ShoppingCart'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
