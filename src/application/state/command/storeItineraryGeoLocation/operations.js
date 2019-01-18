import {
  storeFailure,
  storeSuccess,
} from 'application/state/command/storeItineraryGeoLocation/actions';
import { STORE } from 'application/state/command/storeItineraryGeoLocation/types';
import ByItineraryGeoLocationFilter from 'application/state/filter/ByItineraryGeoLocationFilter';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* store(action) {
  const itineraryStep = action.meta;
  const { payload: { latitude, longitude, limit } } = action;

  try {
    const filter = yield call(ByItineraryGeoLocationFilter.fromRawValues,
      latitude,
      longitude,
      limit);

    yield put(storeSuccess(itineraryStep, filter));
  } catch (exception) {
    yield put(storeFailure(itineraryStep, exception));
  }
}

export default function* operation() {
  yield takeLatest(STORE.START, store);
}
