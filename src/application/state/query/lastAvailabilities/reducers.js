import { createReducer } from 'reduxsauce'
import produce from 'immer';

import * as Types from 'application/state/query/lastAvailabilities/types';

export const INITIAL_STATE = { error: false, lastAvailabilities: [] };

export const fetchListStart = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.payload = action.payload
  });
};

export const fetchListSuccess = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.lastAvailabilities = action.payload.data
  });
}

export const fetchListFailure = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.error = action.payload.error
  });
}

export const defaultHandler = (state, action) => {
  return { ...state };
}

const HANDLERS = {
  [Types.FETCH_LIST.START]: fetchListStart,
  [Types.FETCH_LIST.SUCCESS]: fetchListSuccess,
  [Types.FETCH_LIST.FAILURE]: fetchListFailure,
}

export default createReducer(INITIAL_STATE, HANDLERS);
