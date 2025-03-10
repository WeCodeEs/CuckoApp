import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Icon, AlertCircleIcon } from '@/components/ui/icon';

interface ErrorToastProps {
  id: string | number;
  message: string;
  onClose: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ id, message, onClose }) => {
  return (
    <View style={styles.toastContainer}>
      <Toast
        action="error"
        variant="outline"
        nativeID={`toast-${id}`}
        className="p-4 gap-6 border-error-500 flex-row justify-between"
      >
        <HStack space="md" style={styles.toastContent}>
          <Icon as={AlertCircleIcon} className="stroke-error-500 mt-0.5" />
          <VStack space="xs">
            <ToastTitle className="font-semibold text-error-500">¡Error!</ToastTitle>
            <ToastDescription size="sm">
              {message}
            </ToastDescription>
          </VStack>
        </HStack>
      </Toast>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  toastContent: {
    width: '95%'
  },
});

export default ErrorToast;
