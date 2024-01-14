import React from 'react';
import {Logger} from '../../utils/utils';
import {ToastAndroid} from 'react-native';
import {IElectricalParameters, ILog} from '../../types/types';

export const handleSocketsConnection = (
  setInitialTime: React.Dispatch<React.SetStateAction<Date | undefined>>,
  setRetryConnection: React.Dispatch<React.SetStateAction<boolean>>,
  setVoltageDataLogger: React.Dispatch<React.SetStateAction<number[]>>,
  setElectricalParameters: React.Dispatch<
    React.SetStateAction<IElectricalParameters>
  >,
) => {
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
  ws.onerror = ___ => {
    const [current, voltage] = [0, 0];
    setRetryConnection(false);
    setVoltageDataLogger([0, 0]);
    setElectricalParameters({voltage, current, power: voltage * current});
    setInitialTime(undefined);
    ToastAndroid.show(
      'IP Address provided is invalid. Please check if WIFI is connected to the hardware if issue persist',
      ToastAndroid.LONG,
    );
  };
  return () => {
    ws.close();
  };
};

export const handleTimerAndLogUpdates = async (
  voltageDataLogger: number[],
  dataLogs: ILog[],
  setDataLogs: React.Dispatch<React.SetStateAction<ILog[]>>,
  setInitialTime: React.Dispatch<React.SetStateAction<Date | undefined>>,
) => {
  const lastTwoValues = voltageDataLogger.slice(-2);
  const [voltage1, voltage2] = lastTwoValues;
  // checks if there's a change from no-light to light
  if (voltage1 === 0 && voltage2 > 0) {
    const startingTime = new Date();
    await Logger.log(startingTime);
    setDataLogs([...dataLogs, Logger.createLog(startingTime)]);
    setInitialTime(startingTime);
  }
};
