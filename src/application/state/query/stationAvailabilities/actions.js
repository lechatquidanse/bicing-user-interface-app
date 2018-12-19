import { FETCH } from 'application/state/query/stationAvailabilities/types';

export const fetchStart = (stationId, byIntervalInPeriodFilter = null) => ({
  error: false,
  meta: { isFetching: true },
  payload: { stationId, byIntervalInPeriodFilter },
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
