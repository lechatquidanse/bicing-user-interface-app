import { FLOW } from 'application/state/flow/station/types';

export const flowStart = (stationId, byIntervalInPeriodFilter = null) => ({
  error: false,
  meta: { isFetching: true },
  payload: { stationId, byIntervalInPeriodFilter },
  type: FLOW.START,
});
export const flowPending = () => ({
  error: false,
  meta: { isFetching: true },
  type: FLOW.PENDING,
});
export const flowSuccess = () => ({
  error: false,
  meta: { isFetching: false },
  type: FLOW.SUCCESS,
});
export const flowFailure = error => ({
  error: false,
  meta: { isFetching: false },
  payload: error,
  type: FLOW.FAILURE,
});
