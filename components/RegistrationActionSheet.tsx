import React, { useRef, useState } from 'react';
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

interface RegistrationActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  lada: string;
  phone: string;
}

const RegistrationActionSheet: React.FC<RegistrationActionSheetProps> = ({ isOpen, onClose, lada, phone }) => {
  const [buttonColor, setButtonColor] = useState(Colors.light.darkBlue);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];
  const navigation = useNavigation();
  const router = useRouter();

  const handleChange = (text: string, index: number) => {
    if (text.length === 1 && index < inputRefs.length - 1 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current!.focus();
    }
  };

  const handlePressIn = () => {
    setButtonColor(Colors.light.mediumBlue);
  };

  const handlePressOut = () => {
    setButtonColor(Colors.light.darkBlue);
  };

  type RegistrationRoutes = 
  | '/(registration)/registrationPhone'
  | '/(registration)/registrationName'
  | '/(registration)/registrationForm';

  const handleNavigation = (route: RegistrationRoutes) => {
    router.push(route);

    setTimeout(() => {
      onClose();
    }, 300); 
  }

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={[36]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
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
                  keyboardType="number-pad"
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  onChangeText={(text) => handleChange(text, index)}
                />
              ))}
            </HStack>
            <Button
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => handleNavigation('/(registration)/registrationName')}
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
    textAlign: 'center'
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
    borderColor: '#ddd',
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
