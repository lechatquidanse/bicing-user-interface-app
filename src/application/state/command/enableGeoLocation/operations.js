import { ENABLE } from 'application/state/command/enableGeoLocation/types';
import { takeLatest } from 'redux-saga/effects';

export function* enable() {
  yield null;
}

export default function* operation() {
  yield takeLatest(ENABLE.START, enable);
}
