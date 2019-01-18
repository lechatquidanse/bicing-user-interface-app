import { STORE } from 'application/state/command/storeItineraryAt/types';

export const storeStart = itineraryAt => ({
  error: false,
  payload: itineraryAt,
  type: STORE.START,
});

export const storeSuccess = filter => ({
  error: false,
  payload: filter,
  type: STORE.SUCCESS,
});

export const storeFailure = error => ({
  error: true,
  payload: error,
  type: STORE.FAILURE,
});
