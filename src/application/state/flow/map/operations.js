import { actions as commandMapActions } from 'application/state/command/map';
import { flowSuccess } from 'application/state/flow/map/actions';
import { FLOW } from 'application/state/flow/map/types';
import {
  actions as queryLastAvailabilitiesActions,
  types as queryLastAvailabilitiesTypes,
} from 'application/state/query/lastAvailabilities';
import {
  actions as queryStationsActions,
  types as queryStationTypes,
} from 'application/state/query/stations';
import { all, put, takeLatest } from 'redux-saga/effects';

export function* initFlow(action) {
  try {
    const { byGeoLocationFilter } = action.payload;

    // @todo add check if byGeolocationFilter is well formatted
    yield all([
      put(queryStationsActions.fetchStart(byGeoLocationFilter)),
      put(queryLastAvailabilitiesActions.fetchStart()),
      put(commandMapActions.displayStart(byGeoLocationFilter)),
    ]);
  } catch (exception) {
    //  @todo do something with exception
  }
}

export function* dataFetched() {
  try {
    yield put(flowSuccess());
  } catch (exception) {
    //  @todo do something with exception
  }
}

export default function* operation() {
  yield takeLatest(FLOW.START, initFlow);

  yield all({
    stationsSuccess: takeLatest(queryStationTypes.FETCH.SUCCESS, dataFetched),
    lastAvailabilitiesSuccess: takeLatest(queryLastAvailabilitiesTypes.FETCH.SUCCESS, dataFetched),
  });
}
