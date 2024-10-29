import React, { useState } from 'react';
import { Image } from "@/components/ui/image";
import { StyleSheet, ScrollView, Animated } from "react-native";
import { Pressable } from "@/components/ui/pressable";
import { Modal, ModalBackdrop, ModalContent, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { avatars } from '@/constants/Avatars';
import { Colors } from '@/constants/Colors';

interface ModalAvatarProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onAvatarSelect: (src: string) => void;
}

const ModalAvatar: React.FC<ModalAvatarProps> = ({ showModal, setShowModal, onAvatarSelect }) => {
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

    const handleSave = () => {
      if (selectedAvatar) {
        onAvatarSelect(selectedAvatar);
        setShowModal(false);
      }
    };

    return (
        <Modal
            className='rounded-full'
            style={styles.modal}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            size="md"
        >
        <ModalBackdrop style={styles.modalBackdrop} />
        <ModalContent style={styles.modalContent}>
            <ModalBody style={styles.modalBody}>
                <ScrollView contentContainerStyle={styles.grid}>
                    {avatars.map(avatar => (
                        <Pressable 
                          key={avatar.id} 
                          style={[styles.Item]}
                          onPress={() => {
                            setSelectedAvatar(avatar.src);
                          }}
                        >
                            <Animated.View style={[
                              avatar.src === selectedAvatar 
                              ? styles.selectedAvatarContainer 
                              : styles.avatarContainer
                            ]}>
                                <Image size="lg" source={avatar.src} alt={avatar.alt} style={styles.avatar_image} className="rounded-full" />
                            </Animated.View>
                        </Pressable>
                    ))}
                </ScrollView>
            </ModalBody>
            <ModalFooter style={styles.modalFooter}>
            <Button
              style={styles.cancelButton}
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              style={styles.saveButton}
              onPress={handleSave}
            >
              <ButtonText>Guardar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    );
}

export default ModalAvatar;

const styles = StyleSheet.create({
    avatar_image: {
        borderRadius: 100,
        width: 80,
        height: 80,
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        opacity: 0.5,
    },
    selectedAvatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        opacity: 1,
    },
    Item: {
        alignItems: 'center',
        width: '30%',
        paddingVertical: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 2,
    },
    modal: {
        paddingTop: 300, 
        height: '85%',
        shadowColor: Colors.light.text,
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    modalBody: {
        height: '95%',
    },
    modalContent: {
        borderRadius: 30,
        elevation: 15,
    },
    modalFooter: {
        justifyContent: 'center',
    },
    cancelButton: {
        borderRadius: 30,
    },
    saveButton: {
        borderRadius: 30,
        backgroundColor: Colors.light.darkBlue,
    },
    modalBackdrop: {
        height: 4000,
    }
});
