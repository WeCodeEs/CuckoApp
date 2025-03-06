import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView, View } from 'react-native';
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from '@/components/ui/input';
import { Colors } from '@/constants/Colors';
import { Button, ButtonText } from '@/components/ui/button';
import CuckooIsotipo from '@/assets/images/vectors/CuckooIsotipo';
import InputSelect from '@/components/InputSelect';
import { useRouter, useLocalSearchParams } from "expo-router";
import { isValidEmail, sanitizeEmail } from '@/constants/validations';
import { Alert, AlertText, AlertIcon } from '@/components/ui/alert';
import { Info } from "lucide-react-native";

const RegistrationForm = () => {
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const [buttonColor, setButtonColor] = useState(Colors.light.lightGray);
  const [email, setEmail] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [hasEditedEmail, setHasEditedEmail] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);

  const handleChangeEmail = (inputEmail: string) => {
    setHasEditedEmail(true);
    const { sanitized, hadInvalidChars } = sanitizeEmail(inputEmail);

    setEmail(sanitized);
    setShowEmailAlert(hadInvalidChars);
  };

  const handleBlurEmail = () => {
    setEmail(sanitizeEmail(email).sanitized);
  };

  const handleSelectSchool = (school: string) => {
    setSelectedSchool(school);
  };

  useEffect(() => {
    if (isValidEmail(email) && selectedSchool) {
      setButtonColor(Colors.light.darkBlue);
    } else {
      setButtonColor(Colors.light.lightGray);
    }
  }, [email, selectedSchool]);

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
              <Heading size={"2xl"} style={styles.title}>¡Hola {name}!</Heading>
              <View style={styles.field_container}>
                <Heading style={styles.subtitle} size={"lg"}>Correo</Heading>
                <Input variant="underlined" size="md">
                  <InputField
                    placeholder='alguien@mail.com'
                    value={email}
                    onChangeText={handleChangeEmail}
                    onBlur={handleBlurEmail}
                  />
                </Input>
                {showEmailAlert && (
                  <Alert action="error" variant="solid" className="mt-4">
                    <AlertIcon as={Info} />
                    <AlertText>El correo debe ser una dirección de correo válida.</AlertText>
                  </Alert>
                )}
              </View>
              <View style={[styles.field_container, { marginTop: 10 }]}>
                <InputSelect
                  initialValue={"Selecciona una opción..."}
                  editable={false}
                  headingText="Escuela"
                  items={["Comunicación", "Diseño", "Derecho", "Ingeniería", "Medicina", "Negocios", "Psicología", "Turismo"]}
                  onEditComplete={handleSelectSchool}
                  onCancelEdit={() => setSelectedSchool("")}
                />
              </View>
            </Center>
          </ScrollView>
            <Center style={styles.buttonContainer}>
              <Button
                onPress={() => router.replace("/(tabs)/(home)")}
                style={[styles.nextButton, { backgroundColor: buttonColor }]}
                disabled={!isValidEmail(email) || !selectedSchool}
              >
                <ButtonText>Finalizar</ButtonText>
              </Button>
            </Center>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationForm;



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
  general_container: {
    padding: 30,
    width: '100%',
    height: 'auto',
  },
  field_container: {
    paddingHorizontal: 30,
    paddingBottom: 10,
    width: '100%',
    height: 'auto',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: -10,
    alignSelf: 'flex-end'
  },
  nextButton: {
    borderRadius: 30,
    width: '60%',
  },
});
