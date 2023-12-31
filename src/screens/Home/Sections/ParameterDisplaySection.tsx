import {View, Text} from 'react-native';
import {HomeScreenStyles} from '../../../styles/Screens/HomeStyles';

export default function ParameterDisplaySection(): JSX.Element {
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
          <Text style={HomeScreenStyles.ParameterDisplayBoxTextStyle}>200</Text>
        </View>
        <View style={HomeScreenStyles.ParameterDisplayBoxStyle}>
          <Text style={HomeScreenStyles.ParameterDisplayBoxLabel}>
            CURRENT (A)
          </Text>
          <Text style={HomeScreenStyles.ParameterDisplayBoxTextStyle}>10</Text>
        </View>
        <View style={HomeScreenStyles.ParameterDisplayBoxStyle}>
          <Text style={HomeScreenStyles.ParameterDisplayBoxLabel}>
            POWER (W)
          </Text>
          <Text style={HomeScreenStyles.ParameterDisplayBoxTextStyle}>
            2000
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
