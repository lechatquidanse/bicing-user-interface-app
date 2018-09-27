import { createReducer, Types as ReduxSauceTypes } from 'reduxsauce'
import Immutable from 'seamless-immutable';

import * as Types from "./types";

export const INITIAL_STATE = Immutable({ error: false, isFetching: false, lastAvailabilities: [] });

export const fetchListStart = (state = INITIAL_STATE, action) => {
  const { isFetching } = action.payload;
  return { ...state, isFetching };
};

export const fetchListSuccess = (state = INITIAL_STATE, action) => {
  const { isFetching, data } = action.payload;
  return { ...state, isFetching, lastAvailabilities: data['hydra:member'] };
}

export const defaultHandler = (state, action) => {
  return { ...state };
}

export const HANDLERS = {
  [Types.FETCH_LIST.START]: fetchListStart,
  [Types.FETCH_LIST.SUCCESS]: fetchListSuccess,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
}

export default createReducer(INITIAL_STATE, HANDLERS);
