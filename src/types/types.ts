export type IElectricalParameters = {
  voltage: number;
  current: number;
  power: number;
};

export type SetElectricParametersAction = {
  type: 'SET_ELECTRIC_PARAMETERS';
  payload: IElectricalParameters;
};

export type IAppState = {
  electricalParameters: Record<string, unknown>;
};

export type ILog = {
  time: Date;
  timeDiff: number;
};
