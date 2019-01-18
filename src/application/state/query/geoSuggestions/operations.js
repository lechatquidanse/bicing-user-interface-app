import {
  fetchFailure,
  fetchPending,
  fetchSuccess,
} from 'application/state/query/geoSuggestions/actions';
import GeoSuggestionsProvider
  from 'application/state/query/geoSuggestions/provider/GeoSuggestionsProvider';
import { FETCH } from 'application/state/query/geoSuggestions/types';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetch() {
  yield put(fetchPending());

  try {
    const geoSuggestions = yield call(GeoSuggestionsProvider.provide);

    yield put(fetchSuccess(geoSuggestions));
  } catch (exception) {
    yield put(fetchFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
