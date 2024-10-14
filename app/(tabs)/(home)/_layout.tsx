import { SafeAreaView } from "react-native-safe-area-context";
import MenuScreen  from '@/screens/MenuScreen'


export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, padding: -60}}>
      <MenuScreen />
    </SafeAreaView>
  );
}
