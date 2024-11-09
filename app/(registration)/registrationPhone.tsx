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
import RegistrationActionSheet from '@/components/RegistrationActionSheet';


const RegistrationPhone = () => {
  const [buttonColor, setButtonColor] = useState(Colors.light.darkBlue);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [lada, setLada] = useState("52");
  const [phone, setPhone] = useState("9511234567");

  const handleLadaChange = (newLada: string) => setLada(newLada);
  const handlePhoneChange = (newPhone: string) => setPhone(newPhone);

  const handleCancelEdit = () => {
    console.log("Edición cancelada");
  };

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
                lada={lada}
                phone={phone}
                onLadaChange={handleLadaChange}
                onPhoneChange={handlePhoneChange}
                editable={false}
                headingText="Teléfono"
              />
            </Center>
          </Center>

          <Button
            onPressIn={() => setButtonColor(Colors.light.mediumBlue)}
            onPressOut={() => setButtonColor(Colors.light.darkBlue)}
            onPress={() => setShowActionsheet(true)}
            style={[styles.nextButton, { backgroundColor: buttonColor }]}
          >
            <ButtonText>Siguiente</ButtonText>
          </Button>
          <RegistrationActionSheet
            isOpen={showActionsheet}
            onClose={() => setShowActionsheet(false)}
            lada={lada}
            phone={phone}
          />
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
