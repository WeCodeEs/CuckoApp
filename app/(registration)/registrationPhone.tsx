import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { View } from "@/components/ui/view";
import { Image } from "@/components/ui/image";
import { Text } from '@/components/ui/text';
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
import { Colors } from '@/constants/Colors';

const RegistrationPhone = () => {
    const user = {
      name_first: "Juan",
      last_name_first: "Pérez",
      last_name_second: "López",
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
    const handleEditComplete = (newLada: string, newPhone: string) => {
      setLada(newLada);
      setPhone(newPhone);
    };

  const handleCancelEdit = () => {
      console.log("Edición cancelada");
  };


    return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
            <Center style={styles.header_container}>
              <View style={styles.image_container}>
                <Image style={styles.cuckoo_image} size='2xl' source={require("@/assets/images/CuckoLogoTop.png")} alt={"CuckooEats"} resizeMode='contain'/>
              </View>
              <Heading size='2xl'>Bienvenido</Heading>
              <Text>Para continuar, ingresa</Text>
              <Text>un número de celular</Text>
            </Center>
            <Center style={styles.general_container}>
              <InputPhone
                        initialPhone={user.phone}
                        initialLada={user.lada}
                        editable={false}
                        onEditComplete={handleEditComplete}
                        onCancelEdit={handleCancelEdit}
                        headingText="Teléfono"
              />

            </Center>
        </ScrollView>
    </SafeAreaView>
    );
}

export default RegistrationPhone;

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        backgroundColor: Colors.light.background,
        paddingBottom: 5000,
    },
    avatar_container: {
      bottom: '-45%',
    },
    image_container: {
      // borderWidth: 2,
      width: '100%',
      alignItems: 'center',
      // paddingTop: 100,
      // aspectRatio:'1/1', 
    },
    header_container: {
        zIndex: 1,
        width: '100%',
        // borderWidth: 2,
        // alignContent: 'center',
        // alignItems: 'center',
        // height: 195,
        // backgroundColor: Colors.light.mediumBlue,
      },
      general_container: {
        // backgroundColor: Colors.light.mediumBlue,
        padding: 30,
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
        // borderWidth: 1,
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
    cuckoo_image: {
        // borderRadius: 100,
        resizeMode: 'stretch',
        // borderWidth: 2,
        width: '50%',
        height: '100%',
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
