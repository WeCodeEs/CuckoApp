import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView, View } from 'react-native';
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Colors } from '@/constants/Colors';
import { Button, ButtonText } from '@/components/ui/button';
import CuckooIsotipo from '@/assets/images/vectors/CuckooIsotipo';
import InputSelect from '@/components/InputSelect';
import { useRouter, useLocalSearchParams } from "expo-router";
import InputInfo from '@/components/InputInfo';
import { isValidEmail } from '@/constants/validations';
import { useUser } from '@/contexts/UserContext';

const RegistrationForm = () => {
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const [buttonColor, setButtonColor] = useState(Colors.light.lightGray);
  const [email, setEmail] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const { updateUser } = useUser();

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
              <Text style={styles.text}>Ya estamos en la recta final :)</Text>
              <View style={styles.field_container}>
                <InputInfo
                  initialValue={email}
                  editable={true}
                  alwaysEditable={true}
                  isEmail={true}
                  headingText="Correo"
                  placeholder="nombre@mail.com"
                  onEditComplete={(newValue) => setEmail(newValue)}
                  onCancelEdit={() => {}}
                />
              </View>
              <View style={[styles.field_container, { marginTop: 10 }]}>
                <InputSelect
                  initialValue={"Selecciona una opción..."}
                  editable={false}
                  headingText="Escuela"
                  items={["Comunicación", "Diseño", "Derecho", "Ingeniería", "Medicina", "Negocios", "Psicología", "Turismo"]}
                  onEditComplete={setSelectedSchool}
                  onCancelEdit={() => setSelectedSchool("")}
                />
              </View>
            </Center>
          </ScrollView>
          <Center style={styles.buttonContainer}>
            <Button
              onPress={() => {
                if (isValidEmail(email)) {
                  updateUser({ email, school: selectedSchool });
                  router.replace("/(tabs)/(home)");
                }
              }}
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
    aspectRatio: 1,
  },
  title: {
    marginBottom: 10,
  },
  text: {
    marginHorizontal: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  field_container: {
    paddingHorizontal: 30,
    paddingBottom: 10,
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
