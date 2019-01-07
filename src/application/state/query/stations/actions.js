import { FETCH } from 'application/state/query/stations/types';

export const fetchStart = (itineraryStep, latitude, longitude, limit) => ({
  error: false,
  meta: { isFetching: true, itineraryStep },
  payload: { latitude, longitude, limit },
  type: FETCH.START,
});
export const fetchPending = itineraryStep => ({
  error: false,
  meta: { isFetching: true, itineraryStep },
  type: FETCH.PENDING,
});
export const fetchSuccess = (itineraryStep, data) => ({
  error: false,
  meta: { isFetching: false, itineraryStep },
  type: FETCH.SUCCESS,
  payload: data,
});
export const fetchFailure = (itineraryStep, error) => ({
  error: true,
  meta: { isFetching: false, itineraryStep },
  type: FETCH.FAILURE,
  payload: error,
});
