import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../screens/Start';
import HomeScreen from '../screens/Home/Home';
import HomeNav from './HomeNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

const Stack = createStackNavigator();

export default function AppNav(): JSX.Element {
  const [rememberIP, setRememberIP] = useState<string | null>(null);

  useLayoutEffect(() => {
    (async function () {
      const IPAddress = await AsyncStorage.getItem('localAddress');
      console.log(IPAddress);
      setRememberIP(IPAddress);
    })();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={rememberIP ? 'HomeNav' : 'Start'}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="HomeNav" component={HomeNav} />
    </Stack.Navigator>
  );
}
