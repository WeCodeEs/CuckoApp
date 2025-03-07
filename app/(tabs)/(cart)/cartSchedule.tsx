import { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem, SelectScrollView } from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Colors } from "@/constants/Colors";
import { Clock, ShoppingBag, CircleAlert } from "lucide-react-native";
import { useStripe } from '@stripe/stripe-react-native';
import { fetchPaymentIntent } from "@/constants/api";

const places = [
  { label: "Cuckoo Resto", value: "resto" },
  { label: "Cuckoo Box", value: "box" }
];

const OPEN_HOUR = 8;
const CLOSE_HOUR = 17;

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
      value: `${hour}:${minute.toString().padStart(2, "0")}`
    });
    
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }
  return slots;
};

export default function ScheduleOrderScreen() {
  const [selectedPlace, setSelectedPlace] = useState("");
  const [timeSlots, setTimeSlots] = useState(generateTimeSlots);
  const [selectedTime, setSelectedTime] = useState("");
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState<string>();

  useEffect(() => {
    setTimeSlots(generateTimeSlots());
  }, []);

  const formattedDate = new Date().toLocaleDateString("es-MX");

  const handlePayment = async () => {
    const clientSecret = await fetchPaymentIntent();
    if (!clientSecret) return;

    setClientSecret(clientSecret);
    const { error } = await initPaymentSheet({ paymentIntentClientSecret: clientSecret, merchantDisplayName: "Cuckoo Coffee & Resto ®"});

    if (error) {
      console.error("Error con mensaje: ", error.message);
      return;
    }

    const { error: paymentError} = await presentPaymentSheet();
    if (paymentError) {
      console.error("Error con el pago: ", paymentError.message);
    } else {
      console.log("Pago completado con exito: ");
    }
  };

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
              <SelectScrollView>
                {places.map(place => (
                  <SelectItem key={place.value} label={place.label} value={place.value} />
                ))}
              </SelectScrollView>
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
                <SelectScrollView>
                {timeSlots.map(slot => (
                  <SelectItem key={slot.value} label={slot.label} value={slot.value} />
                ))}
                </SelectScrollView>
              </SelectContent>
          </SelectPortal>
        </Select>

        
      </VStack>
      <View>
        <Center style={styles.warningContainer}>  
            <CircleAlert key={"place"} size={15} color={Colors.light.ash} style={styles.warningIcon}/>      
            <Text size="sm" style={styles.warningText}> 
              No podrás cambiar los datos de entrega después de confirmar</Text>
        </Center>
        <HStack style={styles.paymentBar}>
          <VStack style={styles.summaryContainer}>
            <Text size="sm" style={styles.summaryText}>{formattedDate}{selectedTime ? ", " + selectedTime + " hrs." : ""}</Text>
            <Text size="sm" style={styles.summaryText}>{selectedPlace ? places.find(p => p.value === selectedPlace)?.label : ""}</Text>
          </VStack>
          <Center>
            <Button size="md" style={styles.paymentButton} onPress={handlePayment}>
              <ButtonText size="sm" style={styles.paymentButtonText}>CONFIRMAR</ButtonText>
            </Button>
          </Center>
        </HStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: Colors.light.background
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
    color: Colors.light.ash,
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
    color: Colors.light.text,
    fontSize: 15,
  },
  label: {
    fontWeight: "bold",
    marginTop: 16,
    color: Colors.light.text,
  },
  warningContainer: {
    paddingHorizontal: '0%',
    paddingBottom: 10, 
    flexDirection:'row'
  },
  warningIcon: {
    alignSelf: 'flex-start', 
    paddingTop: '5%'
  },
  warningText: {
    color: Colors.light.ash, 
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
  summaryText: {
    color: Colors.light.lightGray,
  },
  summaryContainer: {
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