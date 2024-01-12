import {useLayoutEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../screens/Start/Start';
import HomeNav from './HomeNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function AppNavigator() {
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
