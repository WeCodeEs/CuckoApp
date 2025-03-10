import React, { useRef, useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet';
import { Center } from './ui/center';
import { Heading } from './ui/heading';
import { Text } from './ui/text';
import { HStack } from './ui/hstack';
import { Button, ButtonText } from './ui/button';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { checkPhoneNumberRegistration } from '@/constants/api';
import { sanitizeOTP, isAllDigitsEqual } from '@/constants/validations';
import { useToast } from '@/components/ui/toast';
import ErrorToast from '@/components/ErrorToast';
import { TextInput as RNTextInput } from 'react-native';

interface RegistrationActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  lada: string;
  phone: string;
}

const RegistrationActionSheet: React.FC<RegistrationActionSheetProps> = ({ isOpen, onClose, lada, phone }) => {
  const [buttonColor, setButtonColor] = useState(Colors.light.darkBlue);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = [
    useRef<RNTextInput>(null),
    useRef<RNTextInput>(null),
    useRef<RNTextInput>(null),
    useRef<RNTextInput>(null),
  ];
  const [code, setCode] = useState(['', '', '', '']);
  const navigation = useNavigation();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      const focusTimeout = setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 100);
      return () => clearTimeout(focusTimeout);
    }
  }, [isOpen]);

  const handleChange = (text: string, index: number) => {
    const sanitized = sanitizeOTP(text);
    const newCode = [...code];
    newCode[index] = sanitized;
    setCode(newCode);

    if (sanitized.length === 1) {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      } else {
        inputRefs[index].current?.blur();
      }
    }

    if (sanitized.length > 1) {
      const digits = sanitized.split('').slice(0, 4);
      const updatedCode = [...code];
      digits.forEach((digit, idx) => {
        updatedCode[idx] = digit;
        inputRefs[idx].current?.setNativeProps({ text: digit });
      });
      setCode(updatedCode);
      if (digits.length === 4) {
        inputRefs[3].current?.blur();
      } else {
        inputRefs[digits.length]?.current?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '') {
      if (index > 0) {
        inputRefs[index - 1].current?.focus();
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      }
    }
  };

  const handlePressIn = () => {
    setButtonColor(Colors.light.mediumBlue);
  };

  const handlePressOut = () => {
    setButtonColor(Colors.light.darkBlue);
  };

  const checkUserRegistration = async (): Promise<boolean> => {
    try {
      const isPhoneNumberRegistered = await checkPhoneNumberRegistration(phone);
      return isPhoneNumberRegistered;
    } catch (err) {
      return false;
    }
  };

  const handleNavigation = async () => {
    const fullCode = code.join('');
    if (fullCode.length === 4) {
      if (!isAllDigitsEqual(fullCode)) {
        toast.show({
          id: "otp-invalid",
          placement: 'top',
          duration: 5000,
          render: ({ id }) => (
            <ErrorToast
              id={id}
              message="Código de verificación inválido. Intenta de nuevo o genera un nuevo código de verificación"
              onClose={() => toast.close(id)}
            />
          ),
        });
        setCode(['', '', '', '']);
        inputRefs.forEach(ref => ref.current?.clear());
        inputRefs[0].current?.focus();
      } else if (fullCode === "0000") {
        toast.show({
          id: "otp-connection-error",
          placement: 'top',
          duration: 5000,
          render: ({ id }) => (
            <ErrorToast
              id={id}
              message="Ha habido un error en la verificación del código."
              onClose={() => toast.close(id)}
            />
          ),
        });
        setCode(['', '', '', '']);
        inputRefs.forEach(ref => ref.current?.clear());
        inputRefs[0].current?.focus();
      } else {
        setCode(['', '', '', '']);
        inputRefs.forEach(ref => ref.current?.clear());
        try {
          const isUserRegistered = await checkUserRegistration();
          if (isUserRegistered) {
            router.replace("/(tabs)/(home)");
          } else {
            router.push('/(registration)/registrationName');
          }
          setTimeout(() => {
            onClose();
          }, 300);
        } catch (err) {
          console.error("Error al verificar el teléfono:", err);
        }
      }
    } else {
      toast.show({
        id: "otp-incomplete",
        placement: 'top',
        duration: 5000,
        render: ({ id }) => (
          <ErrorToast
            id={id}
            message="Ingresa un código de 4 dígitos."
            onClose={() => toast.close(id)}
          />
        ),
      });
      setCode(['', '', '', '']);
      inputRefs.forEach(ref => ref.current?.clear());
      inputRefs[0].current?.focus();
    }
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={Platform.OS === 'ios' ? [35] : [55]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -30 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Center style={styles.centerContent}>
            <Heading style={styles.title} size='xl'>Código de verificación</Heading>
            <Text style={styles.text}>
              Se ha enviado un código de verificación a{"\n"}+{lada} {phone}
            </Text>
            <HStack style={styles.hStack}>
              {inputRefs.map((inputRef, index) => (
                <TextInput
                  key={index}
                  ref={inputRef}
                  style={[
                    styles.otpInput,
                    { backgroundColor: Colors.light.background },
                    focusedIndex === index && { borderColor: Colors.light.mediumBlue }
                  ]}
                  maxLength={1}
                  keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'phone-pad'}
                  autoComplete={index === 0 ? 'one-time-code' : 'off'}
                  value={code[index]}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </HStack>
            <Button
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleNavigation}
              style={[styles.nextButton, { backgroundColor: buttonColor }]}
            >
              <ButtonText>Siguiente</ButtonText>
            </Button>
          </Center>
        </ActionsheetContent>
      </KeyboardAvoidingView>
    </Actionsheet>
  );
};

export default RegistrationActionSheet;

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    paddingBottom: 10,
    textAlign: 'center',
  },
  keyboardAvoidingView: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end',
  },
  centerContent: {
    paddingBottom: 20,
  },
  hStack: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: Colors.light.borderBox,
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 5,
  },
  nextButton: {
    borderRadius: 30,
    marginHorizontal: 30,
    marginTop: 20,
  },
});
