import {View, Text, Image} from 'react-native';
import {HomeScreenStyles} from '../../../styles/Screens/HomeStyles';

export default function LightDisplaySection(): JSX.Element {
  return (
    <View style={HomeScreenStyles.LightDisplaySectionContainer}>
      <View style={HomeScreenStyles.LightDisplaySectionLightStatusContainer}>
        <View style={HomeScreenStyles.LightDisplaySectionLightExistContainer}>
          <Image source={require('../../../../assets/img/light.png')} />
          <Text style={HomeScreenStyles.LightDisplaySectionLightExistTextStyle}>
            There's light
          </Text>
        </View>
        <View
          style={HomeScreenStyles.LightDisplaySectionLightConditionContainer}>
          <View
            style={
              HomeScreenStyles.LightDisplaySectionLightConditionStatusStyle
            }>
            <Text
              style={
                HomeScreenStyles.LightDisplaySectionLightConditionStatusTextStyle
              }>
              Status:
            </Text>
          </View>
          <View style={HomeScreenStyles.LightDisplaySectionLightConditionStyle}>
            <Text
              style={
                HomeScreenStyles.LightDisplaySectionLightConditionTextStyle
              }>
              GOOD
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text
          style={HomeScreenStyles.LightDisplaySectionLightDurationLabelStyle}>
          Light on for:
        </Text>
        <Text
          style={HomeScreenStyles.LightDisplaySectionLightDurationTimerStyle}>
          5m 43s
        </Text>
      </View>
    </View>
  );
}
