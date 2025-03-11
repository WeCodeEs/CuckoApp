import React, { useState } from "react";
import { Text } from "@/components/ui/text";
import { Modal, ModalBackdrop, ModalContent, ModalBody, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Colors } from "@/constants/Colors";
import TimePicker from "./TimePicker";
import { View } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Clock } from "lucide-react-native";
import { Switch } from "@/components/ui/switch";

interface DeliveryTimeModalProps {
  isVisible: boolean;
  onClose: (selectedTime: string | null) => void;
}

const OPEN_HOUR = 8;
const CLOSE_HOUR = 24;

const generateTimeSlots = (): { label: string; value: string }[] => {
  const slots: { label: string; value: string }[] = [];
  const now = new Date();
  now.setSeconds(0, 0);
  now.setMinutes(now.getMinutes() + 20);

  let startHour = now.getHours();
  let startMinute = now.getMinutes() < 30 ? 30 : 0;
  if (now.getMinutes() >= 30) startHour++;

  if (startHour < OPEN_HOUR || (startHour === OPEN_HOUR && startMinute < 30)) {
    startHour = OPEN_HOUR;
    startMinute = 30;
  }
  if (startHour >= CLOSE_HOUR) return slots;

  let hour = startHour;
  let minute = startMinute;
  while (hour < CLOSE_HOUR) {
    slots.push({
      label: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
      value: `${hour}:${minute.toString().padStart(2, "0")}`,
    });

    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }
  return slots;
};

const DeliveryTimeModal: React.FC<DeliveryTimeModalProps> = ({ isVisible, onClose }) => {
  const [isImmediate, setIsImmediate] = useState(true);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleToggle = (value: boolean) => {
    setIsImmediate(value);
    if (value) {
      setSelectedTime(null);
    }
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    onClose(isImmediate ? null : selectedTime);
  };

  const handleCancel = () => {
    setIsImmediate(true);
    setSelectedTime(null);
    onClose(null);
  };

  return (
    <Modal isOpen={isVisible} onClose={handleCancel}>
      <ModalBackdrop />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ModalContent style={{ borderRadius: 30, padding: 20 }} className="max-w-[305px] items-center">
          <ModalHeader>
            <Box
              style={{ backgroundColor: Colors.light.lightBlue }}
              className="w-[56px] h-[56px] rounded-full items-center justify-center"
            >
              <Icon as={Clock} stroke={Colors.light.darkBlue} size="xl" />
            </Box>
          </ModalHeader>

          <ModalBody className="mt-0 mb-4">
            <Heading
              size="md"
              style={{ fontWeight: "normal", paddingTop: 10 }}
              className="text-typography-950 mb-2 text-center"
            >
              Seleccionar hora de entrega
            </Heading>

            <VStack space="md" style={{ marginTop: 5, marginBottom: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <Text size="md">Preparación inmediata</Text>
                <Switch 
                  size="md" 
                  value={isImmediate} 
                  onValueChange={handleToggle}
                  trackColor={{ false: Colors.light.lightGray, true: Colors.light.lightBlue }}
                />
              </View>
            </VStack>

            {!isImmediate && (
              <TimePicker availableSlots={generateTimeSlots()} onSelectTime={handleSelectTime} />
            )}
          </ModalBody>

          <ModalFooter className="w-full flex-row space-x-2">
            <Button
              variant="outline"
              action="secondary"
              size="sm"
              onPress={handleCancel}
              className="flex-grow"
              style={{ borderRadius: 30 }}
            >
              <Text>Cancelar</Text>
            </Button>
            <Button
              onPress={handleConfirm}
              size="sm"
              className="flex-grow"
              style={{ borderRadius: 30, backgroundColor: Colors.light.darkBlue }}
            >
              <Text style={{ color: Colors.light.background }}>Confirmar</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </View>
    </Modal>
  );
};

export default DeliveryTimeModal;

