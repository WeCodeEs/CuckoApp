import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  View,
} from "react-native";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Colors } from "@/constants/Colors";
import { Button, ButtonText } from "@/components/ui/button";
import CuckooIsotipo from "@/assets/images/vectors/CuckooIsotipo";
import InputSelect from "@/components/InputSelect";
import { useRouter } from "expo-router";
import InputInfo from "@/components/InputInfo";
import { isValidEmail } from "@/constants/validations";
import { useToast } from "@/components/ui/toast";
import ErrorToast from "@/components/ErrorToast";
import { useUser } from '@/contexts/UserContext';
import { fetchFacultiesFromDB } from "@/constants/api";
import { Faculty } from '@/constants/types';



const RegistrationForm = () => {
  const router = useRouter();
  const { user, setEmail, updateUser, setName, setLastName } = useUser();

  const [buttonColor, setButtonColor] = useState(Colors.light.lightGray);
  const [email, setEmailLocal] = useState("");
  const [selectedFacultyId, setSelectedFacultyId] = useState(0);
  const toast = useToast();
  const [faculties, setFaculties] = useState<Faculty[]>([]);

  useEffect(() => {
    async function loadFaculties() {
      try {
        const result = await fetchFacultiesFromDB();
        setFaculties(result);
      } catch (error) {
        toast.show({
          id: "fetch-faculties-error",
          placement: "top",
          duration: 5000,
          render: ({ id }) => (
            <ErrorToast
              id={id}
              message="Ha habido un error cargando las facultades."
              onClose={() => toast.close(id)}
            />
          ),
        });
      }
    }
    loadFaculties();
  }, []);
  
  
  const facultyIdOptions = faculties.map(f => ({
    label: f.name,
    value: f.id,
  }));
  const userFacultyIdValue = user?.facultyId ?? 0;
  const foundOption = facultyIdOptions.find((opt) => opt.value === userFacultyIdValue);
  const initialLabel = foundOption ? foundOption.label : "Selecciona una opción...";

  useEffect(() => {
    if (isValidEmail(email) && selectedFacultyId) {
      setButtonColor(Colors.light.darkBlue);
    } else {
      setButtonColor(Colors.light.lightGray);
    }
  }, [email, selectedFacultyId]);

  const displayItems = facultyIdOptions.map(option => option.label);

  const handleSelect = (selectedLabel: string) => {
    const selectedOption = facultyIdOptions.find(option => option.label === selectedLabel);
    if (selectedOption) {
      setSelectedFacultyId(selectedOption.value);
    }
  };

  const handleNavigation = async () => {
    if (!isValidEmail(email)) return;
    try {
      await updateUser({
        email,
        facultyId: selectedFacultyId,
        name: user?.name,
        lastName: user?.lastName,
      });
      router.push({ pathname: "/(tabs)/(home)" });
    } catch (error) {
      toast.show({
        id: "registration-error",
        placement: "top",
        duration: 5000,
        render: ({ id }) => (
          <ErrorToast
            id={id}
            message="Ha habido un error registrando al usuario."
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  };  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
        >
          <ScrollView>
            <Center style={styles.header_container}>
              <View style={styles.image_container}>
                <CuckooIsotipo style={styles.logo} />
              </View>
              <Heading size={"2xl"} style={styles.title}>
                ¡Hola {user?.name || "Invitado"}!
              </Heading>
              <Text style={styles.text}>Ya estamos en la recta final :)</Text>
              <View style={styles.field_container}>
                <InputInfo
                  initialValue={email}
                  editable={true}
                  alwaysEditable={true}
                  isEmail={true}
                  headingText="Correo"
                  placeholder="nombre@mail.com"
                  onEditComplete={(newValue) => setEmailLocal(newValue)}
                  onTextChange={(newValue) => setEmailLocal(newValue)}
                  onCancelEdit={() => {}}
                />
              </View>
              <View style={[styles.field_container, { marginTop: 10 }]}>
                <InputSelect
                  initialValue={initialLabel}
                  editable={false}
                  headingText="Escuela"
                  items={displayItems}
                  onEditComplete={handleSelect}
                  onCancelEdit={() => setSelectedFacultyId(0)}
                />
              </View>
            </Center>
          </ScrollView>
          <Center style={styles.buttonContainer}>
            <Button
              onPress={handleNavigation}
              style={[styles.nextButton, { backgroundColor: buttonColor }]}
              disabled={!isValidEmail(email) || !selectedFacultyId}
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
    height: "100%",
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  header_container: {
    width: "100%",
  },
  image_container: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    position: "relative",
    width: "60%",
    aspectRatio: 1,
  },
  title: {
    marginBottom: 10,
  },
  text: {
    marginHorizontal: 20,
    textAlign: "center",
    marginBottom: 30,
  },
  field_container: {
    paddingHorizontal: 30,
    paddingBottom: 10,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: -15,
    alignSelf: "flex-end",
  },
  nextButton: {
    borderRadius: 30,
    width: "60%",
  },
});
