import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { Colors } from "@/constants/Colors";

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;

interface TimePickerProps {
    availableSlots: { label: string; value: string }[];
    onSelectTime: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ availableSlots, onSelectTime }) => {
    const extractedHours = [...new Set(availableSlots.map(slot => slot.value.split(":")[0]))];
    const hours = extractedHours.length > 0 ? extractedHours : ["08"];
    const [selectedHourIndex, setSelectedHourIndex] = useState(0);
    const [selectedMinuteIndex, setSelectedMinuteIndex] = useState(0);
    const [availableMinutes, setAvailableMinutes] = useState<string[]>(["00", "30"]);

    const hourScrollRef = useRef<ScrollView>(null);
    const minuteScrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (hours.length > 0) {
            const selectedHour = hours[selectedHourIndex];
            const minutesForHour = availableSlots
                .filter(slot => slot.value.startsWith(selectedHour))
                .map(slot => slot.value.split(":")[1]);

            setAvailableMinutes(minutesForHour.length > 0 ? minutesForHour : ["00"]);

            if (!minutesForHour.includes(availableMinutes[selectedMinuteIndex])) {
                setSelectedMinuteIndex(0);
                minuteScrollRef.current?.scrollTo({ y: 0, animated: true });
            }
        }
    }, [selectedHourIndex, availableSlots]);

    useEffect(() => {
        const selectedHour = hours[selectedHourIndex] || "08";
        const selectedMinute = availableMinutes[selectedMinuteIndex] || "00";
        onSelectTime(`${selectedHour}:${selectedMinute}`);
    }, [selectedHourIndex, selectedMinuteIndex, availableMinutes]);

    const handleHourScrollEnd = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
        setSelectedHourIndex(index);
    };

    const handleMinuteScrollEnd = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
        setSelectedMinuteIndex(index);
    };

    return (
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: ITEM_HEIGHT * VISIBLE_ITEMS }}>
            <ScrollView
                ref={hourScrollRef}
                style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS, width: 80 }}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                onMomentumScrollEnd={handleHourScrollEnd}
            >
                <View style={{ height: ITEM_HEIGHT }} />
                {hours.map((hour, index) => (
                    <View key={index} style={{ height: ITEM_HEIGHT, justifyContent: "center", alignItems: "center" }}>
                        <Text
                            style={{
                                fontSize: index === selectedHourIndex ? 22 : 18,
                                fontWeight: "bold",
                                opacity: index === selectedHourIndex ? 1 : 0.3,
                                color: Colors.light.darkBlue,
                            }}
                        >
                            {hour}
                        </Text>
                    </View>
                ))}
                <View style={{ height: ITEM_HEIGHT }} />
            </ScrollView>

            <Text style={{ fontSize: 22, paddingHorizontal: 10, color: Colors.light.darkBlue }}>:</Text>

            <ScrollView
                ref={minuteScrollRef}
                style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS, width: 80 }}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                scrollEnabled={availableMinutes.length > 1}
                onMomentumScrollEnd={handleMinuteScrollEnd}
            >
                <View style={{ height: ITEM_HEIGHT }} />
                {availableMinutes.map((minute, index) => (
                    <View key={index} style={{ height: ITEM_HEIGHT, justifyContent: "center", alignItems: "center" }}>
                        <Text
                            style={{
                                fontSize: index === selectedMinuteIndex ? 22 : 18,
                                fontWeight: "bold",
                                opacity: index === selectedMinuteIndex ? 1 : 0.3,
                                color: Colors.light.darkBlue,
                            }}
                        >
                            {minute}
                        </Text>
                    </View>
                ))}
                <View style={{ height: ITEM_HEIGHT }} />
            </ScrollView>

        </View>
    );
};

export default TimePicker;
