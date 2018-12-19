import { FLOW } from 'application/state/flow/map/types';

export const flowStart = (byGeoLocationFilter = null) => ({
  error: false,
  meta: { isFetching: true },
  payload: { byGeoLocationFilter },
  type: FLOW.START,
});

export const flowSuccess = () => ({
  error: false,
  meta: { isFetching: false },
  type: FLOW.SUCCESS,
});

export const flowFailure = error => ({
  data: error,
  error: true,
  meta: { isFetching: false },
  type: FLOW.FAILURE,
});
