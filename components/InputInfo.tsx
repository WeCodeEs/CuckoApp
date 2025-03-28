import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "@/components/ui/text";
import { Input, InputField } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Icon } from '@/components/ui/icon';
import { Check, X, Pencil, Info } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';
import { isValidName } from '@/constants/validations';
import { sanitizeName, sanitizeEmail } from '@/constants/validations';

interface InputInfoProps {
  initialValue: string;
  editable: boolean;
  onEditComplete: (newValue: string) => void;
  onCancelEdit: () => void;
  isEmail?: boolean;
  headingText: string;
  alwaysEditable?: boolean;
  placeholder?: string;
}

const InputInfo: React.FC<InputInfoProps> = ({
  initialValue,
  editable,
  onEditComplete,
  onCancelEdit,
  isEmail,
  headingText,
  alwaysEditable,
  placeholder,
}) => {
  const [value, setValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(alwaysEditable ? true : false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChangeText = (text: string) => {
    if (isEmail) {
      const { sanitized, hadInvalidChars } = sanitizeEmail(text);
      setInputValue(sanitized);
      setShowAlert(hadInvalidChars);
    } else {
      const { sanitized, hadInvalidChars } = sanitizeName(text, false);
      setInputValue(sanitized);
      setShowAlert(hadInvalidChars);
    }
  };

  const handleBlur = () => {
    if (isEmail) {
      const { sanitized, hadInvalidChars } = sanitizeEmail(inputValue);
      setInputValue(sanitized);
      setValue(sanitized);
      setShowAlert(hadInvalidChars);
      onEditComplete(sanitized);
    } else {
      const { sanitized, hadInvalidChars } = sanitizeName(inputValue, true);
      setInputValue(sanitized);
      setValue(sanitized);
      if (!isValidName(sanitized)) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
      onEditComplete(sanitized);
    }
  };

  const handleSave = () => {
    handleBlur();
    if (!alwaysEditable) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setInputValue(value);
    setShowAlert(false);
    if (!alwaysEditable) {
      setIsEditing(false);
    }
    onCancelEdit();
  };

  return (
    <View style={styles.container}>
      <Heading style={styles.title} size={"lg"}>{headingText}</Heading>
      {editable ? (
        isEditing ? (
          <View style={styles.editableContainer}>
            <Input variant="underlined" style={styles.input} size="md">
              <InputField 
                value={inputValue}
                onChangeText={handleChangeText}
                onBlur={handleBlur}
                placeholder={placeholder || headingText}
              />
            </Input>
            {!alwaysEditable && (
              <View style={styles.buttonsContainer}>
                <Button style={styles.button} variant="outline" onPress={handleSave}>
                  <Icon as={Check} size="md" />
                </Button>
                <Button style={styles.button} variant="outline" onPress={handleCancel}>
                  <Icon as={X} size="md" />
                </Button>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.displayContainer}>
            <Text>{value}</Text>
            <Pressable onPress={() => setIsEditing(true)}>
              <Icon style={styles.editIcon} as={Pencil} size="lg" />
            </Pressable>
          </View>
        )
      ) : (
        <Input variant="underlined" style={styles.input} size="md">
          <InputField 
            placeholder={placeholder || headingText}
            value={inputValue}
            onChangeText={handleChangeText}
            onBlur={handleBlur}
          />
        </Input>
      )}
      {showAlert && (
        <View style={styles.alertContainer}>
          <Alert action="error" variant="solid">
            <AlertIcon as={Info} />
            <AlertText>
              {isEmail
                ? 'Por favor, introduce un correo electrónico válido.'
                : 'Este campo solo admite letras, espacios simples y guiones.'}
            </AlertText>
          </Alert>
        </View>
      )}
    </View>
  );
};

export default InputInfo;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 25,
  },
  title: {
    marginBottom: 10,
  },
  editableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  button: {
    marginLeft: 8,
    borderRadius: 100,
    aspectRatio: 1,
  },
  displayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editIcon: {
    marginLeft: 8,
  },
  alertContainer: {
    marginTop: 10,
  },
});
