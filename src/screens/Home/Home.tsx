import {Logger} from '../../utils/utils';
import RecentLogsSection from './Sections/RecentLogsSection';
import {HomeScreenStyles} from '../../styles/Screens/HomeStyles';
import LightDisplaySection from './Sections/LightDisplaySection';
import {IElectricalParameters, ILog} from '../../types/types';
import ParameterDisplaySection from './Sections/ParameterDisplaySection';
import {Image, View, Text, FlatList} from 'react-native';
import {useEffect, useState} from 'react';
import {handleSocketsConnection, handleTimerAndLogUpdates} from './Func';

export default function HomeScreen({navigation}: any): JSX.Element {
  const [dataLogs, setDataLogs] = useState<ILog[]>([]);
  const [initialTime, setInitialTime] = useState<Date>();
  const [retryConnection, setRetryConnection] = useState<boolean>(false);
  const [voltageDataLogger, setVoltageDataLogger] = useState<number[]>([0, 0]);
  const [electricalParameters, setElectricalParameters] =
    useState<IElectricalParameters>({voltage: 0, current: 0, power: 0});

  useEffect(() => {
    console.log('Logs Loggers');
    (async function () {
      const fetchedLogs = await Logger.fetchLogs();
      fetchedLogs ? setDataLogs([...fetchedLogs]) : setDataLogs([]);
    })();
  }, [Logger]);

  useEffect(() => {
    handleSocketsConnection(
      electricalParameters,
      setInitialTime,
      setRetryConnection,
      setVoltageDataLogger,
      setElectricalParameters,
    );
  }, [retryConnection]);

  useEffect(() => {
    handleTimerAndLogUpdates(
      voltageDataLogger,
      dataLogs,
      setDataLogs,
      setInitialTime,
    );
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
            <RecentLogsSection {...{navigation, dataLogs}} />
          </View>
        </View>,
      ]}
      renderItem={({item}) => item}
      style={HomeScreenStyles.listContainer}
    />
  );
}
