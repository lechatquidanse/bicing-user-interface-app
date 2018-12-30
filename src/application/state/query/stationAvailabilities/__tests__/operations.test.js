import * as actions from 'application/state/query/stationAvailabilities/actions';
import operation, { fetch } from 'application/state/query/stationAvailabilities/operations';
import { FETCH } from 'application/state/query/stationAvailabilities/types';
import HttpStationAvailabilityQuery from 'infrastructure/bicingApi/HttpStationAvailabilityQuery';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { v4 as uuid } from 'uuid';

describe('application/state/query/stationAvailabilities/operations', () => {
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
    const periodStart = '2017-08-05 14:43:56';
    const periodEnd = '2018-08-05 14:51:56';
    const interval = '5 min';

    const fakeStationAvailabilities = [
      {
        interval: '2018-11-05 14:45:00',
        available_bike_avg: '20.0000000000000000',
        available_bike_min: 20,
        available_bike_max: 20,
        available_slot_avg: '9.0000000000000000',
        available_slot_min: 9,
        available_slot_max: 9,
      },
      {
        interval: '2018-11-05 14:50:00',
        available_bike_avg: '20.0000000000000000',
        available_bike_min: 19,
        available_bike_max: 21,
        available_slot_avg: '9.0000000000000000',
        available_slot_min: 8,
        available_slot_max: 10,
      },
    ];
    const action = {
      type: FETCH.START,
      payload: {
        stationId, periodStart, periodEnd, interval,
      },
    };

    return expectSaga(fetch, action)
      .provide([
        [matchers.call.fn(HttpStationAvailabilityQuery.find, stationId), fakeStationAvailabilities],
      ])
      .put(actions.fetchSuccess(fakeStationAvailabilities))
      .run();
  });

  test('should handle error when stationId is not validated', () => {
    const action = {
      type: FETCH.START,
      payload: {
        stationId: 'not an uuid',
        periodStart: '2017-08-05 14:43:56',
        periodEnd: '2018-08-05 14:51:56',
        interval: '5 min',
      },
    };

    return expectSaga(fetch, action)
      .run()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });

  test('should handle error when ByIntervalInPeriodFilter is not validated', () => {
    const action = {
      type: FETCH.START,
      payload: {
        stationId: uuid(),
        periodStart: 'invalid format',
        periodEnd: '2018-08-05 14:51:56',
        interval: '5 min',
      },
    };

    return expectSaga(fetch, action)
      .run()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });

  test('should handle error when api call response does not contains expected schema type', () => {
    const stationId = 'a41070e4-3866-490d-a8ab-5195eae71f93';
    const periodStart = '2017-08-05 14:43:56';
    const periodEnd = '2018-08-05 14:51:56';
    const interval = '5 min';
    const fakeResponseWithMissingRequiredProperties = [{ available_bike_avg: '20.0000000000000000' }];

    const action = {
      type: FETCH.START,
      payload: {
        stationId, periodStart, periodEnd, interval,
      },
    };

    return expectSaga(fetch, action)
      .provide([
        [matchers.call.fn(
          HttpStationAvailabilityQuery.find, stationId,
        ),
        fakeResponseWithMissingRequiredProperties,
        ],
      ])
      .run()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });

  test('should handle error when api call failed in fetch() generator', () => {
    const stationId = uuid();
    const periodStart = '2017-08-05 14:43:56';
    const periodEnd = '2018-08-05 14:51:56';
    const interval = '5 min';
    const error = new Error('error_api_call');
    const action = {
      type: FETCH.START,
      payload: {
        stationId, periodStart, periodEnd, interval,
      },
    };

    return expectSaga(fetch, action)
      .provide([
        [matchers.call.fn(HttpStationAvailabilityQuery.find, stationId), throwError(error)],
      ])
      .put(actions.fetchFailure(error))
      .run();
  });
});
