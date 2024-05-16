import {Logger} from '../../utils/utils';
import {useEffect, useState} from 'react';
import {Image, View, Text, FlatList} from 'react-native';
import RecentLogsSection from './Sections/RecentLogsSection';
import {IElectricalParameters, ILog} from '../../types/types';
import {HomeScreenStyles} from '../../styles/Screens/HomeStyles';
import LightDisplaySection from './Sections/LightDisplaySection';
import ParameterDisplaySection from './Sections/ParameterDisplaySection';
import {handleSocketsConnection, handleTimerAndLogUpdates} from './Func';

export default function HomeScreen({navigation}: any): JSX.Element {
  const [dataLogs, setDataLogs] = useState<ILog[]>([]);
  const [initialTime, setInitialTime] = useState<Date>();
  const [retryConnection, setRetryConnection] = useState<boolean>(false);
  const [voltageDataLogger, setVoltageDataLogger] = useState<number[]>([0, 0]);
  const [electricalParameters, setElectricalParameters] =
    useState<IElectricalParameters>({voltage: 0, current: 0, power: 0});

  useEffect(() => {
    (async function () {
      await Logger.log(new Date());
      const fetchedLogs = await Logger.fetchLogs();
      if (fetchedLogs) {
        const logs = fetchedLogs.map((date: Date) =>
          Logger.timeDiffSorter(date),
        );
        setDataLogs([...logs]);
      } else setDataLogs([]);
    })();
  }, [Logger, retryConnection]);

  useEffect(() => {
    handleSocketsConnection(
      electricalParameters,
      setInitialTime,
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
