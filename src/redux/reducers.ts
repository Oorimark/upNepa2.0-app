import {
  IAppState,
  IElectricalParameters,
  SetElectricParametersAction,
} from '../types/types';
import {SET_ELECTRIC_PARAMETERS} from './actions';

const initialState: any = {
  electricalParameters: {},
};

export const userReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case SET_ELECTRIC_PARAMETERS:
      return {...state, electricalParameters: action.payload};
  }
};
