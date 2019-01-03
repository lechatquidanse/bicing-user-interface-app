import { FETCH } from 'application/state/query/stations/types';

export const fetchStart = (latitude, longitude, limit) => ({
  error: false,
  meta: { isFetching: true },
  payload: { latitude, longitude, limit },
  type: FETCH.START,
});
export const fetchPending = () => ({
  error: false,
  meta: { isFetching: true },
  type: FETCH.PENDING,
});
export const fetchSuccess = data => ({
  error: false,
  meta: { isFetching: false },
  type: FETCH.SUCCESS,
  payload: data,
});
export const fetchFailure = error => ({
  error: true,
  meta: { isFetching: false },
  type: FETCH.FAILURE,
  payload: error,
});
