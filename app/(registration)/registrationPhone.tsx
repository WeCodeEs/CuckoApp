import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import InputPhone from '@/components/InputPhone';
import { Colors } from '@/constants/Colors';
import { Button, ButtonText } from '@/components/ui/button';
import CuckooIsotipo from '@/assets/images/vectors/CuckooIsotipo';
import RegistrationActionSheet from '@/components/RegistrationActionSheet';
import { isValidPhoneNumber, sanitizePhoneNumber, sanitizeLada } from '@/constants/validations';
import { signInWithOtp } from "@/constants/api";
import { useToast } from '@/components/ui/toast';
import ErrorToast from '@/components/ErrorToast';

const RegistrationPhone = () => {
  const [buttonColor, setButtonColor] = useState(Colors.light.lightGray);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [lada, setLada] = useState("52");
  const [phone, setPhone] = useState("");
  const toast = useToast();

  const handleLadaChange = (newLada: string) => {
    setLada(sanitizeLada(newLada));
  };

  const handlePhoneChange = (newPhone: string) => {
    const sanitizedPhone = sanitizePhoneNumber(newPhone);
    setPhone(sanitizedPhone);
  };

  const handleNextPress = () => {
    if (isValidPhoneNumber(phone)) {
      handleSignInWithOtp(lada+phone);
    }
  };

  const handleSignInWithOtp = async (fullPhone: string) => {
    const data = await signInWithOtp(fullPhone);

    if (data != null) {
      setShowActionsheet(true);
    } else {
      toast.show({
        id: "otp-creation-error",
        placement: 'top',
        duration: 5000,
        render: ({ id }) => (
          <ErrorToast
            id={id}
            message="Ha habido un error en la creación del código."
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  }

  useEffect(() => {
    if (isValidPhoneNumber(phone)) {
      setButtonColor(Colors.light.darkBlue);
    } else {
      setButtonColor(Colors.light.lightGray);
    }
  }, [phone]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}
        >
          <ScrollView>
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
          </ScrollView>
          <Center style={styles.buttonContainer}>
            <Button
              onPress={handleNextPress}
              style={[styles.nextButton, { backgroundColor: buttonColor }]}
              disabled={!isValidPhoneNumber(phone)}
            >
              <ButtonText>Siguiente</ButtonText>
            </Button>
          </Center>
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
    aspectRatio: 1,
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
    paddingHorizontal: 30,
    paddingTop: 30,
    marginBottom: 20,
    width: '100%',
    height: 'auto',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: -15,
    alignSelf: 'flex-end'
  },
  nextButton: {
    borderRadius: 30,
    width: '60%'
  },
});
