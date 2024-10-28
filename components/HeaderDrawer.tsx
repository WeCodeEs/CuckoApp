import React, { useState } from 'react';
import { Drawer, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody, DrawerFooter } from '@/components/ui/drawer';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { Pressable, View, StyleSheet } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Button, ButtonText } from '@/components/ui/button';
import { User, Settings, CreditCard, History, Share } from "lucide-react-native";
import { Text } from '@/components/ui/text';
import { useRouter } from "expo-router";

interface HeaderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HeaderDrawer({ isOpen, onClose }: HeaderDrawerProps) {
  const router = useRouter();

  const [bgColor, setBgColor] = useState({
    profile: 'transparent',
    config: 'transparent',
    payment: 'transparent',
    history: 'transparent',
    share: 'transparent',
  });

  type DrawerRoutes = 
  | '/(drawer)/profile'
  | '/(drawer)/configuration'
  | '/(drawer)/paymentMethods'
  | '/(drawer)/orderHistory'
  | '/(drawer)/shareApp';

  const handlePressIn = (key: string) => {
    setBgColor(prev => ({ ...prev, [key]: '#f0f0f0' }));
  };

  const handlePressOut = (key: string) => {
    setBgColor(prev => ({ ...prev, [key]: 'transparent' }));
  };

  const handleNavigation = (route: DrawerRoutes) => {
    router.push(route);

    setTimeout(() => {
      onClose();
    }, 300); 
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerBackdrop />
      <DrawerContent className="w-70 md:w-75 pt-40">
        <DrawerHeader className="justify-center flex-col gap-2">
          <Avatar size="2xl">
            <AvatarFallbackText>User Image</AvatarFallbackText>
            <AvatarImage
              source={{ uri: 'https://media.licdn.com/dms/image/v2/D5603AQEz4rRbs8-dEg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718265562308?e=1732752000&v=beta&t=xhngKflrHu1ehoSQuZMhgZ8rXAvBZFzH1B_wZmLiMu4' }}
            />
          </Avatar>
          <VStack className="justify-center items-center">
            <Text size="lg">Carlos González</Text>
            <Text size="sm" className="text-typography-600">
              cjgonz14@gmail.com
            </Text>
          </VStack>
        </DrawerHeader>
        <Divider className="my-4" />
        <DrawerBody contentContainerClassName="gap-1">  
          <Pressable
            onPressIn={() => handlePressIn('profile')}
            onPressOut={() => handlePressOut('profile')}
            onPress={() => handleNavigation('/(drawer)/profile')}  
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
            onPress={() => handleNavigation('/(drawer)/configuration')}  
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
            onPress={() => handleNavigation('/(drawer)/paymentMethods')}  
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
            onPress={() => handleNavigation('/(drawer)/orderHistory')}  
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
            onPress={() => handleNavigation('/(drawer)/shareApp')}  
            style={[styles.pressable, { backgroundColor: bgColor.share }]}
          >
            <View style={styles.row}>
              <Icon as={Share} size="lg" className="text-typography-600" />
              <Text>Compartir App</Text>
            </View>
          </Pressable>
        </DrawerBody>
        <DrawerFooter className="justify-center">
          <Button className="w-2/3 gap-2 rounded-full" variant="outline" action="secondary">
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
