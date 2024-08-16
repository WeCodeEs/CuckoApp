import { SafeAreaView } from "react-native-safe-area-context";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Center } from "@/components/ui/center";
import { Grid, GridItem } from "@/components/ui/grid";
import { Divider } from "@/components/ui/divider";
import { Card } from "@/components/ui/card";

export default function TabLayout() {
  return (
    <GluestackUIProvider>
      <SafeAreaView>
        <Center className="bg-tertiary-100">
          <Heading>I am a Heading</Heading>

          <HStack space="md" reversed={false}>
            <Box className="h-20 w-20 bg-primary-300">
              <Text className="text-typography-0">This is the Box</Text>
            </Box>
            <Box className="h-20 w-20 bg-primary-400">
              <Text className="text-typography-0">This is the Box</Text>
            </Box>
            <Box className="h-20 w-20 bg-primary-500">
              <Text className="text-typography-0">This is the Box</Text>
            </Box>
          </HStack>
          <Divider />
          <Grid
            className="gap-y-2 gap-x-4 p-5"
            _extra={{
              className: "grid-cols-2 md:grid-cols-3",
            }}
          >
            <GridItem
              className="bg-background-50 p-4 rounded-md text-center"
              _extra={{
                className: "col-span-1",
              }}
            >
              <Card size="lg" variant="filled" className="m-3">
                <Heading size="md" className="mb-1">
                  Quick Start
                </Heading>
                <Text size="sm">
                  Start building your next project in minutes
                </Text>
              </Card>
            </GridItem>
            <GridItem
              className="bg-background-50 p-4 rounded-md text-center"
              _extra={{
                className: "col-span-1",
              }}
            >
              <Card size="lg" variant="filled" className="m-3">
                <Heading size="md" className="mb-1">
                  Quick Start
                </Heading>
                <Text size="sm">
                  Start building your next project in minutes
                </Text>
              </Card>
            </GridItem>
            <GridItem
              className="bg-background-50 p-4 rounded-md text-center"
              _extra={{
                className: "col-span-1",
              }}
            >
              <Card size="lg" variant="filled" className="m-3">
                <Heading size="md" className="mb-1">
                  Quick Start
                </Heading>
                <Text size="sm">
                  Start building your next project in minutes
                </Text>
              </Card>
            </GridItem>
            <GridItem
              className="bg-background-50 p-4 rounded-md text-center"
              _extra={{
                className: "col-span-1",
              }}
            >
              <Card size="lg" variant="filled" className="m-3">
                <Heading size="md" className="mb-1">
                  Quick Start
                </Heading>
                <Text size="sm">
                  Start building your next project in minutes
                </Text>
              </Card>
            </GridItem>
            <GridItem
              className="bg-background-50 p-4 rounded-md text-center"
              _extra={{
                className: "col-span-1",
              }}
            >
              <Card size="lg" variant="filled" className="m-3">
                <Heading size="md" className="mb-1">
                  Quick Start
                </Heading>
                <Text size="sm">
                  Start building your next project in minutes
                </Text>
              </Card>
            </GridItem>
            <GridItem
              className="bg-background-50 p-4 rounded-md text-center"
              _extra={{
                className: "col-span-1",
              }}
            >
              <Card size="lg" variant="filled" className="m-3">
                <Heading size="md" className="mb-1">
                  Quick Start
                </Heading>
                <Text size="sm">
                  Start building your next project in minutes
                </Text>
              </Card>
            </GridItem>
          </Grid>
        </Center>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}
