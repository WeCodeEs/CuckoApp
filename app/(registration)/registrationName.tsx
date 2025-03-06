import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView, View } from 'react-native';
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input, InputField } from '@/components/ui/input';
import { Colors } from '@/constants/Colors';
import { Button, ButtonText } from '@/components/ui/button';
import CuckooIsotipo from '@/assets/images/vectors/CuckooIsotipo';
import { useRouter } from "expo-router";
import { isValidName, sanitizeName } from '@/constants/validations';
import { Alert, AlertText, AlertIcon } from '@/components/ui/alert';
import { Info } from "lucide-react-native";

const RegistrationName = () => {
  const router = useRouter();
  const [buttonColor, setButtonColor] = useState(Colors.light.lightGray);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasEditedName, setHasEditedName] = useState(false);
  const [hasEditedLastName, setHasEditedLastName] = useState(false);
  const [showNameAlert, setShowNameAlert] = useState(false);
  const [showLastNameAlert, setShowLastNameAlert] = useState(false);

  const handleChangeName = (inputName: string) => {
    setHasEditedName(true);
    const { sanitized, hadInvalidChars } = sanitizeName(inputName);

    setName(sanitized);
    setShowNameAlert(hadInvalidChars); 
  };

  const handleBlurName = () => {
    setName(sanitizeName(name, true).sanitized); 
  };

  const handleChangeLastName = (inputLastName: string) => {
    setHasEditedLastName(true);
    const { sanitized, hadInvalidChars } = sanitizeName(inputLastName);

    setLastName(sanitized);
    setShowLastNameAlert(hadInvalidChars);
  };

  const handleBlurLastName = () => {
    setLastName(sanitizeName(lastName, true).sanitized);
  };

  useEffect(() => {
    if (isValidName(name) && isValidName(lastName) && name.length > 0 && lastName.length > 0) {
      setButtonColor(Colors.light.darkBlue);
    } else {
      setButtonColor(Colors.light.lightGray);
    }
  }, [name, lastName]);

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
              <Heading style={styles.title} size='2xl'>¡Genial!</Heading>
              <Text style={styles.text}>Ahora, dinos como te llamas...</Text>
              <View style={styles.field_container}>
                <Heading style={styles.subtitle} size={"lg"}>Nombre</Heading>
                <Input variant="underlined" size="md">
                  <InputField
                    placeholder='Juan Carlos'
                    value={name}
                    onChangeText={handleChangeName}
                    onBlur={handleBlurName}
                  />
                </Input>
                {showNameAlert && (
                  <Alert action="error" variant="solid" className="mt-4">
                    <AlertIcon as={Info} />
                    <AlertText>Este campo solo permite letras y espacios.</AlertText>
                  </Alert>
                )}
              </View>
              <View style={styles.field_container}>
                <Heading style={styles.subtitle} size={"lg"}>Apellidos</Heading>
                <Input variant="underlined" size="md">
                  <InputField
                    placeholder='Pérez Gómez'
                    value={lastName}
                    onChangeText={handleChangeLastName}
                    onBlur={handleBlurLastName}
                  />
                </Input>
                {showLastNameAlert && (
                  <Alert action="error" variant="solid" className="mt-4">
                    <AlertIcon as={Info} />
                    <AlertText>Se eliminaron caracteres no permitidos.</AlertText>
                  </Alert>
                )}
              </View>
            </Center>
          </ScrollView>
            <Center style={styles.buttonContainer}>
              <Button
                onPress={() => router.push({ pathname: "/(registration)/registrationForm", params: { name, lastName } })}
                style={[styles.nextButton, { backgroundColor: buttonColor }]}
                disabled={!isValidName(name) || !isValidName(lastName)}
              >
                <ButtonText>Continuar</ButtonText>
              </Button>
            </Center>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationName;

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
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    marginHorizontal: 20,
    textAlign: 'center',
  },
  field_container: {
    paddingHorizontal: 30,
    paddingBottom: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: -10,
    alignSelf: 'flex-end'
  },
  nextButton: {
    borderRadius: 30,
    width: '60%'
  },
});
