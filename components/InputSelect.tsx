import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "@/components/ui/text";
import { Icon } from '@/components/ui/icon';
import { Pencil } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";
import { ChevronDown as ChevronDownIcon } from "lucide-react-native";
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicatorWrapper,
    ActionsheetDragIndicator,
    ActionsheetItem,
    ActionsheetItemText,
} from '@/components/ui/actionsheet';
import { 
    Select, 
    SelectTrigger, 
    SelectInput as SelectComponentInput, 
    SelectIcon, 
    SelectPortal, 
    SelectBackdrop, 
    SelectContent, 
    SelectDragIndicatorWrapper, 
    SelectDragIndicator, 
    SelectItem 
} from '@/components/ui/select';

interface InputSelectProps {
    initialValue: string;
    editable: boolean;
    onEditComplete: (newValue: string) => void;
    onCancelEdit: () => void;
    headingText: string;
    items: string[];
}

const InputSelect: React.FC<InputSelectProps> = ({ initialValue, editable, onEditComplete, headingText, items }) => {
    const [value, setValue] = useState(initialValue);
    const [selectedOption, setSelectedOption] = useState(initialValue);
    const [showActionsheet, setShowActionsheet] = useState(false);

    const handleSelectChange = (newValue: string) => {
        setSelectedOption(newValue);
        setValue(newValue);
        setShowActionsheet(false);
        onEditComplete(newValue);
    };

    return (
        <View style={styles.container}>
            <Heading style={styles.title} size={"lg"}>{headingText}</Heading>

            {editable ? (
                <View style={styles.displayContainer}>
                    <Text>{value}</Text>
                    <Pressable onPress={() => setShowActionsheet(true)}>
                        <Icon style={styles.editIcon} as={Pencil} size="lg" className="text-typography-600" />
                    </Pressable>
                    <Actionsheet isOpen={showActionsheet} onClose={() => setShowActionsheet(false)}>
                        <ActionsheetBackdrop />
                        <ActionsheetContent>
                            <ActionsheetDragIndicatorWrapper>
                                <ActionsheetDragIndicator />
                            </ActionsheetDragIndicatorWrapper>
                            {items.map((item) => (
                                <ActionsheetItem key={item} onPress={() => handleSelectChange(item)}>
                                    <ActionsheetItemText>{item}</ActionsheetItemText>
                                </ActionsheetItem>
                            ))}
                        </ActionsheetContent>
                    </Actionsheet>
                </View>
            ) : (
                <View style={styles.editableContainer}>
                    <Select onValueChange={handleSelectChange}>
                        <SelectTrigger variant="outline" size="md" style={styles.selectTrigger}>
                            <SelectComponentInput placeholder="Selecciona una opción" />
                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent style={styles.selectContent}>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                {items.map(item => (
                                    <SelectItem key={item} label={item} value={item} />
                                ))}
                            </SelectContent>
                        </SelectPortal>
                    </Select>
                </View>
            )}
        </View>
    );
};

export default InputSelect;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: 25,
    },
    title: {
        marginBottom: 10,
    },
    displayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    editIcon: {
        marginLeft: 8,
    },
    editableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectTrigger: {
        flex: 1,
        minWidth: 0,
        maxWidth: '100%',
    },
    selectContent: {
        paddingBottom: 20,
    },
});
