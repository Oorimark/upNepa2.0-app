import {Image, View, Text, FlatList} from 'react-native';
import LightDisplaySection from './Sections/LightDisplaySection';
import {HomeScreenStyles} from '../../styles/Screens/HomeStyles';
import ParameterDisplaySection from './Sections/ParameterDisplaySection';
import RecentLogsSection from './Sections/RecentLogsSection';

export default function HomeScreen(): JSX.Element {
  return (
    <FlatList
      data={[
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
            <RecentLogsSection />
          </View>
        </View>,
      ]}
      renderItem={({item}) => item}
    />
  );
}
