import React from 'react';
import io from 'socket.io-client';
import {Logger} from '../../utils/utils';
import {IElectricalParameters, ILog} from '../../types/types';

const SOCKET_TIMEOUT_PERIOD: number = 3000; // milli-seconds
const SOCKET_URL: string =
  'https://upnepa-backend-websocket-server-with-node.onrender.com';

const socket = io(SOCKET_URL);

let dataTimeout: any;
let dataInterval: any;

export const handleSocketsConnection = async (
  electricalParameters: IElectricalParameters,
  setInitialTime: React.Dispatch<React.SetStateAction<Date | undefined>>,
  setVoltageDataLogger: React.Dispatch<React.SetStateAction<number[]>>,
  setElectricalParameters: React.Dispatch<
    React.SetStateAction<IElectricalParameters>
  >,
) => {
  socket.on('connect', () => {
    console.log('WebSocket connected');
    dataTimeout = setTimeout(
      () =>
        (dataInterval = setInterval(() => {
          console.log('No data received within timeout period');
          if (electricalParameters.voltage !== 0)
            handleResetOnWebSocktDisconnectActions(
              setInitialTime,
              setVoltageDataLogger,
              setElectricalParameters,
            );
        }, SOCKET_TIMEOUT_PERIOD)),
      SOCKET_TIMEOUT_PERIOD,
    );
  });

  socket.on('message', data => {
    console.log('data:', data);
    clearInterval(dataInterval);
    clearTimeout(dataTimeout);
    const {voltage, current} = data;
    setVoltageDataLogger(prev => [...prev, voltage]);
    setElectricalParameters({voltage, current, power: voltage * current});
  });

  socket.on('disconnect', reason => {
    if (electricalParameters.voltage !== 0)
      handleResetOnWebSocktDisconnectActions(
        setInitialTime,
        setVoltageDataLogger,
        setElectricalParameters,
      );
    console.log('WebSocket disconnected:', reason);
  });

  socket.on('connect_error', error => {
    console.log('Connection Error: ', error);
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

const handleResetOnWebSocktDisconnectActions = (
  setInitialTime: React.Dispatch<React.SetStateAction<Date | undefined>>,
  setVoltageDataLogger: React.Dispatch<React.SetStateAction<number[]>>,
  setElectricalParameters: React.Dispatch<
    React.SetStateAction<IElectricalParameters>
  >,
) => {
  const voltage = 0,
    current = 0;

  const newElectricalParameter = {
    voltage,
    current,
    power: voltage * current,
  };

  setVoltageDataLogger([0, 0]); // Reset logger
  setElectricalParameters(newElectricalParameter);
  setInitialTime(new Date());
};
