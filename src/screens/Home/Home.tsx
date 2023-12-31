import {Image, View, Text} from 'react-native';
import LightDisplaySection from './Sections/LightDisplaySection';
import {HomeScreenStyles} from '../../styles/Screens/HomeStyles';

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
    </View>
  );
}
