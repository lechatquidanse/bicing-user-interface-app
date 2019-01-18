import { STORE } from 'application/state/command/storeItineraryStepActive/types';
import { takeLatest } from 'redux-saga/effects';

export function* store() {
  yield null;
}

export default function* operation() {
  yield takeLatest(STORE.START, store);
}
