export type IElectricalParameters = {
  voltage: number;
  current: number;
};

export type SetElectricParametersAction = {
  type: 'SET_ELECTRIC_PARAMETERS';
  payload: IElectricalParameters;
};
