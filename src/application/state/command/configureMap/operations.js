import { configureSuccess, configureFailure } from 'application/state/command/configureMap/actions';
import { CONFIGURE } from 'application/state/command/configureMap/types';
import { put, takeLatest } from 'redux-saga/effects';
import ByGeoLocationFilter from 'application/state/filter/ByGeoLocationFilter';

export function* configure(action) {
  try {
    const { latitude, longitude, limit } = action.payload;
    const filter = ByGeoLocationFilter.fromRawValues(latitude, longitude, limit);

    yield put(configureSuccess(filter.zoom()));
  } catch (exception) {
    yield put(configureFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(CONFIGURE.START, configure);
}
