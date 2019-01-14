import { CONFIGURE } from 'application/state/command/configureMap/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  DEFAULT_LIMIT,
} from 'domain/definitions/configurationMapDefinition';

export const INITIAL_STATE = {
  error: false,
  data: undefined,
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  limit: DEFAULT_LIMIT,
};

export const configureStart = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  const { payload: { latitude, longitude, limit } } = action;

  draft.latitude = latitude || draft.latitude;
  draft.longitude = longitude;
  draft.limit = limit;
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
