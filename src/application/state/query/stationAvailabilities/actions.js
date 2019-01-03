import { FETCH } from 'application/state/query/stationAvailabilities/types';

export const fetchStart = (stationId, periodStart, periodEnd, interval) => ({
  error: false,
  meta: { isFetching: true },
  payload: {
    stationId, periodStart, periodEnd, interval,
  },
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
