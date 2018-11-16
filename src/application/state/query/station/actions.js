import * as Types from 'application/state/query/station/types';

export const fetchStart = (stationId) => ({ type: Types.FETCH.START, payload: { stationId, isFetching: true } });
export const fetchPending = () => ({ type: Types.FETCH.PENDING, payload: { isFetching: true } });
export const fetchCancelled = () => ({ type: Types.FETCH.CANCELLED, payload: { isFetching: false } });
export const fetchSuccess = data => ({ type: Types.FETCH.SUCCESS, payload: { data, isFetching: false } });
export const fetchFailure = error => ({ type: Types.FETCH.FAILURE, payload: { error, isFetching: false } });
