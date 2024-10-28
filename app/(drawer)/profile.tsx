import React, { useState } from 'react';
import { View } from "@/components/ui/view";
import { Image } from "@/components/ui/image";
import { StyleSheet, ScrollView } from "react-native";
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

const ProfileScreen = () => {
    const user = {
      name_first: "Carlos",
      last_name_first: "González",
      mail: "carlos.gonzalezba@anahuac.mx",
      faculty: "Ingeniería",
      phone: "9511234567",
      lada: "52",
    }
    const [phone, setPhone] = useState(user.phone);
    const [lada, setLada] = useState(user.lada);
    const [mail, setMail] = useState(user.mail);
    const [selectedAvatar, setSelectedAvatar] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmikACdClGxHZI4nCLhMqQQ5R3_o5ylS4rsW40gMbxrbQ15MJv-lWe9b69q0H8VwNaGck&usqp=CAU");
    const [showModal, setShowModal] = useState(false);
    const handleEditComplete = (newLada: string, newPhone: string) => {
      setLada(newLada);
      setPhone(newPhone);
    };

  const handleCancelEdit = () => {
      console.log("Edición cancelada");
  };


    return (
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
                        items={["Comunicación", "Diseño", "Derecho", "Ingeniería", "Medicina", "Negocios", "Psicología", "Turismo", "Ninguna"]}
                        onEditComplete={(newValue) => console.log("Opción elegida:", newValue)}
                        onCancelEdit={() => console.log("Edición cancelada")}
                    />
                    <InputPhone
                        initialPhone={user.phone}
                        initialLada={user.lada}
                        editable={true}
                        onEditComplete={handleEditComplete}
                        onCancelEdit={handleCancelEdit}
                        headingText="Teléfono"
                    />
                </Box>
            </Center>
        </ScrollView>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    avatar_container: {
      bottom: '-45%',
    },
    image_container: {
      aspectRatio:'1/1', 
      borderWidth: 8, 
      borderRadius: 100, 
      borderColor: '#FFF'
    },
    header_container: {
        zIndex: 1,
        width: '100%',
        height: 195,
        backgroundColor: '#139FAA',
    },
    general_container: {
        backgroundColor: '#139FAA',
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
        borderColor: '#d1d5db',
        backgroundColor: '#fff',
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
        color: "#000",
    },
    avatar_image: {
        borderRadius: 100,
    },
    change_av: { 
      position: 'absolute',
      bottom: 10,
      right: 5,
      backgroundColor: '#363837',
      padding: 8,
      borderRadius: 100,
      borderColor: '#FFF',
      borderWidth: 4,
      zIndex: 99,
    },
});
