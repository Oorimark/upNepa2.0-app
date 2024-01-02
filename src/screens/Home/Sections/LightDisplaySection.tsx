import {View, Text, Image} from 'react-native';
import {HomeScreenStyles} from '../../../styles/Screens/HomeStyles';
import {IElectricalParameters} from '../../../types/types';
import {useEffect, useState} from 'react';

/* Voltage threshold limits
 ** Lower Limit: 170
 ** Upper LImit: 230
 */
const LOWER_VOLTAGE_LIMIT = 170;
const UPPER_VOLTAGE_LIMIT = 230;

export default function LightDisplaySection(
  props: IElectricalParameters,
): JSX.Element {
  let [timerMinute, setTimerMinute] = useState<number>(0);
  let [timerHour, setTimerHour] = useState<number>(0);
  const [lightExist, setLightExist] = useState<'light' | 'no-light'>('light');
  const [lightStatus, setLightStatus] = useState<'GOOD' | 'BAD'>('GOOD');
  const [imagePath, setImagePath] = useState<string>('');

  let [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    const {voltage} = props;
    const t = voltage > 0 ? 'light' : 'no-light';
    setLightExist(t);
    setImagePath(`../../../../assets/img/${t}.png`);
    setLightStatus(
      voltage > LOWER_VOLTAGE_LIMIT && voltage < UPPER_VOLTAGE_LIMIT
        ? 'GOOD'
        : 'BAD',
    );
  }, [props.voltage]);

  // timer
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer(timer++);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  //timer watcher
  useEffect(() => {
    if (lightExist === 'no-light') {
      setTimerRunning(true);
      if (timer >= 60) {
        setTimerRunning(false);
        setTimerRunning(true);
        setTimer(0);
        setTimerMinute(timerMinute++);
        if (timerMinute >= 60) {
          setTimerRunning(false);
          setTimerRunning(true);
          setTimerMinute(0);
          setTimerHour(timerHour++);
        }
      }
    } else setTimerRunning(false);
  }, [timer, props.voltage]);

  return (
    <View style={HomeScreenStyles.LightDisplaySectionContainer}>
      {/* Light Status Section */}
      <View style={HomeScreenStyles.LightDisplaySectionLightStatusContainer}>
        <View style={HomeScreenStyles.LightDisplaySectionLightExistContainer}>
          <Image
            source={
              lightExist === 'light'
                ? require(`../../../../assets/img/light.png`)
                : require(`../../../../assets/img/no-light.png`)
            }
          />
          <Text style={HomeScreenStyles.LightDisplaySectionLightExistTextStyle}>
            {lightExist === 'light' ? "There's light" : "There's no light"}
          </Text>
        </View>
        <View
          style={HomeScreenStyles.LightDisplaySectionLightConditionContainer}>
          <View
            style={
              HomeScreenStyles.LightDisplaySectionLightConditionStatusStyle
            }>
            <Text
              style={
                HomeScreenStyles.LightDisplaySectionLightConditionStatusTextStyle
              }>
              Status:
            </Text>
          </View>
          <View style={HomeScreenStyles.LightDisplaySectionLightConditionStyle}>
            <Text
              style={
                HomeScreenStyles.LightDisplaySectionLightConditionTextStyle
              }>
              {lightStatus}
            </Text>
          </View>
        </View>
      </View>

      {/* LIght Duration Section */}
      <View>
        <Text
          style={HomeScreenStyles.LightDisplaySectionLightDurationLabelStyle}>
          Light on for:
        </Text>
        <Text
          style={HomeScreenStyles.LightDisplaySectionLightDurationTimerStyle}>
          {timerHour}h {timerMinute}m {timer}s
        </Text>
      </View>
    </View>
  );
}
