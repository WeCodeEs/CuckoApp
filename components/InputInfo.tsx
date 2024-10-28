import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Icon } from '@/components/ui/icon';
import { Check, X, Pencil, Info } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';

interface InputInfoProps {
    initialValue: string;
    editable: boolean;
    onEditComplete: (newValue: string) => void;
    onCancelEdit: () => void;
    isEmail?: boolean;
    headingText: string;
}

const InputInfo: React.FC<InputInfoProps> = ({ initialValue, editable, onEditComplete, onCancelEdit, isEmail, headingText }) => {
    const [value, setValue] = useState(initialValue);
    const [inputValue, setInputValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleCancel = () => {
        setInputValue(value);
        setIsEditing(false);
        setShowAlert(false);
        onCancelEdit();
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSave = () => {
        if (isEmail && !validateEmail(inputValue)) {
            setShowAlert(true);
            return;
        }
        setValue(inputValue);
        setIsEditing(false);
        setShowAlert(false);
        onEditComplete(inputValue);
    };

    return (
        <View style={styles.container}>
            <Heading style={styles.title} size={"lg"}>{headingText}</Heading>

            {editable ? (
                isEditing ? (
                    <View style={styles.editableContainer}>
                        <TextInput
                            style={styles.input}
                            value={inputValue}
                            onChangeText={(text) => setInputValue(text)}
                        />
                        <View style={styles.buttonsContainer}>
                            <Button 
                                style={styles.button}
                                variant="outline"
                                action="secondary"
                                onPress={handleSave}
                            >
                                <Icon as={Check} size="md" className="text-typography-600" />
                            </Button>
                            <Button 
                                style={styles.button}
                                variant="outline"
                                action="secondary"
                                onPress={handleCancel}
                            >
                                <Icon as={X} size="md" className="text-typography-600" />
                            </Button>
                        </View>
                    </View>
                ) : (
                    <View style={styles.displayContainer}>
                        <Text>{value}</Text>
                        <Pressable onPress={() => setIsEditing(true)}>
                            <Icon style={styles.editIcon} as={Pencil} size="lg" className="text-typography-600" />
                        </Pressable>
                    </View>
                )
            ) : (
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(text) => {
                        setValue(text);
                        onEditComplete(text);
                    }}
                />
            )}

            {showAlert && (
                <View style={styles.alertContainer}>
                    <Alert action="error" variant="solid">
                        <AlertIcon as={Info} />
                        <AlertText>Por favor, introduce un correo electrónico válido.</AlertText>
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
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    button: {
        marginLeft: 8,
        borderRadius: 100,
        aspectRatio: 1 / 1,
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
    }
});
