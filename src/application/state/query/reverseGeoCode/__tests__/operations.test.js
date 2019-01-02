import * as actions from 'application/state/query/reverseGeoCode/actions';
import operation, { fetch } from 'application/state/query/reverseGeoCode/operations';
import { FETCH } from 'application/state/query/reverseGeoCode/types';
import HttpReverseGeoCodeQuery from 'infrastructure/geoCodeApi';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

describe('application/state/query/reverseGeoCode/operations', () => {
  test('should wait for a fetch start event to list with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(FETCH.START, fetch);
  });

  test('should dispatch a fetchPending action with fetch() generator', () => {
    testSaga(fetch)
      .next()
      .put(actions.fetchPending());
  });

  test('should list expected address with fetch() generator', () => {
    const latitude = 41.371965;
    const longitude = 2.166871;
    const fakeAddress = {
      address: 'Nou de la Rambla',
      addressNumber: '164',
      zipCode: '08004',
    };
    const action = { type: FETCH.START, payload: { latitude, longitude } };

    return expectSaga(fetch, action)
      .provide([
        [matchers.call.fn(HttpReverseGeoCodeQuery.find, latitude, longitude), fakeAddress],
      ])
      .put(actions.fetchSuccess(fakeAddress))
      .run();
  });

  test('should handle error when api call failed in fetch() generator', () => {
    const latitude = 41.371965;
    const longitude = 2.166871;
    const error = new Error('error_api_call');
    const action = { type: FETCH.START, payload: { latitude, longitude } };

    return expectSaga(fetch, action)
      .provide([
        [matchers.call.fn(HttpReverseGeoCodeQuery.find, latitude, longitude), throwError(error)],
      ])
      .put(actions.fetchFailure(error))
      .run();
  });
});
