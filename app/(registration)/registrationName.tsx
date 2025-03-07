import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView, View } from 'react-native';
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Colors } from '@/constants/Colors';
import { Button, ButtonText } from '@/components/ui/button';
import CuckooIsotipo from '@/assets/images/vectors/CuckooIsotipo';
import { useRouter } from "expo-router";
import InputInfo from '@/components/InputInfo';
import { isValidName } from '@/constants/validations';

const RegistrationName = () => {
  const router = useRouter();
  const [buttonColor, setButtonColor] = useState(Colors.light.lightGray);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

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
              <Text style={styles.text}>Ahora, dinos cómo te llamas...</Text>
              <View style={styles.field_container}>
                <InputInfo
                  initialValue={name}
                  editable={true}
                  alwaysEditable={true}
                  isEmail={false}
                  headingText="Nombre"
                  placeholder="Juan Alejandro"
                  onEditComplete={(newValue) => setName(newValue)}
                  onCancelEdit={() => {}}
                />
              </View>
              <View style={styles.field_container}>
                <InputInfo
                  initialValue={lastName}
                  editable={true}
                  alwaysEditable={true}
                  isEmail={false}
                  headingText="Apellidos"
                  placeholder="Pérez López"
                  onEditComplete={(newValue) => setLastName(newValue)}
                  onCancelEdit={() => {}}
                />
              </View>
            </Center>
          </ScrollView>
          <Center style={styles.buttonContainer}>
            <Button
              onPress={() => {
                if (isValidName(name) && isValidName(lastName)) {
                  router.push({ pathname: "/(registration)/registrationForm", params: { name, lastName } });
                }
              }}
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
    aspectRatio: 1,
  },
  title: {
    marginBottom: 10,
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
    marginBottom: -15,
    alignSelf: 'flex-end'
  },
  nextButton: {
    borderRadius: 30,
    width: '60%'
  },
});
