import { createReducer } from 'reduxsauce'
import produce from 'immer';

import * as Types from 'application/state/query/lastAvailabilities/types';

export const INITIAL_STATE = { error: false, isFetching: false, lastAvailabilities: [] };

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
}

export default createReducer(INITIAL_STATE, HANDLERS);
