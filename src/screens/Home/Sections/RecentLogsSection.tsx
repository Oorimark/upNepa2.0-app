import {View, Text, Image, Pressable} from 'react-native';
import {HomeScreenStyles} from '../../../styles/Screens/HomeStyles';
import {BaseStyle} from '../../../styles/Global';

type IProps = {
  navigation: any;
  dataLogs: any[];
};

export default function RecentLogsSection(props: IProps): JSX.Element {
  return (
    <View style={HomeScreenStyles.RecentLogsSectionContainer}>
      {/* Section Header */}
      <View style={HomeScreenStyles.RecentLogsSectionHeaderContainer}>
        <Text style={HomeScreenStyles.RecentLogsSectionHeaderLabelStyle}>
          Recent Logs
        </Text>
        <Pressable onPress={() => props.navigation.navigate('Logs')}>
          <Text style={BaseStyle.defaultFont}>See All</Text>
        </Pressable>
      </View>

      {/* Logs Display */}
      <View style={HomeScreenStyles.RecentLogsSectionBoxContainer}>
        {props.dataLogs.map((log, index) => (
          <View key={index} style={HomeScreenStyles.RecentLogsSectionBoxStyle}>
            <View style={HomeScreenStyles.RecentLogsSectionBoxStyleSection}>
              <Image
                source={require('../../../../assets/img/up-nepa-logo.png')}
                style={HomeScreenStyles.RecentLogsSectionBoxImageStyle}
              />
              <Text style={HomeScreenStyles.RecentLogsSectionBoxLogTextStyle}>
                Light was restored by {log.time}
              </Text>
            </View>
            <Text
              style={HomeScreenStyles.RecentLogsSectionBoxDurationTextStyle}>
              {log.timeDiff} ago
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
