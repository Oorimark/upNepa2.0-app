import {Image, Pressable, Text, TextInput, View} from 'react-native';
import {StartScreenStyles} from '../styles/Screens/StartStyles';
import {BaseStyle} from '../styles/Global';
import {CheckBox} from '@rneui/themed';

export default function StartScreen(): JSX.Element {
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
          <CheckBox
            checked={false}
            disabled
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
          />
          <Text style={BaseStyle.defaultFont}>Remember IP Address</Text>
        </View>
      </View>

      {/* Proceed Button */}
      <Pressable style={StartScreenStyles.buttonStyle}>
        <Text style={StartScreenStyles.buttonTextStyle}>Proceed</Text>
      </Pressable>
    </View>
  );
}
