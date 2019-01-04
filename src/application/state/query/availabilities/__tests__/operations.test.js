import * as actions from 'application/state/query/availabilities/actions';
import operation, { fetch } from 'application/state/query/availabilities/operations';
import availabilitiesProvider
  from 'application/state/query/availabilities/provider/availabilitiesProvider';
import { FETCH } from 'application/state/query/availabilities/types';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { v4 as uuid } from 'uuid';

describe('application/state/query/availabilities/operations', () => {
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

  test('should list expected availabilities with fetch() generator', () => {
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

    const periodStart = '2017-08-08 12:12:12';
    const periodEnd = '2017-08-08 12:12:12';
    const interval = '5T';
    const stationIds = [uuid(), uuid(), uuid()];
    const action = {
      error: false,
      meta: { isFetching: true },
      payload: {
        periodStart, periodEnd, interval, stationIds,
      },
      type: FETCH.START,
    };

    return expectSaga(fetch, action)
      .provide([
        [
          matchers.call.fn(availabilitiesProvider, periodStart, periodEnd, interval, stationIds),
          fakeLastAvailabilities,
        ],
      ])
      .put(actions.fetchSuccess(fakeLastAvailabilities))
      .run();
  });

  test('should handle error when api call response does not contains expected schema type', () => {
    const fakeLastAvailabilitiesWithMissingRequiredProperties = [{ availableBikeNumber: 1 }];
    const periodStart = '2017-08-08 12:12:12';
    const periodEnd = '2017-08-08 12:12:12';
    const interval = '5T';
    const stationIds = [uuid(), uuid(), uuid()];
    const action = {
      error: false,
      meta: { isFetching: true },
      payload: {
        periodStart, periodEnd, interval, stationIds,
      },
      type: FETCH.START,
    };

    return expectSaga(fetch, action)
      .provide([
        [
          matchers.call.fn(availabilitiesProvider, periodStart, periodEnd, interval, stationIds),
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

    const periodStart = '2017-08-08 12:12:12';
    const periodEnd = '2017-08-08 12:12:12';
    const interval = '5T';
    const stationIds = [uuid(), uuid(), uuid()];
    const action = {
      error: false,
      meta: { isFetching: true },
      payload: {
        periodStart, periodEnd, interval, stationIds,
      },
      type: FETCH.START,
    };

    return expectSaga(fetch, action)
      .provide([
        [
          matchers.call.fn(availabilitiesProvider),
          throwError(error),
        ],
      ])
      .put(actions.fetchFailure(error))
      .run();
  });
});
