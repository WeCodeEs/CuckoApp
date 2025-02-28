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
import { Clock, ShoppingBag, CircleAlert } from "lucide-react-native";

const places = [
  { label: "Cuckoo Resto", value: "resto" },
  { label: "Cuckoo Box", value: "box" }
];

const OPEN_HOUR = 8;
const CLOSE_HOUR = 18;

const generateTimeSlots = (): { label: string; value: string }[] => {
  const slots: { label: string; value: string }[] = [];
  const now = new Date();
  now.setSeconds(0, 0);
  
  now.setMinutes(now.getMinutes() + 20);
  let startHour = now.getHours();
  let startMinute = now.getMinutes() >= 30 ? 0 : 30;
  if (now.getMinutes() >= 40) startHour++;
  
  if (startHour < OPEN_HOUR) {
    startHour = OPEN_HOUR;
    startMinute = 30;
  }
  if (startHour >= CLOSE_HOUR) return slots;

  console.log("Hora actual:", now.getHours(), "Minuto actual:", now.getMinutes());
  
  for (let hour = startHour; hour <= CLOSE_HOUR; hour++) {
    if (hour === CLOSE_HOUR) {
      slots.push({ label: `${hour.toString().padStart(2, "0")}:00`, value: `${hour}:00` });
    } else {
      slots.push({ label: `${hour.toString().padStart(2, "0")}:00`, value: `${hour}:00` });
      slots.push({ label: `${hour.toString().padStart(2, "0")}:30`, value: `${hour}:30` });
    }
  }

  console.log("Horarios generados:", slots);
  return slots;
};

export default function ScheduleOrderScreen() {
  const [selectedPlace, setSelectedPlace] = useState("");
  const [timeSlots, setTimeSlots] = useState(generateTimeSlots);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    setTimeSlots(generateTimeSlots());
  }, []);

  const formattedDate = new Date().toLocaleDateString("es-MX");

  return (
    <View style={styles.container}>
      <VStack space="xl" style={styles.vStack}>
        <Heading style={styles.heading}>Agenda tu pedido</Heading>
        <Text size="md" style={styles.subText}>Selecciona el lugar y hora de la entrega</Text>

        <Text style={styles.label}>Lugar</Text>
        <Select onValueChange={setSelectedPlace}>
          <SelectTrigger variant="underlined" size="sm" style={styles.selectTrigger}>
            <ShoppingBag size={20} color={Colors.light.mediumDarkBlue} />
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
          <SelectTrigger variant="underlined" size="sm" style={styles.selectTrigger}>
            <Clock size={20} color={Colors.light.mediumDarkBlue} />
            <SelectInput placeholder="Selecciona una hora" style={styles.selectText}/>
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

        <Center style={styles.warningContainer}>  
          <CircleAlert key={"place"} size={15} color={"gray"} style={styles.warningIcon}/>      
          <Text size="sm" style={styles.warningText}> 
            No podrás cambiar los datos de entrega después de confirmar</Text>
        </Center>
      </VStack>

      <HStack style={styles.paymentBar}>
        <VStack style={styles.subtotalContainer}>
          <Text size="sm" style={styles.subtotalText}>{formattedDate}{selectedTime ? ", " + selectedTime + " hrs." : ""}</Text>
          <Text size="sm" style={styles.subtotalText}>{selectedPlace ? places.find(p => p.value === selectedPlace)?.label : ""}</Text>
        </VStack>
        <Center>
          <Button size="md" style={styles.paymentButton}>
            <ButtonText size="sm" style={styles.paymentButtonText}>CONFIRMAR</ButtonText>
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
    marginTop: 16,
    color: Colors.light.text,
  },
  warningContainer: {
    paddingHorizontal: '0%', 
    paddingTop: '45%', 
    flexDirection:'row'
  },
  warningIcon: {
    alignSelf: 'flex-start', 
    paddingTop: '5%'
  },
  warningText: {
    color:"gray", 
    textAlignVertical:"bottom", 
    textAlign:"center", 
    paddingHorizontal: 6
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
  paymentButton: {
    borderRadius: 30,
    backgroundColor: Colors.light.background, 
  },
  paymentButtonText: {
    color: Colors.light.tabIconSelected,
  }
});
