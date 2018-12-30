import { CONFIGURE } from 'application/state/command/configureMap/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
  error: false,
  data: undefined,
  latitude: undefined,
  longitude: undefined,
  limit: undefined,
};

export const configureStart = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.latitude = action.payload.latitude;
  draft.longitude = action.payload.longitude;
  draft.limit = action.payload.limit;
});

export const configureSuccess = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.data = action.payload;
});

export const configureFailure = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.error = true;
  draft.data = action.payload;
});

export const HANDLERS = {
  [CONFIGURE.START]: configureStart,
  [CONFIGURE.SUCCESS]: configureSuccess,
  [CONFIGURE.FAILURE]: configureFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
