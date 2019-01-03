import { CONFIGURE } from 'application/state/command/configureMap/types';

export const configureStart = (latitude, longitude, limit) => ({
  error: false,
  payload: { latitude, longitude, limit },
  type: CONFIGURE.START,
});

export const configureSuccess = data => ({
  error: false,
  payload: data,
  type: CONFIGURE.SUCCESS,
});

export const configureFailure = error => ({
  error: true,
  payload: error,
  type: CONFIGURE.FAILURE,
});
