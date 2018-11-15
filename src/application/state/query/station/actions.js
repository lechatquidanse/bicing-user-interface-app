import * as Types from 'application/state/query/station/types';

export const fetchStart = (stationId) => ({ type: Types.FETCH.START, payload: { stationId } });
export const fetchPending = () => ({ type: Types.FETCH.PENDING, payload: {} });
export const fetchCancelled = () => ({ type: Types.FETCH.CANCELLED, payload: {} });
export const fetchSuccess = data => ({ type: Types.FETCH.SUCCESS, payload: { data } });
export const fetchFailure = error => ({ type: Types.FETCH.FAILURE, payload: { error } });
