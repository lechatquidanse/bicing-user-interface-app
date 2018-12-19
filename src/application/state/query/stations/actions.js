import { FETCH } from 'application/state/query/stations/types';

export const fetchStart = (byGeoLocationFilter = null) => ({
  error: false,
  meta: { isFetching: true },
  payload: { byGeoLocationFilter },
  type: FETCH.START,
});
export const fetchPending = () => ({
  error: false,
  meta: { isFetching: true },
  type: FETCH.PENDING,
});
export const fetchCancelled = () => ({
  error: false,
  meta: { isFetching: false },
  type: FETCH.CANCELLED,
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
