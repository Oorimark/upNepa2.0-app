import {Dispatch} from 'redux';
import {
  IElectricalParameters,
  SetElectricParametersAction,
} from '../types/types';

export const SET_ELECTRIC_PARAMETERS = 'SET_ELECTRIC_PARAMETERS';

export const setElectricalParameters =
  (parameters: IElectricalParameters) =>
  (dispatch: Dispatch<SetElectricParametersAction>) => {
    dispatch({
      type: SET_ELECTRIC_PARAMETERS,
      payload: parameters,
    });
  };
