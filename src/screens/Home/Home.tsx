import {Image, View, Text, FlatList} from 'react-native';
import LightDisplaySection from './Sections/LightDisplaySection';
import {HomeScreenStyles} from '../../styles/Screens/HomeStyles';
import ParameterDisplaySection from './Sections/ParameterDisplaySection';
import RecentLogsSection from './Sections/RecentLogsSection';
import {IElectricalParameters} from '../../types/types';
import {useEffect, useState} from 'react';
import {Logger} from '../../utils/utils';

const ws = new WebSocket('ws://192.168.4.1/:81');

export default function HomeScreen(): JSX.Element {
  const [initialTime, setInitialTime] = useState<Date>();
  const [electricalParameters, setElectricalParameters] =
    useState<IElectricalParameters>({voltage: 0, current: 0, power: 0});

  useEffect(() => {
    ws.onopen = () => console.log('WebSocket opened');
    ws.onmessage = event => {
      console.log('data: ', JSON.parse(event.data));
      // const {voltage, current} = JSON.parse(event.data);
      // setElectricalParameters({voltage, current, power: voltage * current});
    };
    ws.onclose = event =>
      console.log('WebSocket closed:', event.code, event.reason);
    ws.onerror = error => console.error('WebSocket error:', error.message);
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (electricalParameters) {
      const startingTime = new Date();
      setInitialTime(startingTime);
      Logger.log(startingTime);
    }
  }, [electricalParameters]);

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
          <LightDisplaySection {...{electricalParameters, initialTime}} />

          {/* Parameter Display Section && Recent Logs Section */}
          <View style={HomeScreenStyles.ParameterDisplayParentStyle}>
            <ParameterDisplaySection {...electricalParameters} />
            <RecentLogsSection {...electricalParameters} />
          </View>
        </View>,
      ]}
      renderItem={({item}) => item}
    />
  );
}
