import { flowSuccess } from 'application/state/flow/station/actions';
import { FLOW } from 'application/state/flow/station/types';
import {
  actions as queryStationActions,
  types as QUERY_STATION_TYPES,
} from 'application/state/query/station';
import {
  actions as queryStationAvailabilitiesActions,
  types as QUERY_STATION_AVAILABILITIES_TYPES,
} from 'application/state/query/stationAvailabilities';
import {
  all, put, race, takeLatest,
} from 'redux-saga/effects';

export function* initFlow(action) {
  try {
    const { stationId, byIntervalInPeriodFilter } = action.payload;

    yield all([
      put(queryStationActions.fetchStart(stationId)),
      put(queryStationAvailabilitiesActions.fetchStart(stationId, byIntervalInPeriodFilter)),
    ]);
  } catch (exception) {
    // @todo log exception
  }
}

export function* dataFetched() {
  try {
    yield put(flowSuccess());
  } catch (exception) {
    // @todo log exception
  }
}

export default function* operation() {
  yield takeLatest(FLOW.START, initFlow);
  yield race({
    station: takeLatest(QUERY_STATION_TYPES.FETCH.SUCCESS, dataFetched),
    stationAvailabilities: takeLatest(
      QUERY_STATION_AVAILABILITIES_TYPES.FETCH.SUCCESS,
      dataFetched,
    ),
  });
}
