import { storeFailure, storeSuccess } from 'application/state/command/storeItineraryAt/actions';
import { STORE } from 'application/state/command/storeItineraryAt/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import ByItineraryAtFilterFactory from 'application/state/filter/ByItineraryAtFilterFactory';

export function* store(action) {
  try {
    const filter = yield call(ByItineraryAtFilterFactory.create, action.payload);

    yield put(storeSuccess(filter));
  } catch (exception) {
    yield put(storeFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(STORE.START, store);
}
