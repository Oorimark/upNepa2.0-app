import React from 'react';
import {Logger} from '../../utils/utils';
import io from 'socket.io-client';
import {ToastAndroid} from 'react-native';
import {IElectricalParameters, ILog} from '../../types/types';

let dataTimeout: any;

const url = 'https://upnepa-backend-websocket-server-with-node.onrender.com';

export const handleSocketsConnection = async (
  setInitialTime: React.Dispatch<React.SetStateAction<Date | undefined>>,
  setRetryConnection: React.Dispatch<React.SetStateAction<boolean>>,
  setVoltageDataLogger: React.Dispatch<React.SetStateAction<number[]>>,
  setElectricalParameters: React.Dispatch<
    React.SetStateAction<IElectricalParameters>
  >,
) => {
  const socket = io(url);

  socket.on('connect', () => {
    console.log('WebSocket connected');
    dataTimeout = setTimeout(() => {
      console.log('No data received within timeout period');
      const [current, voltage] = [0, 0];
      setRetryConnection(false);
      setVoltageDataLogger([0, 0]);
      setElectricalParameters({voltage, current, power: voltage * current});
      setInitialTime(undefined);
      // Perform actions when no data is received within the timeout
    }, 5000);
  });

  socket.on('message', data => {
    console.log('data:', data);
    clearTimeout(dataTimeout);
    setTimeout(() => {
      const {voltage, current} = data;
      setRetryConnection(false);
      setVoltageDataLogger(prev => [...prev, voltage]);
      setElectricalParameters({voltage, current, power: voltage * current});
    }, 2000);
  });

  socket.on('disconnect', reason => {
    clearTimeout(dataTimeout);
    setRetryConnection(false);
    console.log('WebSocket disconnected:', reason);
  });

  socket.on('connect_error', error => {
    clearTimeout(dataTimeout);
    const [current, voltage] = [0, 0];
    setRetryConnection(false);
    setVoltageDataLogger([0, 0]);
    setElectricalParameters({voltage, current, power: voltage * current});
    setInitialTime(undefined);
    console.log(error);
  });

  return () => {
    socket.close();
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
