import React, { useRef, useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, Dimensions } from 'react-native';
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
import { fetchUserIfRegistered } from '@/constants/api';
import { sanitizeOTP } from '@/constants/validations';
import { useToast } from '@/components/ui/toast';
import ErrorToast from '@/components/ErrorToast';
import { TextInput as RNTextInput } from 'react-native';
import { verifyOtp } from "@/constants/api";
import { User } from "@/constants/types";
import { Session } from '@supabase/supabase-js';

const { width } = Dimensions.get('window');

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
    useRef<RNTextInput>(null),
    useRef<RNTextInput>(null),
  ];
  const [code, setCode] = useState(['', '', '', '', '', '']);
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

  const checkUserRegistration = async (currentSession: Session): Promise<User | Boolean> => {
    try {
      const currentUserString = await fetchUserIfRegistered(currentSession.access_token);
      const currentUser = JSON.parse(currentUserString);

      const isUserRegistered =
      currentUser.email !== "" && currentUser.email !== null &&
      currentUser.faculty_id !== 0 && currentUser.faculty_id !== null &&
      currentUser.first_name !== "" && currentUser.first_name !== null &&
      currentUser.last_name !== "" && currentUser.last_name !== null &&
      currentUser.phone !== "" && currentUser.phone !== null &&
      currentUser.uuid !== "" && currentUser.uuid !== null;

      
    return isUserRegistered
    ? {
        id: currentUser.uuid, 
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        email: currentUser.email,
        phone: currentUser.phone,
        facultyId: currentUser.faculty_id, 
      }
    : false;

    } catch (err) {
      console.error("Error checking user registration:", err);
      return false;
    }
  };

  const handleNavigation = async () => {
    const fullCode = code.join('');
  
    if (fullCode.length === 6) {
      const otpSession = await verifyOtp(lada+phone, fullCode);

      if (otpSession == null) {
        toast.show({
          id: "otp-invalid",
          placement: 'top',
          duration: 5000,
          render: ({ id }) => (
            <ErrorToast
              id={id}
              message="El código ingresado ha expirado o es inválido. Intenta de nuevo o genera un nuevo código de verificación"
              onClose={() => toast.close(id)}
            />
          ),
        });
        setCode(['', '', '', '', '', '']);
        inputRefs.forEach(ref => ref.current?.clear());
        inputRefs[0].current?.focus();
      } else {
        setCode(['', '', '', '', '', '']);
        inputRefs.forEach(ref => ref.current?.clear());
        try {
          const isUserRegistered = await checkUserRegistration(otpSession);
          console.log("otpSession: ", otpSession);
          console.log("isUserRegistered: ", isUserRegistered);
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
            message="Ingresa un código de 6 dígitos."
            onClose={() => toast.close(id)}
          />
        ),
      });
      setCode(['', '', '', '', '', '']);
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
    width: width * 0.13,
    height: width * 0.13,
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
