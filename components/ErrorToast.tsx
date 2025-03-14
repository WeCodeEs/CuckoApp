import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import {
  Icon,
  AlertCircleIcon,
  MessageCircleIcon,
  CheckCircleIcon,
  InfoIcon,
} from '@/components/ui/icon';

interface ErrorToastProps {
  id: string | number;
  message: string;
  onClose: () => void;
  variant?: 'error' | 'warning' | 'success' | 'info' | 'muted';
}

const ErrorToast: React.FC<ErrorToastProps> = ({
  id,
  message,
  onClose,
  variant = 'error',
}) => {
  const iconMapping = {
    error: AlertCircleIcon,
    warning: AlertCircleIcon,
    success: CheckCircleIcon,
    info: InfoIcon,
    muted: MessageCircleIcon,
  };

  const strokeMapping = {
    error: 'stroke-error-500',
    warning: 'stroke-warning-500',
    success: 'stroke-success-500',
    info: 'stroke-info-500',
    muted: 'stroke-muted-500',
  };

  const textColorMapping = {
    error: 'text-error-500',
    warning: 'text-warning-500',
    success: 'text-success-500',
    info: 'text-info-500',
    muted: 'text-muted-500',
  };

  const labelMapping = {
    error: 'Error',
    warning: 'Cuidado',
    success: 'Éxito',
    info: 'Atención',
    muted: 'Aviso',
  };

  const bgMapping = {
    error: 'bg-background-error',
    warning: 'bg-background-warning',
    success: 'bg-background-success',
    info: 'bg-background-info',
    muted: 'bg-background-muted',
  };

  const SelectedIcon = iconMapping[variant];

  return (
    <View style={styles.toastContainer}>
      <Toast
        action={variant}
        variant="outline"
        nativeID={`toast-${id}`}
        className={`p-4 gap-6 flex-row justify-between ${bgMapping[variant]}`}
      >
        <HStack space="md" style={styles.toastContent}>
          <Icon as={SelectedIcon} className={`${strokeMapping[variant]} mt-0.5`} />
          <VStack space="xs">
            <ToastTitle className={`font-bold ${textColorMapping[variant]}`}>
              {labelMapping[variant]}
            </ToastTitle>
            <ToastDescription size="sm" className={`${textColorMapping[variant]}`}>
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
    width: '95%',
  },
});

export default ErrorToast;
