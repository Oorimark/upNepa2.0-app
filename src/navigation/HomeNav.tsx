import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {pColor10, pColor30} from '../styles/Colors';
import {BaseStyle} from '../styles/Global';
import HomeScreen from '../screens/Home/Home';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import LogsScreen from '../screens/Logs/Logs';

const Tab = createMaterialBottomTabNavigator();

export default function HomeNav(): JSX.Element {
  const theme = useTheme();
  theme.colors.background = 'transperent';

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;
          if (route.name === 'Logs') {
            iconName = 'ankh';
          } else {
            iconName = 'baby';
          }
          return <Icon name={iconName} color={color} size={20} />;
        },
      })}
      inactiveColor={pColor10}
      activeColor={pColor10}
      barStyle={{
        paddingVertical: 4,
        marginVertical: 10,
        backgroundColor: pColor30,
        width: '80%',
        alignSelf: 'center',
        ...BaseStyle.defaultFont,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: (
            <Text style={styles.tabBarLabel}>Home</Text>
          ) as unknown as string,
        }}
      />
      <Tab.Screen
        name="Logs"
        component={LogsScreen}
        options={{
          tabBarLabel: (
            <Text style={styles.tabBarLabel}>Logs</Text>
          ) as unknown as string,
        }}
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
});
