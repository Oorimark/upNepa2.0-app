import {View, Text} from 'react-native';
import {HomeScreenStyles} from '../../../styles/Screens/HomeStyles';
import {IElectricalParameters} from '../../../types/types';

export default function ParameterDisplaySection(
  props: IElectricalParameters,
): JSX.Element {
  return (
    <View>
      {/* Section Label */}
      <View>
        <Text style={HomeScreenStyles.ParameterDisplayLabelStyle}>
          Electrical Parameters
        </Text>
      </View>

      {/* Parameter Display */}
      <View style={HomeScreenStyles.ParameterDisplayBoxContainer}>
        <View style={HomeScreenStyles.ParameterDisplayBoxStyle}>
          <Text style={HomeScreenStyles.ParameterDisplayBoxLabel}>
            VOLTAGE (V)
          </Text>
          <Text style={HomeScreenStyles.ParameterDisplayBoxTextStyle}>
            {props.voltage}
          </Text>
        </View>
        <View style={HomeScreenStyles.ParameterDisplayBoxStyle}>
          <Text style={HomeScreenStyles.ParameterDisplayBoxLabel}>
            CURRENT (A)
          </Text>
          <Text style={HomeScreenStyles.ParameterDisplayBoxTextStyle}>
            {props.current}
          </Text>
        </View>
        <View style={HomeScreenStyles.ParameterDisplayBoxStyle}>
          <Text style={HomeScreenStyles.ParameterDisplayBoxLabel}>
            POWER (W)
          </Text>
          <Text style={HomeScreenStyles.ParameterDisplayBoxTextStyle}>
            {props.power}
          </Text>
        </View>
        <View style={HomeScreenStyles.ParameterDisplayBoxStyle}>
          <Text style={HomeScreenStyles.ParameterDisplayBoxLabel}>
            POWER FACTOR
          </Text>
          <Text style={HomeScreenStyles.ParameterDisplayBoxTextStyle}>0.9</Text>
        </View>
      </View>
    </View>
  );
}
