import { STORE } from 'application/state/command/storeItineraryGeoLocation/types';

export const storeStart = (itineraryStep, latitude, longitude, limit) => ({
  error: false,
  meta: itineraryStep,
  payload: { latitude, longitude, limit },
  type: STORE.START,
});

export const storeSuccess = (itineraryStep, filter) => ({
  error: false,
  meta: itineraryStep,
  payload: filter,
  type: STORE.SUCCESS,
});

export const storeFailure = (itineraryStep, error) => ({
  error: true,
  meta: itineraryStep,
  payload: error,
  type: STORE.FAILURE,
});
