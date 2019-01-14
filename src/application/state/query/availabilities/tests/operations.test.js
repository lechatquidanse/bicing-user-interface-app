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
    const itineraryStep = 5;
    const action = {
      error: false,
      meta: { isFetching: true, itineraryStep, itineraryAt: '2017-08-08 12:22:12' },
      payload: {
        periodStartAt: '2017-08-08 12:12:12',
        periodEndAt: '2017-08-08 12:12:12',
        interval: '5T',
        stationIds: [],
      },
      type: FETCH.START,
    };
    testSaga(fetch, action)
      .next()
      .put(actions.fetchPending(itineraryStep));
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
    const itineraryStep = 2;
    const action = {
      error: false,
      meta: { isFetching: true, itineraryStep, itineraryAt: '2017-08-08 12:22:12' },
      payload: {
        periodStartAt: '2017-08-08 12:12:12',
        periodEndAt: '2017-10-08 12:32:12',
        interval: '5T',
        stationIds: [uuid(), uuid()],
      },
      type: FETCH.START,
    };

    return expectSaga(fetch, action)
      .provide([
        [
          matchers.call.fn(availabilitiesProvider),
          fakeLastAvailabilities,
        ],
      ])
      .put(actions.fetchSuccess(itineraryStep, fakeLastAvailabilities))
      .run();
  });

  test('should handle error when api call response does not contains expected schema type', () => {
    const fakeLastAvailabilitiesWithMissingRequiredProperties = [{ availableBikeNumber: 1 }];
    const itineraryStep = 2;
    const action = {
      error: false,
      meta: { isFetching: true, itineraryStep, itineraryAt: '2017-08-08 12:22:12' },
      payload: {
        periodStartAt: '2017-08-08 12:12:12',
        periodEndAt: '2017-10-08 12:32:12',
        interval: '5T',
        stationIds: [
          '499cf165-9d02-4bfb-b150-6ba18f5a63fb',
          '1ee10d1e-5618-4441-a182-062dcf5fdaf1',
        ],
      },
      type: FETCH.START,
    };

    return expectSaga(fetch, action)
      .provide([
        [
          matchers.call.fn(availabilitiesProvider),
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
    const itineraryStep = 0;
    const action = {
      error: false,
      meta: { isFetching: true, itineraryStep, itineraryAt: '2017-08-08 12:22:12' },
      payload: {
        periodStartAt: '2017-08-08 12:12:12',
        periodEndAt: '2017-10-08 12:32:12',
        interval: '5T',
        stationIds: [uuid(), uuid()],
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
      .put(actions.fetchFailure(itineraryStep, error))
      .run();
  });
});
