import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../screens/Start';
import HomeScreen from '../screens/Home/Home';
import HomeNav from './HomeNav';

const Stack = createStackNavigator();

export default function clAppNav(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="HomeNav" component={HomeNav} />
    </Stack.Navigator>
  );
}
