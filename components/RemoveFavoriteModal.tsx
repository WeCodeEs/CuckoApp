import React from 'react';
import { Text } from "@/components/ui/text";
import { Modal, ModalBackdrop, ModalContent, ModalBody, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Box } from '@/components/ui/box';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { TrashIcon } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface FavoriteModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const FavoriteModal: React.FC<FavoriteModalProps> = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent style={{ borderRadius: 30 }} className="max-w-[305px] items-center">
        <ModalHeader>
          <Box
            style={{ backgroundColor: Colors.light.lightBlue }}
            className="w-[56px] h-[56px] rounded-full items-center justify-center"
          >
            <Icon as={TrashIcon} stroke={Colors.light.darkBlue} size="xl" />
          </Box>
        </ModalHeader>
        <ModalBody className="mt-0 mb-4">
          <Heading
            size="md"
            style={{ fontWeight: 'normal', paddingTop: 10 }}
            className="text-typography-950 mb-2 text-center"
          >
            Eliminar de favoritos
          </Heading>
          <Text size="sm" className="text-typography-500 text-center">
            ¿Deseas eliminar este producto de tus favoritos?
          </Text>
        </ModalBody>
        <ModalFooter className="w-full flex-row space-x-2">
          <Button
            variant="outline"
            action="secondary"
            size="sm"
            onPress={onClose}
            className="flex-grow"
            style={{ borderRadius: 30 }}
          >
            <Text>Cancelar</Text>
          </Button>
          <Button
            onPress={onConfirm}
            size="sm"
            className="flex-grow"
            style={{ borderRadius: 30, backgroundColor: Colors.light.darkBlue }}
          >
            <Text style={{ color: Colors.light.background }}>Eliminar</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FavoriteModal;
