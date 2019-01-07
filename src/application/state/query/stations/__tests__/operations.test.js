import * as actions from 'application/state/query/stations/actions';
import operation, { fetch } from 'application/state/query/stations/operations';
import { FETCH } from 'application/state/query/stations/types';
import HttpStationsQuery from 'infrastructure/bicingApi/HttpStationsQuery';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

describe('application/state/query/stations/operations', () => {
  test('should wait for a fetch start event to fetch with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(FETCH.START, fetch);
  });

  test('should dispatch a fetchListPending action with fetch() generator', () => {
    const itineraryStep = 5;
    const action = {
      error: false,
      meta: { isFetching: true, itineraryStep },
      payload: { latitude: 41.3244, longitude: 2.345, limit: 5000 },
      type: FETCH.START,
    };
    testSaga(fetch, action)
      .next()
      .put(actions.fetchPending(itineraryStep));
  });

  test('should handle error when byGeoLocationFilter creation is not validated', () => {
    const itineraryStep = 5;
    const action = {
      error: false,
      meta: { isFetching: true, itineraryStep },
      payload: { latitude: 'bad_value', longitude: 'bad_value', limit: 'bad_value' },
      type: FETCH.START,
    };

    return expectSaga(fetch, action)
      .run()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });

  test('should list expected stations with fetch() generator', () => {
    const fakeStations = [
      {
        '@id': '/api/stations/f7fa1d7b-4a7b-410d-bae0-549d862a2523',
        '@type': 'stationView',
        id: 'f7fa1d7b-4a7b-410d-bae0-549d862a2523',
        name: '233 - C/NOU DE LA RAMBLA, 164',
        type: 'BIKE',
        address: 'Nou de la Rambla',
        addressNumber: '164',
        zipCode: '08004',
        latitude: 41.371965,
        longitude: 2.166871,
      },
    ];
    const itineraryStep = 5;
    const action = {
      error: false,
      meta: { isFetching: true, itineraryStep },
      payload: { latitude: 41.3244, longitude: 2.345, limit: 5000 },
      type: FETCH.START,
    };

    return expectSaga(fetch, action)
      .provide([
        [matchers.call.fn(HttpStationsQuery.find), fakeStations],
      ])
      .put(actions.fetchSuccess(itineraryStep, fakeStations))
      .run();
  });

  test('should handle error when api call response does not contains expected schema type', () => {
    const fakeStationsWithMissingRequiredProperties = [{ name: '233 - C/NOU DE LA RAMBLA, 164' }];
    const itineraryStep = 0;
    const action = {
      error: false,
      meta: { isFetching: true, itineraryStep },
      payload: { latitude: 41.3244, longitude: 2.345, limit: 5000 },
      type: FETCH.START,
    };

    return expectSaga(fetch, action)
      .provide([
        [matchers.call.fn(HttpStationsQuery.find), fakeStationsWithMissingRequiredProperties],
      ])
      .run()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });

  test('should handle error when api call failed in fetch() generator', () => {
    const error = new Error('error_api_call');
    const itineraryStep = 0;
    const action = {
      error: false,
      meta: { isFetching: true, itineraryStep },
      payload: { latitude: 41.3244, longitude: 2.345, limit: 5000 },
      type: FETCH.START,
    };

    return expectSaga(fetch, action)
      .provide([
        [matchers.call.fn(HttpStationsQuery.find), throwError(error)],
      ])
      .put(actions.fetchFailure(itineraryStep, error))
      .run();
  });
});
