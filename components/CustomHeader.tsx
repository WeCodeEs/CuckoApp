// CustomHeader.tsx
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@/components/ui/image';
import { Divider } from '@/components/ui/divider';
import { Avatar,AvatarBadge,AvatarFallbackText,AvatarImage } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';

export function CustomHeader() {
  const navigation = useNavigation();

  return (
    <>
    <SafeAreaView style={styles.container}>
        <Box className="w-full h-full flex flex-row justify-center items-center">
            <Box className="w-3/4 flex items-center">
                <Image 
                    className="rounded-full w-2/3 h-full"
                    source={require('@/assets/images/CuckoLogoTop.png')} 
                    alt="Logo Superior Cuckoo"
                    size='xl'
                    resizeMode="contain"
                />
            </Box>
            <Box className="mr-2 absolute right-0 justify-center">
                <Avatar size="md" >
                    <AvatarFallbackText>Carlos Gonzalez</AvatarFallbackText>
                    <AvatarImage
                    source={{
                        uri: 'https://media.licdn.com/dms/image/v2/D5603AQEz4rRbs8-dEg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718265562308?e=1732752000&v=beta&t=xhngKflrHu1ehoSQuZMhgZ8rXAvBZFzH1B_wZmLiMu4',
                    }}
                    />
                    <AvatarBadge />
                </Avatar>
            </Box>
        </Box>
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