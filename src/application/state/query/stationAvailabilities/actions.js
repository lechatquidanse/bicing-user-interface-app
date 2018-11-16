import * as Types from 'application/state/query/stationAvailabilities/types';

export const fetchStart = (stationId, periodStart, periodEnd, interval) => ({
    type: Types.FETCH.START,
    payload: { stationId, periodStart, periodEnd, interval, isFetching: true }
});
export const fetchPending = () => ({ type: Types.FETCH.PENDING, payload: { isFetching: true } });
export const fetchCancelled = () => ({ type: Types.FETCH.CANCELLED, payload: { isFetching: false } });
export const fetchSuccess = data => ({ type: Types.FETCH.SUCCESS, payload: { data, isFetching: false } });
export const fetchFailure = error => ({ type: Types.FETCH.FAILURE, payload: { error, isFetching: false } });
