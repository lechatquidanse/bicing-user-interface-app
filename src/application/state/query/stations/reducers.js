import { FETCH } from 'application/state/query/stations/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
  data: undefined,
  error: false,
  isFetching: false,
  latitude: undefined,
  longitude: undefined,
  limit: undefined,
};

export const fetchStart = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.isFetching = action.meta.isFetching;
  draft.latitude = action.payload.latitude;
  draft.longitude = action.payload.longitude;
  draft.limit = action.payload.limit;
});

export const fetchPending = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.isFetching = action.meta.isFetching;
});

export const fetchSuccess = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.data = action.payload;
  draft.isFetching = action.meta.isFetching;
});

export const fetchFailure = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.data = action.payload;
  draft.error = action.error;
  draft.isFetching = action.meta.isFetching;
});

const HANDLERS = {
  [FETCH.START]: fetchStart,
  [FETCH.PENDING]: fetchPending,
  [FETCH.SUCCESS]: fetchSuccess,
  [FETCH.FAILURE]: fetchFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
