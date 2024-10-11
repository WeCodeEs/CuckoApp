import { SafeAreaView } from 'react-native-safe-area-context';
import MenuScreen from '@/screens/MenuScreen';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MenuScreen />
    </SafeAreaView>
  );
}
