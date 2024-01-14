import Icon from 'react-native-vector-icons/FontAwesome6';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {StyleSheet, Text} from 'react-native';

export const screenOptionsHandler = ({
  route,
}: {
  route: RouteProp<ParamListBase, string>;
}) => {
  return {
    tabBarIcon: ({color}: {color: string}) => {
      let iconName;
      if (route.name === 'Logs') {
        iconName = 'ankh';
      } else {
        iconName = 'baby';
      }
      return <Icon name={iconName} color={color} size={20} />;
    },
  };
};

export const tabScreenOptions = (label: string, styles: {tabBarLabel: any}) => {
  return {
    tabBarLabel: (
      <Text style={styles.tabBarLabel}>{label}</Text>
    ) as unknown as string,
  };
};
