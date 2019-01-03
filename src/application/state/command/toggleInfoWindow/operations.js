import { TOGGLE } from 'application/state/command/toggleInfoWindow/types';
import { takeLatest } from 'redux-saga/effects';

export function* toggle() {
  yield null;
}

export default function* operation() {
  yield takeLatest(TOGGLE.START, toggle);
}
