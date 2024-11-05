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
import { useRouter } from "expo-router";



const RegistrationName = () => {
  const router = useRouter();
  const [buttonColor, setButtonColor] = useState(Colors.light.darkBlue);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");


  const handlePressIn = () => {
    setButtonColor(Colors.light.mediumBlue);
  };

  const handlePressOut = () => {
    setButtonColor(Colors.light.darkBlue);
  };

  const handleCancelEdit = () => {
    console.log("Edición cancelada");
  };

  const handleChangeName = (inputName: string) => {
    setName(inputName);
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
                <CuckooIsotipo style={styles.logo} />
              </View>
              <Heading style={styles.title} size='2xl'>¡Genial!</Heading>
              <Text style={styles.text}>Ahora, dinos como te llamas...</Text>
              <View style={styles.field_container}>
                <Heading style={styles.subtitle} size={"lg"}>Nombre</Heading>
                <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                  <InputField
                    placeholder='Juan'
                    onChangeText={(text) => handleChangeName(text)}
                  />
                </Input>
              </View>
              <View style={styles.field_container}>
                <Heading style={styles.subtitle} size={"lg"}>Apellidos</Heading>
                <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                  <InputField
                    placeholder='Pérez'
                  />
                </Input>
              </View>
            </Center>

          </ScrollView>

          <Button
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => router.push({pathname: "/(registration)/registrationForm", params: {name: name}})}
            style={[styles.nextButton, { backgroundColor: buttonColor }]}
          >
            <ButtonText>Continuar</ButtonText>
          </Button>
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
  general_container: {
    padding: 30,
    width: '100%',
    height: 'auto',
  },
  field_container: {
    paddingHorizontal: 30,
    paddingBottom: 10,
    marginBottom: 10,
    width: '100%',
    height: 'auto',
  },
  nextButton: {
    borderRadius: 30,
    marginHorizontal: 30,
  },
});
