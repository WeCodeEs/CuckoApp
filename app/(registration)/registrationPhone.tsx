import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { View } from "@/components/ui/view";
import { Text } from '@/components/ui/text';
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import InputPhone from '@/components/InputPhone';
import { Colors } from '@/constants/Colors';
import { Button, ButtonText } from '@/components/ui/button';
import CuckooIsotipo from '@/assets/images/vectors/CuckooIsotipo';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
} from '@/components/ui/actionsheet';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';

const RegistrationPhone = () => {
  const [buttonColor, setButtonColor] = useState(Colors.light.darkBlue);

  const handlePressIn = () => {
    setButtonColor(Colors.light.mediumBlue);
  };

  const handlePressOut = () => {
    setButtonColor(Colors.light.darkBlue);
  };

  const handleCancelEdit = () => {
    console.log("Edición cancelada");
  };

  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const handleClose = () => setShowActionsheet(false)

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}
        >
          <Center style={styles.header_container}>
            <View style={styles.image_container}>
              <CuckooIsotipo style={styles.logo} />
            </View>
            <Heading style={styles.title} size='2xl'>Bienvenido</Heading>
            <Text style={styles.text}>Para continuar, ingresa un número de celular</Text>
            <Center style={styles.general_container}>
              <InputPhone
                initialPhone={"52"}
                initialLada={"9511234567"}
                editable={false}
                onCancelEdit={handleCancelEdit}
                headingText="Teléfono"
              />
            </Center>
          </Center>

          <Button
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setShowActionsheet(true)}
            style={[styles.nextButton, { backgroundColor: buttonColor }]}
          >
            <ButtonText>Siguiente</ButtonText>
          </Button>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationPhone;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    height: '100%',
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20, 
  },
  header_container: {
    width: '100%',
  },
  image_container: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    position: 'relative',
    width: '60%',
    aspectRatio: '1/1',
  },
  title: {
    marginTop: -40,
    paddingBottom: 10,
  },
  text: {
    marginHorizontal: 20,
    textAlign: 'center',
  },
  general_container: {
    padding: 30,
    width: '100%',
    height: 'auto',
  },
  nextButton: {
    borderRadius: 30,
    marginHorizontal: 30,
  },
});
