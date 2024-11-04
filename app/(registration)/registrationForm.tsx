import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { View } from "@/components/ui/view";
import { Text } from '@/components/ui/text';
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from '@/components/ui/input';
import { Colors } from '@/constants/Colors';
import { Button, ButtonText } from '@/components/ui/button';
import CuckooIsotipo from '@/assets/images/vectors/CuckooIsotipo';
import CuckooEatsVertical from '@/assets/images/vectors/CuckooEatsVertical';
import RegistrationActionSheet from '@/components/RegistrationActionSheet';
import InputSelect from '@/components/InputSelect';
import { useRouter } from "expo-router";



const RegistrationForm = () => {
  const router = useRouter();
  const [buttonColor, setButtonColor] = useState(Colors.light.darkBlue);
  const [showActionsheet, setShowActionsheet] = useState(false);


  const handlePressIn = () => {
    setButtonColor(Colors.light.mediumBlue);
  };

  const handlePressOut = () => {
    setButtonColor(Colors.light.darkBlue);
  };

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
          <ScrollView>
            <Center style={styles.header_container}>
              <View style={styles.image_container}>
                <CuckooEatsVertical style={styles.logo} />
              </View>
              {/* <Heading style={styles.title} size='2xl'>Registro</Heading> */}
              <Text style={styles.text}>Ingresa tu información.</Text>
              <View style={styles.field_container}>
                <Heading style={styles.subtitle} size={"lg"}>Nombre</Heading>
                <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                  <InputField
                    placeholder='Juan'
                  />
                </Input>
              </View>
              <View style={styles.field_container}>
                <Heading style={styles.subtitle} size={"lg"}>Apellido Paterno</Heading>
                <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                  <InputField
                    placeholder='Pérez'
                  />
                </Input>
              </View>
              <View style={styles.field_container}>
                <Heading style={styles.subtitle} size={"lg"}>Apellido Materno</Heading>
                <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                  <InputField
                    placeholder='López'
                  />
                </Input>
              </View>
              <View style={styles.field_container}>
                <Heading style={styles.subtitle} size={"lg"}>Correo</Heading>
                <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                  <InputField
                    placeholder='alguien@mail.com'
                  />
                </Input>
              </View>
              <View style={[styles.field_container, {marginTop: 10}]}>
                <InputSelect 
                          initialValue={"Selecciona una opción..."}
                          editable={false}
                          headingText="Escuela"
                          items={["Comunicación", "Diseño", "Derecho", "Ingeniería", "Medicina", "Negocios", "Psicología", "Turismo"]}
                          onEditComplete={(newValue) => console.log("Opción elegida:", newValue)}
                          onCancelEdit={() => console.log("Edición cancelada")}
                />
              </View>
            </Center>

          </ScrollView>

          <Button
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => router.replace("/(tabs)/(home)")}
            style={[styles.nextButton, { backgroundColor: buttonColor }]}
          >
            <ButtonText>Continuar</ButtonText>
          </Button>
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
  nextButton: {
    borderRadius: 30,
    marginHorizontal: 30,
  },
});
