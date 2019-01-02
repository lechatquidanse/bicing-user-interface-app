import { FETCH } from 'application/state/query/reverseGeoCode/types';

export const fetchStart = (latitude, longitude) => ({
  error: false,
  meta: { isFetching: true },
  payload: { latitude, longitude },
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
