import { FETCH } from 'application/state/query/availabilities/types';

export const fetchStart = (
  periodStart = null,
  periodEnd = null,
  interval = null,
  ...stationIds
) => ({
  error: false,
  meta: { isFetching: true },
  payload: {
    periodStart, periodEnd, interval, stationIds,
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
