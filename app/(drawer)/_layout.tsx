import { Stack } from "expo-router";
import { CustomHeader } from '@/components/CustomHeader';

export default function DrawerLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <CustomHeader />
      }}
    />
  );
}
