import { createReducer } from 'reduxsauce'
import produce from 'immer';

import * as Types from 'application/state/query/stations/types';

export const INITIAL_STATE = { error: null, data: null, payload: { isFetching: false } };

export const fetchListStart = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.payload = action.payload;
  });
};

export const fetchListSuccess = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.data = action.payload.data;
    draft.payload.isFetching = action.payload.isFetching;
  });
}

export const fetchListFailure = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.error = action.payload.error;
    draft.payload.isFetching = action.payload.isFetching;
  });
}

const HANDLERS = {
  [Types.FETCH_LIST.START]: fetchListStart,
  [Types.FETCH_LIST.SUCCESS]: fetchListSuccess,
  [Types.FETCH_LIST.FAILURE]: fetchListFailure,
}

export default createReducer(INITIAL_STATE, HANDLERS);
