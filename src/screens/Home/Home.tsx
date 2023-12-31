import {Image, View, Text} from 'react-native';
import LightDisplaySection from './Sections/LightDisplaySection';
import {HomeScreenStyles} from '../../styles/Screens/HomeStyles';
import ParameterDisplaySection from './Sections/ParameterDisplaySection';

export default function HomeScreen(): JSX.Element {
  return (
    <View style={HomeScreenStyles.container}>
      {/* Screen Header Section */}
      <View style={HomeScreenStyles.headerContainer}>
        <Image
          source={require('../../../assets/img/up-nepa-logo.png')}
          style={HomeScreenStyles.headerImageStyle}
        />
        <Text style={HomeScreenStyles.headerText}>Welcome Back</Text>
      </View>

      {/* Light Display Section */}
      <LightDisplaySection />

      {/* Parameter Display Section && Recent Logs Section */}
      <View style={HomeScreenStyles.ParameterDisplayParentStyle}>
        <ParameterDisplaySection />
      </View>
    </View>
  );
}
