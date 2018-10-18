import { createReducer } from 'reduxsauce'

import * as Types from 'application/state/flow/map/types';

export const INITIAL_STATE = { error: false, stationsWithLastAvailabilities: [] };

export const fetchMapStart = (state = INITIAL_STATE, action) => {
  const { isFetching } = action.payload;
  return { ...state, isFetching };
};

export const fetchMapSuccess = (state = INITIAL_STATE, action) => {
  const { isFetching } = action.payload;
  return { ...state, isFetching };
}

export const HANDLERS = {
  [Types.FETCH_MAP.START]: fetchMapStart,
  [Types.FETCH_MAP.SUCCESS]: fetchMapSuccess,
}

export default createReducer(INITIAL_STATE, HANDLERS);
