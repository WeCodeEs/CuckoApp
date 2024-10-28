import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Icon } from '@/components/ui/icon';
import { X, Pencil, Check } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";
import { Colors } from '@/constants/Colors';

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
    const [isEditing, setIsEditing] = useState(false);

    const maskPhoneNumber = (phone: string) => {
        if (phone.length >= 10) {
            return '********' + phone.slice(-2);
        }
        return phone;
    };

    const handleSave = () => {
        onEditComplete(lada, phone);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setLada(initialLada);
        setPhone(initialPhone);
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
                            <Text style={styles.plusSign}>+</Text>
                            <TextInput
                                style={styles.ladaInput}
                                value={lada}
                                onChangeText={(text) => setLada(text.replace(/[^0-9]/g, ''))}
                                keyboardType="numeric"
                                maxLength={3}
                            />
                        </View>
                        <TextInput
                            style={styles.phoneInput}
                            value={phone}
                            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
                            keyboardType="phone-pad"
                            maxLength={10}
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
                        <Text>+{lada} {maskPhoneNumber(phone)}</Text>
                        <Pressable onPress={() => setIsEditing(true)}>
                            <Icon style={styles.editIcon} as={Pencil} size="lg" className="text-typography-600"/>
                        </Pressable>
                    </View>
                )
            ) : (
                <View style={styles.displayContainer}>
                    <Text>+{lada} {maskPhoneNumber(phone)}</Text>
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
        width: 60,
        borderColor: Colors.light.borderBox,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    phoneInput: {
        flex: 1,
        borderColor: Colors.light.borderBox,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
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
});
