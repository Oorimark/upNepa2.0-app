import {View, Text, Image} from 'react-native';
import {HomeScreenStyles} from '../../../styles/Screens/HomeStyles';
import {BaseStyle} from '../../../styles/Global';
import {useEffect, useState} from 'react';
import {IElectricalParameters} from '../../../types/types';
import {Logger} from '../../../utils/utils';

export default function RecentLogsSection(
  props: IElectricalParameters,
): JSX.Element {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      setLogs([...JSON.parse(await Logger.fetchLogs())]);
    })();
  }, [props.voltage]);

  return (
    <View style={HomeScreenStyles.RecentLogsSectionContainer}>
      {/* Section Header */}
      <View style={HomeScreenStyles.RecentLogsSectionHeaderContainer}>
        <Text style={HomeScreenStyles.RecentLogsSectionHeaderLabelStyle}>
          Recent Logs
        </Text>
        <Text style={BaseStyle.defaultFont}>See All</Text>
      </View>

      {/* Logs Display */}
      <View style={HomeScreenStyles.RecentLogsSectionBoxContainer}>
        {logs.map((log, index) => (
          <View key={index} style={HomeScreenStyles.RecentLogsSectionBoxStyle}>
            <View style={HomeScreenStyles.RecentLogsSectionBoxStyleSection}>
              <Image
                source={require('../../../../assets/img/up-nepa-logo.png')}
                style={HomeScreenStyles.RecentLogsSectionBoxImageStyle}
              />
              <Text style={HomeScreenStyles.RecentLogsSectionBoxLogTextStyle}>
                Light was restored by {log.restoredTime}
              </Text>
            </View>
            <Text
              style={HomeScreenStyles.RecentLogsSectionBoxDurationTextStyle}>
              2hrs ago
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
