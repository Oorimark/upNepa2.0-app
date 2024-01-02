import {SetElectricParametersAction} from '../types/types';
import {SET_ELECTRIC_PARAMETERS} from './actions';

const initialState = {
  electricalParameters: {},
};

export const userReducer = (
  state = initialState,
  action: SetElectricParametersAction,
) => {
  switch (action.type) {
    case SET_ELECTRIC_PARAMETERS:
      return {...state, electricalParameters: action.payload};
  }
};
