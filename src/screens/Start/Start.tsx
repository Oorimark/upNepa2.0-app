import {useState} from 'react';
import {BaseStyle} from '../../styles/Global';
import {pColor30} from '../../styles/Colors';
import {Checkbox} from 'react-native-ui-lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import {StartScreenStyles} from '../../styles/Screens/StartStyles';
import {HomeScreenNavigationProp} from '../../types/types';
import {Logger} from '../../utils/utils';

export default function StartScreen({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}): JSX.Element {
  const [inputText, setInputText] = useState('');
  const [toggledCheckbox, setToggledCheckbox] = useState(false);

  const handleProceed = async () => {
    const IPAddress = await AsyncStorage.getItem('localAddress');
    if (inputText || IPAddress) {
      toggledCheckbox &&
        (await AsyncStorage.setItem('localAddress', inputText));
    }
    navigation.navigate({name: 'HomeNav', params: {}});
  };

  return (
    <View style={StartScreenStyles.container}>
      {/* Screen Header Section */}
      <View style={StartScreenStyles.headerContainer}>
        <Image source={require('../../../assets/img/up-nepa-logo.png')} />
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
          onChangeText={text => setInputText(text)}
          style={StartScreenStyles.textInputStyle}
        />
        <View style={StartScreenStyles.checkBoxContainer}>
          <Checkbox
            value={toggledCheckbox}
            onValueChange={_ => setToggledCheckbox(!toggledCheckbox)}
            borderRadius={20}
            size={20}
            color={pColor30}
          />
          <Text style={BaseStyle.defaultFont}>Remember IP Address</Text>
        </View>
      </View>

      {/* Proceed Button */}
      <Pressable style={StartScreenStyles.buttonStyle} onPress={handleProceed}>
        <Text style={StartScreenStyles.buttonTextStyle}>Proceed</Text>
      </Pressable>
    </View>
  );
}
