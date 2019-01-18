import { FETCH } from 'application/state/query/geoSuggestions/types';

export const fetchStart = () => ({
  error: false,
  meta: { isFetching: false },
  type: FETCH.START,
});
export const fetchPending = () => ({
  error: false,
  meta: { isFetching: true },
  type: FETCH.PENDING,
});
export const fetchSuccess = geoSuggestions => ({
  error: false,
  meta: { isFetching: false },
  type: FETCH.SUCCESS,
  payload: geoSuggestions,
});
export const fetchFailure = error => ({
  error: true,
  meta: { isFetching: false },
  type: FETCH.FAILURE,
  payload: error,
});
