import HomeScreen from '../screens/Home/Home';
import {useTheme} from 'react-native-paper';
import LogsScreen from '../screens/Logs/Logs';
import {BaseStyle} from '../styles/Global';
import {StyleSheet, Text} from 'react-native';
import {pColor10, pColor30} from '../styles/Colors';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {screenOptionsHandler, tabScreenOptions} from './Func';

const Tab = createMaterialBottomTabNavigator();

export default function HomeNav(): JSX.Element {
  const theme = useTheme();
  theme.colors.background = 'transperent';

  return (
    <Tab.Navigator
      screenOptions={screenOptionsHandler}
      inactiveColor={pColor10}
      activeColor={pColor10}
      barStyle={styles.barStyle}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={() => tabScreenOptions('Home', styles)}
      />
      <Tab.Screen
        name="Logs"
        component={LogsScreen}
        options={() => tabScreenOptions('Logs', styles)}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    textAlign: 'center',
    paddingTop: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  barStyle: {
    paddingVertical: 4,
    marginVertical: 10,
    backgroundColor: pColor30,
    width: '80%',
    alignSelf: 'center',
    ...BaseStyle.defaultFont,
  },
});
