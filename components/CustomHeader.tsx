// CustomHeader.tsx
import React from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@/components/ui/image';
import { Divider } from '@/components/ui/divider';
// import {
//   Avatar,
//   AvatarBadge,
//   AvatarFallbackText,
//   AvatarImage,
// } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';

export function CustomHeader() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}> 
      {/* <Avatar size="md" >
          <AvatarFallbackText>Jane Doe</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
        />
        <AvatarBadge />
        </Avatar> */}
      
      <View style={styles.imageContainer}>
        <Image 
            source={require('@/assets/images/CuckoLogoTop.png')} 
            alt="Logo Superior Cuckoo"
            size='2xl'
            resizeMode="contain"
            style={styles.logo} 
        />
      </View>
      <Divider/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 130 : 115,
    paddingTop: Platform.OS === 'ios' ? 0 : 50,
    // height: 130,
    alignItems: 'center',
    backgroundColor: '#FFF',
    // backgroundColor: '#F2F2F2',
    // backgroundColor: '#6200ee',
    // borderColor: 'red',
    // borderWidth: 5
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    // borderColor: 'yellow',
    // borderWidth: 5,
  },
  logo: {
    borderColor: 'red',
    borderWidth: 3,
  },
});