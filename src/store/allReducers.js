import {combineReducers} from 'redux';
import {globalReducer} from './globalReducer';
import {pokemonReducer} from '../screens/Home/redux/reducer';
export const allReducers = combineReducers({
  global: globalReducer,
  pokemon: pokemonReducer,
});
