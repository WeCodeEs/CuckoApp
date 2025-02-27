import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem } from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Colors } from "@/constants/Colors";
import { Clock, ShoppingBag  } from "lucide-react-native";

const places = [
  { label: "Cuckoo Resto", value: "resto" },
  { label: "Cuckoo Box", value: "box" }
];

const generateTimeSlots = () => {
  const slots = [];
  const now = new Date();
  now.setSeconds(0, 0);
  const currentMinutes = now.getMinutes();
  let startHour = now.getHours();
  let startMinute = currentMinutes < 20 ? 30 : 0;
  if (currentMinutes >= 40) startHour++;
  
  for (let hour = startHour; hour < 20; hour++) {
    if (hour === startHour && startMinute === 30) {
      slots.push({ label: `${hour.toString().padStart(2, "0")}:30`, value: `${hour}:30` });
    } else {
      slots.push({ label: `${hour.toString().padStart(2, "0")}:00`, value: `${hour}:00` });
      slots.push({ label: `${hour.toString().padStart(2, "0")}:30`, value: `${hour}:30` });
    }
  }
  return slots;
};

export default function ScheduleOrderScreen() {
  const [selectedPlace, setSelectedPlace] = useState(places[0].value);
  const [timeSlots, setTimeSlots] = useState(generateTimeSlots);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]?.value || "");

  useEffect(() => {
    setTimeSlots(generateTimeSlots());
    setSelectedTime(timeSlots[0]?.value || "");
  }, []);

  return (
    <View style={styles.container}>
      <VStack space="xl" style={styles.vStack}>
        <Heading style={styles.heading}>Agenda tu pedido</Heading>
        <Text size="md" style={styles.subText}>Selecciona el lugar y hora de la entrega</Text>

        <Text style={styles.label}>Lugar</Text>
        <Select onValueChange={setSelectedPlace} style={{}}>
          <SelectTrigger variant="underlined" size="sm"  style={styles.selectTrigger}>
            <ShoppingBag key={"place"} size={20} color={Colors.light.text} />
            <SelectInput placeholder="Selecciona un lugar" style={styles.selectText}/>
            <SelectIcon as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {places.map(place => (
                <SelectItem key={place.value} label={place.label} value={place.value} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>

        <Text style={styles.label}>Hora</Text>
        <Select onValueChange={setSelectedTime}>
          <SelectTrigger variant="underlined" size="sm"  style={styles.selectTrigger}>
            <Clock key={"place"} size={20} color={Colors.light.text} />
            <SelectInput placeholder="Selecciona una hora"  style={styles.selectText}/>
            <SelectIcon as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {timeSlots.map(slot => (
                <SelectItem key={slot.value} label={slot.label} value={slot.value} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </VStack>

      {/* <HStack style={styles.footer}>
        <Text style={styles.footerText}>{new Date().toLocaleDateString("es-MX")} {selectedTime}, {places.find(p => p.value === selectedPlace)?.label}</Text>
        <Button style={styles.confirmButton} onPress={() => console.log("Pedido confirmado")}>CONFIRMAR</Button>
      </HStack> */}
      <HStack style={styles.paymentBar}>
            <VStack style={styles.subtotalContainer}>
              <Text size="sm" style={styles.subtotalText}>
                25/02/2025, 17:30 hrs.
              </Text>
              <Text size="sm" style={styles.subtotalText}>
                Cuckoo Box
              </Text>
            </VStack>
            <Center>
              <Button size="md" style={styles.paymentButton}>
                <ButtonText size="sm" style={styles.paymentButtonText}>
                  CONFIRMAR
                </ButtonText>
              </Button>
            </Center>
        </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  vStack: {
    width: "100%",
    padding: 20
  },
  heading: {
    fontWeight: "normal",
    textAlign: 'center',
    width: '100%'
  },
  subText: {
    color: "gray",
    textAlign: 'center',
    width: '100%'
  },
  selectTrigger: {
    height: 'auto', 
    justifyContent: 'space-between', 
    paddingVertical: 10
  },
  selectText: {
    width: '80%', 
    color: 'black',
    fontSize: 15,
  },
  label: {
    fontWeight: "bold",
    marginTop: 16
  },
  paymentBar: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.light.tabIconSelected,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 }, 
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  subtotalText: {
    color: Colors.light.lightGray,
  },
  subtotalContainer: {
    paddingVertical: 7,
  },
  subtotal: {
    fontWeight: 'bold',
    color: 'white',
  },
  paymentButton: {
    borderRadius: 30,
    backgroundColor: Colors.light.background, 
  },
  paymentButtonText: {
    color: Colors.light.tabIconSelected,
  }
});
