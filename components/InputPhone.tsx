import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "@/components/ui/text";
import { Input, InputSlot, InputField, InputIcon } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from '@/components/ui/icon';
import { X, Pencil, Check, Plus, Info } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';

interface InputPhoneProps {
    initialPhone: string;
    initialLada: string;
    editable: boolean;
    onEditComplete: (lada: string, phone: string) => void;
    onCancelEdit: () => void;
    headingText: string;
}

const InputPhone: React.FC<InputPhoneProps> = ({ initialPhone, initialLada, editable, onEditComplete, onCancelEdit, headingText }) => {
    const [lada, setLada] = useState(initialLada);
    const [phone, setPhone] = useState(initialPhone);
    const [inputPhone, setInputPhone] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const maskPhoneNumber = (phone: string) => {
        if (phone.length >= 10) {
            return '********' + phone.slice(-2);
        }
        return phone;
    };

    const handleSave = () => {
        if(inputPhone.length != 10)
        {
            setShowAlert(true);
        }
        else
        {
            setPhone(inputPhone);
            setShowAlert(false);
            setIsEditing(false);
        }
    };
    
    const handleCancel = () => {
        setInputPhone("");
        setShowAlert(false);
        setIsEditing(false);
        onCancelEdit();
    };

    return (
        <View style={styles.container}>
            <Heading style={styles.title} size={"lg"}>{headingText}</Heading>

            {editable ? (
                isEditing ? (
                    <View style={styles.editableContainer}>
                        <View style={styles.ladaContainer}>
                            <Input variant="underlined" style={styles.ladaInput} size="md">
                                <InputSlot className="pl-3">
                                    <InputIcon as={Plus} size={'2xl'}/>
                                </InputSlot>
                                <InputField placeholder={lada} keyboardType="phone-pad"/>
                            </Input>
                        </View>
                        <Input variant="underlined" style={styles.phoneInput} size="md">
                            <InputField 
                                onChangeText={(text) => setInputPhone(text.replace(/[^0-9]/g, ''))}
                                keyboardType="phone-pad"
                                maxLength={10}
                            />
                        </Input>
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
                        <Text>+{lada} {maskPhoneNumber(phone)}</Text>
                        <Pressable onPress={() => setIsEditing(true)}>
                            <Icon style={styles.editIcon} as={Pencil} size="lg" className="text-typography-600"/>
                        </Pressable>
                    </View>
                )
            ) : (
                <View style={styles.displayContainer}>
                    <View style={styles.ladaContainer}>
                        <Input variant="underlined" style={styles.ladaInput} size="md">
                            <InputSlot className="pl-3">
                                <InputIcon as={Plus} size={'2xl'}/>
                            </InputSlot>
                            <InputField placeholder={lada} keyboardType="phone-pad"/>
                        </Input>
                    </View>
                    <Input variant="underlined" style={styles.phoneInput} size="md">
                        <InputField 
                            placeholder="9511234567"
                            onChangeText={(text) => setInputPhone(text.replace(/[^0-9]/g, ''))}
                            keyboardType="phone-pad"
                            maxLength={10}
                        />
                    </Input>
                </View>
            )}
            {showAlert && (     
                <View style={styles.alertContainer}>
                    <Alert action="error" variant="solid">
                        <AlertIcon as={Info} />
                        <AlertText>Por favor, introduce un número de teléfono válido.</AlertText>
                    </Alert>
                </View>
            )}
        </View>
    );
};

export default InputPhone;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        marginBottom: 10,
    },
    editableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ladaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    plusSign: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingRight: 5,
    },
    ladaInput: {
        width: 80,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    phoneInput: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginLeft: 10,
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
