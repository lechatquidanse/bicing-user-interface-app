import * as actions from 'application/state/query/lastAvailabilities/actions';
import operation, { fetch } from 'application/state/query/lastAvailabilities/operations';
import { FETCH } from 'application/state/query/lastAvailabilities/types';
import HttpAvailabilitiesQuery from 'infrastructure/bicingApi/HttpAvailabilitiesQuery';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

describe('application/state/query/lastAvailabilities/operations', () => {
  test('should wait for a fetch start event to fetch with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(FETCH.START, fetch);
  });

  test('should dispatch a fetchPending action with fetch() generator', () => {
    testSaga(fetch)
      .next()
      .put(actions.fetchPending());
  });

  test('should list expected lastAvailabilities with fetch() generator', () => {
    const fakeLastAvailabilities = [
      {
        '@id': '/api/last-availabilities-by-station/4028fe46-d10e-47df-9a66-f1960475af15',
        '@type': 'lastAvailabilitiesByStationView',
        id: '4028fe46-d10e-47df-9a66-f1960475af15',
        statedAt: '2018-09-19T12:50:03+02:00',
        availableBikeNumber: 1,
        availableSlotNumber: 25,
        status: 'OPENED',
      },
    ];

    return expectSaga(fetch)
      .provide([
        [matchers.call.fn(HttpAvailabilitiesQuery.find), fakeLastAvailabilities],
      ])
      .put(actions.fetchSuccess(fakeLastAvailabilities))
      .run();
  });

  test('should handle error when api call response does not contains expected schema type', () => {
    const fakeLastAvailabilitiesWithMissingRequiredProperties = [{ availableBikeNumber: 1 }];

    const action = {
      error: false,
      meta: { isFetching: true },
      payload: { latitude: 41.3244, longitude: 2.345, limit: 5000 },
      type: FETCH.START,
    };

    return expectSaga(fetch, action)
      .provide([
        [matchers.call.fn(
          HttpAvailabilitiesQuery.find,
        ),
        fakeLastAvailabilitiesWithMissingRequiredProperties,
        ],
      ])
      .run()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });

  test('should handle error when api call failed in fetch() generator', () => {
    const error = new Error('error_api_call');

    return expectSaga(fetch)
      .provide([
        [matchers.call.fn(HttpAvailabilitiesQuery.find), throwError(error)],
      ])
      .put(actions.fetchFailure(error))
      .run();
  });
});
