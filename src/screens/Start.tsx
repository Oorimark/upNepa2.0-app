import {Image, Pressable, Text, TextInput, View} from 'react-native';
import {StartScreenStyles} from '../styles/Screens/StartStyles';
import {BaseStyle} from '../styles/Global';
import {pColor30} from '../styles/Colors';
import {Checkbox} from 'react-native-ui-lib';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  HomeNav: {};
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeNav'
>;

export default function StartScreen({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}): JSX.Element {
  return (
    <View style={StartScreenStyles.container}>
      {/* Screen Header Section */}
      <View style={StartScreenStyles.headerContainer}>
        <Image source={require('../../assets/img/up-nepa-logo.png')} />
        <View style={StartScreenStyles.headerTextContainer}>
          <Text style={StartScreenStyles.headerTextMain}>Enter IP Address</Text>
          <Text style={BaseStyle.defaultFont}>
            Provide the IP Address from the hardware
          </Text>
        </View>
      </View>

      {/* Input Ip Address Section */}
      <View style={StartScreenStyles.inputContainer}>
        <TextInput
          placeholder="IP Address"
          keyboardType="numeric"
          style={StartScreenStyles.textInputStyle}
        />
        <View style={StartScreenStyles.checkBoxContainer}>
          <Checkbox
            value={true}
            onValueChange={(_: any) => console.log('Checked')}
            borderRadius={20}
            size={20}
            color={pColor30}
          />
          <Text style={BaseStyle.defaultFont}>Remember IP Address</Text>
        </View>
      </View>

      {/* Proceed Button */}
      <Pressable
        style={StartScreenStyles.buttonStyle}
        onPress={() => navigation.navigate({name: 'HomeNav', params: {}})}>
        <Text style={StartScreenStyles.buttonTextStyle}>Proceed</Text>
      </Pressable>
    </View>
  );
}
