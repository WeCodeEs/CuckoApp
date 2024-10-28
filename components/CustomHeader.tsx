import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@/components/ui/image';
import { Divider } from '@/components/ui/divider';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Pressable } from '@/components/ui/pressable';
import { Grid, GridItem } from '@/components/ui/grid';
import { Box } from '@/components/ui/box';
import { HeaderDrawer } from './HeaderDrawer';

export function CustomHeader() {
  const navigation = useNavigation();
  const [showDrawer, setShowDrawer] = useState(false);
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
      <Grid className="gap-2 px-4" _extra={{ className: 'grid-cols-8' }}>
        <GridItem className="flex items-start justify-center" _extra= {{ className: 'col-span-2' }}>
          <Pressable onPress={() => setShowDrawer(true)} className="h-12 w-12">
            <Avatar className="w-full h-full">
              <AvatarFallbackText>Carlos Gonzalez</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: 'https://media.licdn.com/dms/image/v2/D5603AQEz4rRbs8-dEg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718265562308?e=1732752000&v=beta&t=xhngKflrHu1ehoSQuZMhgZ8rXAvBZFzH1B_wZmLiMu4',
                }}
              />
            </Avatar>
          </Pressable>
          <HeaderDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} />
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
