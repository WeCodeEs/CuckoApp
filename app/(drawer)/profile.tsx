import React, { useState } from 'react';
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

const ProfileScreen = () => {
    const user = {
      name_first: "Juan",
      last_name_first: "Pérez",
      mail: "juan@gmail.com",
      faculty: "Ingeniería",
      phone: "9511234567",
      lada: "52",
    }
    const [phone, setPhone] = useState(user.phone);
    const [lada, setLada] = useState(user.lada);
    const [mail, setMail] = useState(user.mail);
    const [selectedAvatar, setSelectedAvatar] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmikACdClGxHZI4nCLhMqQQ5R3_o5ylS4rsW40gMbxrbQ15MJv-lWe9b69q0H8VwNaGck&usqp=CAU");
    const [showModal, setShowModal] = useState(false);

    const handleLadaChange = (newLada: string) => setLada(newLada);
    const handlePhoneChange = (newPhone: string) => setPhone(newPhone);

    return (
      <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Center style={styles.header_container}>
                <Pressable onPress={() => setShowModal(true)} style={styles.avatar_container}>
                  <View style={styles.image_container}>
                    <Image className="rounded-full" style={styles.avatar_image} size="1.5xl" source={selectedAvatar} alt={"Avatar"}/>
                  </View>
                  <View style={styles.change_av}>
                    <Icon as={Pencil} size="xl" className="text-typography-600 text-white"/>
                  </View>
                </Pressable>
            </Center>
            <Center style={styles.general_container}>
                <Box style={styles.content_box}>
                    <Heading style={styles.title} size={"2xl"}>{user.name_first + " " + user.last_name_first}</Heading>
                    <ModalAvatar 
                      showModal={showModal} 
                      setShowModal={setShowModal} 
                      onAvatarSelect={(src) => setSelectedAvatar(src)}
                    />
                    <InputInfo 
                      initialValue={mail}
                      editable={true}
                      isEmail={true}
                      headingText={"Correo"}
                      onEditComplete={(newValue) => setMail(newValue)}
                      onCancelEdit={() => {}}
                    />
                    <InputSelect 
                        initialValue={user.faculty}
                        editable={true}
                        headingText="Escuela"
                        items={["Comunicación", "Diseño", "Derecho", "Ingeniería", "Medicina", "Negocios", "Psicología", "Turismo"]}
                        onEditComplete={(newValue) => console.log("Opción elegida:", newValue)}
                        onCancelEdit={() => console.log("Edición cancelada")}
                    />
                    <InputPhone
                        lada={user.lada}
                        phone={user.phone}
                        onLadaChange={handleLadaChange}
                        onPhoneChange={handlePhoneChange}
                        editable={true}
                        headingText="Teléfono"
                    />
                </Box>
            </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    );
}

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
      aspectRatio:'1/1', 
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
    section_container: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingBottom: 25,
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
    subtitle: {
        paddingTop: 30,
        paddingBottom: 15,
        color: Colors.light.text,
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
