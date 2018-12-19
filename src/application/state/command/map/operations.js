import { displaySuccess } from 'application/state/command/map/actions';
import { DISPLAY } from 'application/state/command/map/types';
import { put, takeLatest } from 'redux-saga/effects';

export function* display() {
  // const { byGeoLocationFilter } = action.payload;
  // @todo add check if filter well formatted otherwise put displayError

  yield put(displaySuccess());
}

export default function* operation() {
  yield takeLatest(DISPLAY.START, display);
}
