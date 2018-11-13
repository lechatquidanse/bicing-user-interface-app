import { createReducer } from 'reduxsauce'
import produce from 'immer';

import * as Types from 'application/state/query/stationAvailabilities/types';

export const INITIAL_STATE = { error: false, stationAvailabilities: [] };

export const fetchStart = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.payload = action.payload
  });
};

export const fetchSuccess = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.stationAvailabilities = action.payload.data
  });
}

export const fetchFailure = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.error = action.payload.error
  });
}

export const defaultHandler = (state, action) => {
  return { ...state };
}

const HANDLERS = {
  [Types.FETCH.START]: fetchStart,
  [Types.FETCH.SUCCESS]: fetchSuccess,
  [Types.FETCH.FAILURE]: fetchFailure,
}

export default createReducer(INITIAL_STATE, HANDLERS);
