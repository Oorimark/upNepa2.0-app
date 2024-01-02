import {applyMiddleware, combineReducers, createStore} from 'redux';
import {userReducer} from './reducers';
import thunk from 'redux-thunk';
import {IAppState, SetElectricParametersAction} from '../types/types';

// type RootState = {
//   userReducer: (
//     state: IAppState | undefined,
//     action: SetElectricParametersAction,
//   ) => IAppState;
// };

const rootReducer = combineReducers({userReducer});
export type RootState = ReturnType<typeof rootReducer>;
export const Store = createStore(rootReducer, applyMiddleware(thunk));
