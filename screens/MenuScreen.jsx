import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { View } from "@/components/ui/view";
import { Divider } from '@/components/ui/divider';
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { ArrowLeft } from "lucide-react-native";

SplashScreen.preventAutoHideAsync();

const MenuScreen = () => {
  return (
    <View className="p-5">
      <Center>
        <Box className="p-5 max-w-96 border border-background-300 rounded-lg">
          <VStack className="pb-4" space="xs">
            <Heading size={"3xl"} >Ejemplo titulo H1</Heading>
            <Heading size={"2xl"} >Ejemplo titulos H2</Heading>
            <Heading size={"xl"} >Ejemplo titulos H3</Heading>
            <Heading size={"lg"} >Ejemplo titulos H4</Heading>
            <Heading size={"md"} >Ejemplo titulos H5</Heading>
            <Heading size={"sm"} >Ejemplo titulos H6</Heading>

            <Divider />

            <Text size={"sm"}>Ejemplo texto sm</Text>
            <Text size={"md"}>Ejemplo texto md</Text>
            <Text size={"lg"}>Ejemplo texto lg</Text>
            <Text size={"xl"}>Ejemplo texto xl</Text>
            <Text size={"2xl"}>Ejemplo texto 2xl</Text>
            <Text size={"3xl"}>Ejemplo texto 3xl</Text>

            <Divider />

            <Text className="text-sm">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna{" "}
            </Text>
          </VStack>
          <VStack space="xl" className="py-2">
            <Input>
              <InputField className="py-2" placeholder="Ejemplo de input" />
            </Input>
          </VStack>
          <VStack space="lg" className="pt-4">
            <Button size="sm">
              <ButtonText>Hello World!</ButtonText>
            </Button>
            <Box className="flex flex-row">
              <Button variant="link" size="sm" className="p-0">
                {/* ArrowLeftIcon is imported from 'lucide-react-native' */}
                <ButtonIcon className="mr-1" size="md" as={ArrowLeft} />
                <ButtonText>de regreso?</ButtonText>
              </Button>
            </Box>
          </VStack>
        </Box>
      </Center>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
