// CustomHeader.tsx
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@/components/ui/image';
import { Divider } from '@/components/ui/divider';
import { Avatar,AvatarBadge,AvatarFallbackText,AvatarImage } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { HStack } from './ui/hstack';

export function CustomHeader() {
  const navigation = useNavigation();

  return (
    <>
    <SafeAreaView style={styles.container}>
        <HStack className="justify-between items-center px-2 py-2 bg-white w-full">
            <Box className="w-12 h-12"/>
            <Box className="w-3/4 flex items-center">
                <Image 
                    className="rounded-full w-2/3 h-full"
                    source={require('@/assets/images/CuckoLogoTop.png')} 
                    alt="Logo Superior Cuckoo"
                    size='xl'
                    resizeMode="contain"
                />
            </Box>
            <Box className="h-12 w-12">
                <Avatar className="w-full h-full" >
                    <AvatarFallbackText>Carlos Gonzalez</AvatarFallbackText>
                    <AvatarImage
                    source={{
                        uri: 'https://media.licdn.com/dms/image/v2/D5603AQEz4rRbs8-dEg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718265562308?e=1732752000&v=beta&t=xhngKflrHu1ehoSQuZMhgZ8rXAvBZFzH1B_wZmLiMu4',
                    }}
                    />
                    <AvatarBadge />
                </Avatar>
            </Box>
        </HStack>
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