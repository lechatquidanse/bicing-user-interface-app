import * as actions from 'application/state/query/station/actions';
import operation, { fetch } from 'application/state/query/station/operations';
import { FETCH } from 'application/state/query/station/types';
import HttpStationQuery from 'infrastructure/bicingApi/HttpStationQuery';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { v4 as uuid } from 'uuid';

describe('application/state/query/station/operations', () => {
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

  test('should list expected station with fetch() generator', () => {
    const stationId = uuid();
    const fakeStation = {
      '@id': `api/stations/${stationId}`,
      '@type': 'stationView',
      id: `${stationId}`,
      name: '233 - C/NOU DE LA RAMBLA, 164',
      type: 'BIKE',
      address: 'Nou de la Rambla',
      addressNumber: '164',
      zipCode: '08004',
      latitude: 41.371965,
      longitude: 2.166871,
    };
    const action = { type: FETCH.START, payload: { stationId } };

    return expectSaga(fetch, action)
      .provide([
        [matchers.call.fn(HttpStationQuery.find, stationId), fakeStation],
      ])
      .put(actions.fetchSuccess(fakeStation))
      .run();
  });

  test('should handle error when api call failed in fetch() generator', () => {
    const stationId = uuid();
    const error = new Error('error_api_call');
    const action = { type: FETCH.START, payload: { stationId } };

    return expectSaga(fetch, action)
      .provide([
        [matchers.call.fn(HttpStationQuery.find, stationId), throwError(error)],
      ])
      .put(actions.fetchFailure(error))
      .run();
  });
});
