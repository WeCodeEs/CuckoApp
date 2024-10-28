import React from 'react';
import { Image } from "@/components/ui/image";
import { StyleSheet, ScrollView } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from '@/components/ui/icon';
import { X } from "lucide-react-native";
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@/components/ui/modal';
import { avatars } from '@/constants/Avatars';

interface ModalAvatarProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onAvatarSelect: (src: string) => void;
}

const ModalAvatar: React.FC<ModalAvatarProps> = ({ showModal, setShowModal, onAvatarSelect }) => {
    return (
        <Modal
            style={styles.modal}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            size="md"
        >
        <ModalBackdrop style={styles.modalBackdrop} />
        <ModalContent>
            <ModalHeader>
                <Heading size="lg" className="text-typography-950">
                    Elige un Avatar
                </Heading>
                <ModalCloseButton onPress={() => setShowModal(false)}>
                    <Icon
                        as={X}
                        size="xl"
                        className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                    />
                </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
                <ScrollView contentContainerStyle={styles.grid}>
                    {avatars.map(avatar => (
                        <Pressable 
                          key={avatar.id} 
                          style={styles.vStackItem} 
                          onPress={() => {
                            onAvatarSelect(avatar.src);
                            setShowModal(false);
                          }}
                        >
                            <Image size="xl" source={avatar.src} alt={avatar.alt} style={styles.avatar_image} className="rounded-full" />
                        </Pressable>
                    ))}
                </ScrollView>
            </ModalBody>
        </ModalContent>
        </Modal>
    );
}

export default ModalAvatar;

const styles = StyleSheet.create({
    avatar_image: {
        borderRadius: 100,
    },
    vStackItem: {
        alignItems: 'center',
        width: '50%',
        paddingVertical: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    modal: {
        paddingTop: 150, 
        maxHeight: '80%',
    },
    modalBackdrop: {
        height: 4000,
    }
});
