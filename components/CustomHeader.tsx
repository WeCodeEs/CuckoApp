import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@/components/ui/image';
import { Divider } from '@/components/ui/divider';
import { Avatar,AvatarBadge,AvatarFallbackText,AvatarImage } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { HStack } from './ui/hstack';
import { Grid, GridItem } from '@/components/ui/grid';
import { Drawer, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody, DrawerFooter } from '@/components/ui/drawer';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Icon } from '@/components/ui/icon';
import { Button,ButtonText } from '@/components/ui/button';
import { User, Settings, CreditCard, History, Share, LogOut } from "lucide-react-native";

export function CustomHeader() {
  const navigation = useNavigation();
  const [showDrawer, setShowDrawer] = React.useState(false)
  const [stylesReady, setStylesReady] = useState(false);

  useEffect(() => {
    const loadStyles = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStylesReady(true);
      } catch (error) {
        console.error('Error al cargar el Header', error);
      }
    };

    loadStyles();
  }, []);

  if (!stylesReady) {
    return (
      <>
        <SafeAreaView style={styles.container}/>
        <Divider/>
      </>
    );
  }

  return (
    <>
    <SafeAreaView style={styles.container}>

    <Grid className="gap-2 px-4" _extra={{ className: 'grid-cols-8' }} >
      <GridItem className="flex items-start justify-center" _extra= {{ className: 'col-span-2' }}>
        <Pressable onPress={() => { setShowDrawer(true) }} className="h-12 w-12">
          <Avatar className="w-full h-full" >
              <AvatarFallbackText>Carlos Gonzalez</AvatarFallbackText>
              <AvatarImage
              source={{
                  uri: 'https://media.licdn.com/dms/image/v2/D5603AQEz4rRbs8-dEg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718265562308?e=1732752000&v=beta&t=xhngKflrHu1ehoSQuZMhgZ8rXAvBZFzH1B_wZmLiMu4',
              }}
              />
              <AvatarBadge />
          </Avatar>
        </Pressable>
      <Drawer isOpen={showDrawer} onClose={() => {setShowDrawer(false)}}>
        <DrawerBackdrop />
        <DrawerContent className="w-70 md:w-75 pt-40">
          <DrawerHeader className="justify-center flex-col gap-2">
            <Avatar size="2xl">
              <AvatarFallbackText>User Image</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: 'https://media.licdn.com/dms/image/v2/D5603AQEz4rRbs8-dEg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718265562308?e=1732752000&v=beta&t=xhngKflrHu1ehoSQuZMhgZ8rXAvBZFzH1B_wZmLiMu4',
                }}
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
          <DrawerBody contentContainerClassName="gap-2">
            <Pressable className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md">
              <Icon as={User} size="lg" className="text-typography-600" />
              <Text>Perfil</Text>
            </Pressable>
            <Pressable className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md">
              <Icon as={Settings} size="lg" className="text-typography-600" />
              <Text>Configuración</Text>
            </Pressable>
            <Pressable className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md">
              <Icon
                as={CreditCard}
                size="lg"
                className="text-typography-600"
              />
              <Text>Métodos de pago</Text>
            </Pressable>
            <Pressable className="gap-3 flex-row items-center  hover:bg-background-50 p-2 rounded-md">
              <Icon as={History} size="lg" className='text-typography-600' />
              <Text>Historial de pedidos</Text>
            </Pressable>
            <Pressable className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md">
              <Icon as={Share} size="lg" className="text-typography-600" />
              <Text>Compartir App</Text>
            </Pressable>
          </DrawerBody>
          <DrawerFooter className='justify-center'>
            <Button
              className="w-2/3 gap-2 rounded-full"
              variant="outline"
              action="secondary"
            >
              <ButtonText>Cerrar sesión</ButtonText>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </GridItem>
      <GridItem className="items-center" _extra={{ className: 'col-span-4' }}>
        <Box className="w-full items-center">
          <Image 
              className="rounded-full w-38 h-full"
              source={require('@/assets/images/CuckoLogoTop.png')} 
              alt="Logo Superior Cuckoo"
              resizeMode="contain"
          />
        </Box>
      </GridItem>
      <GridItem className="flex items-end justify-center" _extra= {{ className: 'col-span-2' }}/>
    </Grid>
    <Divider/>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 130 : 115,
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});