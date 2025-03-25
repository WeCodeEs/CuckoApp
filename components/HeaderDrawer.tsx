import React, { useState } from 'react';
import { Drawer, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from '@/components/ui/drawer';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { Pressable, View, StyleSheet } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Button, ButtonText } from '@/components/ui/button';
import { User, Settings, CreditCard, History, Share } from "lucide-react-native";
import { Text } from '@/components/ui/text';
import { useRouter, useSegments } from "expo-router";
import { useUser } from '@/contexts/UserContext';

interface HeaderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HeaderDrawer({ isOpen, onClose }: HeaderDrawerProps) {
  const router = useRouter();
  const segments = useSegments();
  const { user, clearUser } = useUser();

  const defaultAvatar = require("@/assets/images/avatars/avatar-icon-1.png");

  const getAvatarSource = () => {
    if (!user?.avatar) {
      return defaultAvatar;
    }
    return typeof user.avatar === "number" ? user.avatar : { uri: user.avatar };
  };

  const [bgColor, setBgColor] = useState({
    profile: 'transparent',
    config: 'transparent',
    payment: 'transparent',
    history: 'transparent',
    share: 'transparent',
  });

  const [variant, setVariant] = useState<"outline" | "link" | "solid">("outline");

  type DrawerRoutes = 
    | '/(tabs)/(home)/profile'
    | '/(tabs)/(home)/configuration'
    | '/(tabs)/(home)/paymentMethods'
    | '/(tabs)/(home)/orderHistory'
    | '/(tabs)/(home)/shareApp';

  type RegistrationRoutes = 
    | '/(registration)/registrationPhone'
    | '/(registration)/registrationForm';

  const handlePressIn = (key: string) => {
    setBgColor(prev => ({ ...prev, [key]: '#f0f0f0' }));
  };

  const handlePressOut = (key: string) => {
    setBgColor(prev => ({ ...prev, [key]: 'transparent' }));
  };

  const handlePressInButton = () => {
    setVariant("solid");
  };

  const handlePressOutButton = () => {
    setVariant("outline");
  };

  const handleNavigation = (route: DrawerRoutes) => {   
    const currentPath = `/${segments.join("/")}`;

    if (currentPath === route) {
      setTimeout(() => {
        onClose();
      }, 300);
      return;
    }
    
    router.dismissTo('/(tabs)/(home)');
    router.push({ pathname: route });
    setTimeout(() => {
      onClose();
    }, 300);
  };
  
  const handleNavigationButton = (route: RegistrationRoutes) => {
    router.replace(route);
    setTimeout(() => {
      onClose();
    }, 300); 
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerBackdrop />
      <DrawerContent className="w-70 md:w-75 pt-40">
        <DrawerHeader className="justify-center flex-col gap-2">
          <Avatar size="2xl">
            <AvatarFallbackText>
              {user ? `${user.name || ''} ${user.lastName || ''}` : 'Invitado'}
            </AvatarFallbackText>
            <AvatarImage source={getAvatarSource()} />
          </Avatar>
          <VStack className="justify-center items-center">
            <Text size="lg">
              {user ? `${user.name || ''} ${user.lastName || ''}` : 'Invitado'}
            </Text>
            <Text size="sm" className="text-typography-600">
              {user?.email || 'Sin correo'}
            </Text>
          </VStack>
        </DrawerHeader>
        <Divider className="my-4" />
        <DrawerBody contentContainerClassName="gap-1">
          <Pressable
            onPressIn={() => handlePressIn('profile')}
            onPressOut={() => handlePressOut('profile')}
            onPress={() => handleNavigation('/(tabs)/(home)/profile')}  
            style={[styles.pressable, { backgroundColor: bgColor.profile }]}
          >
            <View style={styles.row}>
              <Icon as={User} size="lg" className="text-typography-600" />
              <Text>Perfil</Text>
            </View>
          </Pressable>
          <Pressable
            onPressIn={() => handlePressIn('config')}
            onPressOut={() => handlePressOut('config')}
            onPress={() => handleNavigation('/(tabs)/(home)/configuration')}  
            style={[styles.pressable, { backgroundColor: bgColor.config }]}
          >
            <View style={styles.row}>
              <Icon as={Settings} size="lg" className="text-typography-600" />
              <Text>Configuración</Text>
            </View>
          </Pressable>
          <Pressable
            onPressIn={() => handlePressIn('payment')}
            onPressOut={() => handlePressOut('payment')}
            onPress={() => handleNavigation('/(tabs)/(home)/paymentMethods')}  
            style={[styles.pressable, { backgroundColor: bgColor.payment }]}
          >
            <View style={styles.row}>
              <Icon as={CreditCard} size="lg" className="text-typography-600" />
              <Text>Métodos de pago</Text>
            </View>
          </Pressable>
          <Pressable
            onPressIn={() => handlePressIn('history')}
            onPressOut={() => handlePressOut('history')}
            onPress={() => handleNavigation('/(tabs)/(home)/orderHistory')}  
            style={[styles.pressable, { backgroundColor: bgColor.history }]}
          >
            <View style={styles.row}>
              <Icon as={History} size="lg" className="text-typography-600" />
              <Text>Historial de pedidos</Text>
            </View>
          </Pressable>
          <Pressable
            onPressIn={() => handlePressIn('share')}
            onPressOut={() => handlePressOut('share')}
            onPress={() => handleNavigation('/(tabs)/(home)/shareApp')}  
            style={[styles.pressable, { backgroundColor: bgColor.share }]}
          >
            <View style={styles.row}>
              <Icon as={Share} size="lg" className="text-typography-600" />
              <Text>Compartir App</Text>
            </View>
          </Pressable>
        </DrawerBody>
        <DrawerFooter className="justify-center">
          <Button 
            className="w-2/3 gap-2 rounded-full" 
            variant={variant} 
            onPressIn={() => handlePressInButton()}
            onPressOut={() => handlePressOutButton()}
            onPress={() => handleNavigationButton('/(registration)/registrationPhone')}  
            action="secondary"
          >
            <ButtonText>Cerrar sesión</ButtonText>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  pressable: {
    padding: 10,
    marginVertical: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
