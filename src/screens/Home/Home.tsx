import {Image, View, Text, FlatList, ToastAndroid} from 'react-native';
import LightDisplaySection from './Sections/LightDisplaySection';
import {HomeScreenStyles} from '../../styles/Screens/HomeStyles';
import ParameterDisplaySection from './Sections/ParameterDisplaySection';
import RecentLogsSection from './Sections/RecentLogsSection';
import {IElectricalParameters} from '../../types/types';
import {useEffect, useLayoutEffect, useState} from 'react';
import {Logger} from '../../utils/utils';

export default function HomeScreen({navigation}: any): JSX.Element {
  const [initialTime, setInitialTime] = useState<Date>();
  const [voltageDataLogger, setVoltageDataLogger] = useState<number[]>([0, 0]);
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
    const ws = new WebSocket('ws://192.168.4.1:81/');

    ws.onopen = () => console.log('WebSocket opened');
    ws.onmessage = event => {
      console.log('data: ', JSON.parse(event.data));
      setTimeout(() => {
        const {voltage, current} = JSON.parse(event.data);
        setRetryConnection(false);
        setVoltageDataLogger(prev => [...prev, voltage]);
        setElectricalParameters({voltage, current, power: voltage * current});
      }, 2000);
    };
    ws.onclose = event => {
      setRetryConnection(false);
      console.log('WebSocket closed:', event.code, event.reason);
    };
    ws.onerror = error => {
      const [current, voltage] = [0, 0];
      setRetryConnection(false);
      setVoltageDataLogger([0, 0]);
      setElectricalParameters({voltage, current, power: voltage * current});
      ToastAndroid.show(
        'IP Address provided is invalid. Please check if WIFI is connected to the hardware if issue persist',
        ToastAndroid.LONG,
      );
    };
    return () => {
      ws.close();
    };
  }, [retryConnection]);

  useEffect(() => {
    const lastTwoValues = voltageDataLogger.slice(-2);
    const [voltage1, voltage2] = lastTwoValues;
    // checks if there's a change from no-light to light
    if (voltage1 === 0 && voltage2 > 0) {
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
