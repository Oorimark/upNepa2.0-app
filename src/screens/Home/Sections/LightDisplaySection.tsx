import {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {IElectricalParameters} from '../../../types/types';
import {HomeScreenStyles} from '../../../styles/Screens/HomeStyles';

// Voltage threshold limits
// Lower Limit: 170
// Upper LImit: 230

const LOWER_VOLTAGE_LIMIT = 170;
const UPPER_VOLTAGE_LIMIT = 230;

type IProps = {
  electricalParameters: IElectricalParameters;
  initialTime: Date | undefined;
};

export default function LightDisplaySection(props: IProps): JSX.Element {
  const [timer, setTimer] = useState(0);
  const [timerMinute, setTimerMinute] = useState<number>(0);
  const [timerHour, setTimerHour] = useState<number>(0);
  const [lightExist, setLightExist] = useState<boolean>(false);
  const [lightStatus, setLightStatus] = useState<'GOOD' | 'BAD'>('GOOD');

  useEffect(() => {
    const {voltage} = props.electricalParameters;
    const r = voltage > 0;
    setLightExist(r);
    setLightStatus(
      voltage && voltage > LOWER_VOLTAGE_LIMIT && voltage < UPPER_VOLTAGE_LIMIT
        ? 'GOOD'
        : 'BAD',
    );
  }, [props.electricalParameters]);

  // timer
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    const initialTime = props.initialTime;
    if (initialTime && props.electricalParameters.voltage) {
      interval = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - initialTime.getTime();
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
        );
        setTimer(seconds);
        seconds >= 60 || setTimerMinute(minutes);
        minutes >= 60 || setTimerHour(hours);
      }, 1000);
    } else {
      // Reset timer
      setTimerHour(0);
      setTimerMinute(0);
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [props.initialTime]);

  return (
    <View style={HomeScreenStyles.LightDisplaySectionContainer}>
      {/* Light Status Section */}
      <View style={HomeScreenStyles.LightDisplaySectionLightStatusContainer}>
        <View style={HomeScreenStyles.LightDisplaySectionLightExistContainer}>
          <Image
            source={
              lightExist
                ? require(`../../../../assets/img/light.png`)
                : require(`../../../../assets/img/no-light.png`)
            }
          />
          <Text style={HomeScreenStyles.LightDisplaySectionLightExistTextStyle}>
            {lightExist ? "There's light" : "There's no light"}
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
          <View
            style={[
              HomeScreenStyles.LightDisplaySectionLightConditionStyle,
              lightStatus === 'BAD' && {backgroundColor: '#FFBEBA'},
            ]}>
            <Text
              style={[
                HomeScreenStyles.LightDisplaySectionLightConditionTextStyle,
                lightStatus === 'BAD' && {color: '#FF4F18'},
              ]}>
              {props.electricalParameters.voltage ? lightStatus : '--'}
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
