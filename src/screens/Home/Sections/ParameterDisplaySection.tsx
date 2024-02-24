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
            {props.current && props.current.toFixed(1)}
          </Text>
        </View>
        <View style={HomeScreenStyles.ParameterDisplayBoxStyle}>
          <Text style={HomeScreenStyles.ParameterDisplayBoxLabel}>
            POWER (W)
          </Text>
          <Text style={HomeScreenStyles.ParameterDisplayBoxTextStyle}>
            {props.power && props.power.toFixed(1)}
          </Text>
        </View>
        <View style={HomeScreenStyles.ParameterDisplayBoxStyle}>
          <Text style={HomeScreenStyles.ParameterDisplayBoxLabel}>
            POWER FACTOR
          </Text>
          <Text style={HomeScreenStyles.ParameterDisplayBoxTextStyle}>0</Text>
        </View>
      </View>
    </View>
  );
}
