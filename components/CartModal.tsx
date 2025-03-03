import React from 'react';
import { Text } from "@/components/ui/text";
import { Modal, ModalBackdrop, ModalContent, ModalBody, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Box } from '@/components/ui/box';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { ShoppingCartIcon } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { CartItem } from '@/constants/types';

interface CartModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  onConfirmEmpty: () => void;
  cartItem: CartItem | null;
  isEmptyCartModal: boolean;
}

const CartModal: React.FC<CartModalProps> = ({ isVisible, onClose, onConfirmDelete, onConfirmEmpty, cartItem, isEmptyCartModal }) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent style={{ borderRadius: 30 }} className="max-w-[305px] items-center">
        <ModalHeader>
          <Box
            style={{ backgroundColor: Colors.light.lightBlue }}
            className="w-[56px] h-[56px] rounded-full items-center justify-center"
          >
            <Icon as={ShoppingCartIcon} stroke={Colors.light.darkBlue} size="xl" />
          </Box>
        </ModalHeader>
        <ModalBody className="mt-0 mb-4">
          <Heading
            size="md"
            style={{ fontWeight: 'normal', paddingTop: 10 }}
            className="text-typography-950 mb-2 text-center"
          >
            { isEmptyCartModal ? "Vaciar el carrito" : "Eliminar del carrito" }
          </Heading>
          <Text size="sm" className="text-typography-500 text-center">
            { isEmptyCartModal ? 
              "¿Deseas vaciar el carrito?" : 
              `¿Deseas eliminar \"${cartItem?.product?.name || "este producto"}\" del carrito?` }
            
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
            onPress={
              isEmptyCartModal?
              onConfirmEmpty : 
              onConfirmDelete
            }
            size="sm"
            className="flex-grow"
            style={{ borderRadius: 30, backgroundColor: Colors.light.darkBlue }}
          >
            <Text style={{ color: Colors.light.background }}>
              {
                isEmptyCartModal?
                "Vaciar":
                "Eliminar"
              }
            </Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CartModal;
