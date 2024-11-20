import React, { useRef, useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput } from 'react-native';
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
import { isPhoneNumberRegistered } from '@/constants/api';

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
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];
  const [code, setCode] = useState(['', '', '', '']);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const focusTimeout = setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 100);

      return () => clearTimeout(focusTimeout);
    }
  }, [isOpen]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1) {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      } else {
        inputRefs[index].current?.blur();
      }
    }

    if (text.length > 1) {
      const digits = text.split('').slice(0, 4);
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

  const fetchPhone = async (): Promise<boolean> => {
    try {
      const fetchedPhone = await isPhoneNumberRegistered(phone);
      return fetchedPhone;
    } catch (err) {
      return false; 
    }
  };
  

  const handleNavigation = async () => {

    const fullCode = code.join('');
    
    if (true) { // TODO: Agregar validacion de codigo OTP
      setCode(['', '', '', '']); 

      inputRefs.forEach((ref) => {
        ref.current?.clear();
      });

      try {
        const phoneExists = await fetchPhone();
        if (phoneExists) {
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
    } else {
      // TODO: Mensaje de error y limpieza
      setCode(['', '', '', '']);
      inputRefs[0].current?.focus();
    }
  };

  return (
    // TODO: Cuando el usuario pegue el codigo completo, o que lo pegue desde el teclado por ios, se pegue en cada recuadro
    <Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={ Platform.OS === 'ios' ? [35] : [55] }>
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
            <Text style={styles.text}>Se ha enviado un código de verificación a +{lada} {phone}</Text>
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
                  keyboardType= {Platform.OS === 'ios' ? 'number-pad' : 'phone-pad'}
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
              onPress={() => handleNavigation()}
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
