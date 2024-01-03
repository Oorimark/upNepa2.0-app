import {Image, View, Text, FlatList} from 'react-native';
import LightDisplaySection from './Sections/LightDisplaySection';
import {HomeScreenStyles} from '../../styles/Screens/HomeStyles';
import ParameterDisplaySection from './Sections/ParameterDisplaySection';
import RecentLogsSection from './Sections/RecentLogsSection';
import {IElectricalParameters} from '../../types/types';
import {useEffect, useLayoutEffect, useState} from 'react';
import {Logger} from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ws = new WebSocket('ws://192.168.4.1:81/');

export default function HomeScreen({navigation}: any): JSX.Element {
  const [initialTime, setInitialTime] = useState<Date>();
  const [voltageDataLogger, setVoltageDataLogger] = useState<number[]>([]);
  const [retryConnection, setRetryConnection] = useState<boolean>(false);
  const [dataLogs, setDataLogs] = useState<any[]>([]);
  const [electricalParameters, setElectricalParameters] =
    useState<IElectricalParameters>({voltage: 0, current: 0, power: 0});

  useLayoutEffect(() => {
    (async function () {
      const fetchedLogs = await Logger.fetchLogs();
      fetchedLogs && setDataLogs([...fetchedLogs]);
    });
  }, []);

  useEffect(() => {
    ws.onopen = () => console.log('WebSocket opened');
    ws.onmessage = event => {
      console.log('data: ', JSON.parse(event.data));
      setTimeout(() => {
        setRetryConnection(false);
        const {voltage, current} = JSON.parse(event.data);
        setElectricalParameters({voltage, current, power: voltage * current});
        setVoltageDataLogger(prev => [...prev, voltage]);
      }, 3000);
    };
    ws.onclose = event => {
      setRetryConnection(true);
      console.log('WebSocket closed:', event.code, event.reason);
    };
    ws.onerror = error => {
      console.error('WebSocket error:', error.message);
      let voltage = 0;
      let current = 0;
      setElectricalParameters({voltage, current, power: voltage * current});
      setRetryConnection(false);
    };
    return () => {
      ws.close();
      setRetryConnection(false);
    };
  }, [retryConnection]);

  useEffect(() => {
    console.log('Voltage Logger: ', voltageDataLogger);
    if (electricalParameters.voltage === 0) {
      const startingTime = new Date();
      const newLog = Logger.createLog(startingTime);
      setDataLogs([...dataLogs, newLog]);
      setInitialTime(startingTime);
    }
  }, [electricalParameters]);

  return (
    <FlatList
      refreshing={retryConnection}
      onRefresh={() => setRetryConnection(true)}
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
            <RecentLogsSection
              {...{electricalParameters, navigation, dataLogs}}
            />
          </View>
        </View>,
      ]}
      renderItem={({item}) => item}
      style={HomeScreenStyles.listContainer}
    />
  );
}
