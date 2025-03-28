import React, { useState, useEffect } from 'react';
import { View } from "@/components/ui/view";
import { Image } from "@/components/ui/image";
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from '@/components/ui/icon';
import { Pencil } from "lucide-react-native";
import ModalAvatar from '@/components/ModalAvatar';
import InputInfo from '@/components/InputInfo';
import InputSelect from '@/components/InputSelect';
import InputPhone from '@/components/InputPhone';
import { Colors } from '@/constants/Colors';
import { isValidPhoneNumber, sanitizePhoneNumber, sanitizeLada } from '@/constants/validations';
import { useUser } from '@/contexts/UserContext';
import { fetchFacultiesFromDB } from "@/constants/api";
import { Faculty } from '@/constants/types';


const ProfileScreen = () => {
  const { user, setAvatar, setEmail, setPhone, setFacultyId } = useUser();

  const defaultAvatar = require("@/assets/images/avatars/avatar-icon-1.png");

  const getAvatarSource = () => {
    if (!user?.avatar) {
      return defaultAvatar;
    }
    return typeof user.avatar === "number" ? user.avatar : { uri: user.avatar };
  };

  const fullPhone = user?.phone || "";
  const initialLada =
    fullPhone && fullPhone.startsWith("+")
      ? fullPhone.substring(1).split(" ")[0]
      : fullPhone.split(" ")[0] || "52";
  const initialPhone =
    fullPhone && fullPhone.startsWith("+")
      ? fullPhone.substring(1).split(" ")[1]
      : fullPhone.split(" ")[1] || "";

  const [ladaLocal, setLadaLocal] = useState<string>(initialLada);
  const [phoneLocal, setPhoneLocal] = useState<string>(initialPhone);
  const [showModal, setShowModal] = useState(false);
  const [faculties, setFaculties] = useState<Faculty[]>([]);

  useEffect(() => {
    (async () => {
      const result = await fetchFacultiesFromDB();
      setFaculties(result);
    })();
  }, []);

  const handleLadaChange = (newLada: string) => {
    setLadaLocal(sanitizeLada(newLada));
  };

  const handlePhoneChange = (newPhone: string) => {
    setPhoneLocal(sanitizePhoneNumber(newPhone));
  };

  const handlePhoneSave = (newPhone: string) => {
    if (isValidPhoneNumber(newPhone)) {
      // TODO: Implementar cambio de número celular en DB y Auth
      // setPhone(`+${ladaLocal} ${newPhone}`);
    }
  };

  const handlePhoneCancel = () => {
    const fullPhone = user?.phone || "";
    const parts =
      fullPhone && fullPhone.startsWith("+")
        ? fullPhone.substring(1).split(" ")
        : fullPhone.split(" ");
    setLadaLocal(parts[0] || "52");
    setPhoneLocal(parts[1] || "");
  };

  const facultyIdOptions = faculties.map((f) => ({
    label: f.name,
    value: f.id,
  }));

  const currentFacultyIdLabel = facultyIdOptions.find(
    (option) => option.value === user?.facultyId
  )?.label || "Selecciona una opción...";

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Center style={styles.header_container}>
          <Pressable onPress={() => setShowModal(true)} style={styles.avatar_container}>
            <View style={styles.image_container}>
              <Image
                className="rounded-full"
                style={styles.avatar_image}
                size="1.5xl"
                source={getAvatarSource()}
                alt={"Avatar"}
              />
            </View>
            <View style={styles.change_av}>
              <Icon as={Pencil} size="xl" className="text-white" />
            </View>
          </Pressable>
        </Center>
        <Center style={styles.general_container}>
          <Box style={styles.content_box}>
            <Heading style={styles.title} size={"2xl"}>
              {`${user?.name || ''} ${user?.lastName || ''}`}
            </Heading>
            <ModalAvatar 
              showModal={showModal} 
              setShowModal={setShowModal} 
              onAvatarSelect={(src) => setAvatar(src)}
            />
            <InputInfo 
              initialValue={user?.email || ""}
              editable={true}
              isEmail={true}
              headingText={"Correo"}
              onEditComplete={(email) => setEmail(email)}
              onCancelEdit={() => {}}
            />
            <InputSelect 
              initialValue={currentFacultyIdLabel}
              editable={true}
              headingText="Escuela"
              items={facultyIdOptions.map(option => option.label)}
              onEditComplete={(selectedLabel: string) => {
                const selectedOption = facultyIdOptions.find(option => option.label === selectedLabel);
                if (selectedOption) {
                  setFacultyId(selectedOption.value);
                }
              }}
              onCancelEdit={() => {}}
            />
            <InputPhone
              lada={ladaLocal}
              phone={phoneLocal}
              onLadaChange={handleLadaChange}
              onPhoneChange={handlePhoneChange}
              onSave={handlePhoneSave}
              onCancel={handlePhoneCancel}
              editable={true}
              headingText="Teléfono"
            />
          </Box>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20, 
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
  },
  avatar_container: {
    bottom: '-45%',
  },
  image_container: {
    aspectRatio: '1/1',
    borderWidth: 8,
    borderRadius: 100,
    borderColor: Colors.light.background,
  },
  header_container: {
    zIndex: 1,
    width: '100%',
    height: 195,
    backgroundColor: Colors.light.mediumBlue,
  },
  general_container: {
    backgroundColor: Colors.light.mediumBlue,
    width: '100%',
    height: 'auto',
  },
  content_box: {
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.light.borderBox,
    backgroundColor: Colors.light.background,
    height: 'auto',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
  },
  title: {
    paddingTop: 76,
    paddingBottom: 5,
    paddingHorizontal: 50,
    textAlign: 'center',
  },
  avatar_image: {
    borderRadius: 100,
  },
  change_av: { 
    position: 'absolute',
    bottom: 10,
    right: 5,
    backgroundColor: Colors.light.darkBlue,
    padding: 8,
    borderRadius: 100,
    borderColor: Colors.light.background,
    borderWidth: 4,
    zIndex: 99,
  },
});
