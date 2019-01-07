import { actions as commandConfigureMapActions } from 'application/state/command/configureMap';
import operation, { flow } from 'application/state/flow/map/operations';
import { FLOW } from 'application/state/flow/map/types';
import { actions as queryAvailabilitiesActions } from 'application/state/query/availabilities';
import { actions as queryStationsActions } from 'application/state/query/stations';
import { testSaga } from 'redux-saga-test-plan';
import { put } from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';

describe('application/state/flow/map/operations', () => {
  test('should wait for a flow start event to flow map with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(FLOW.START, flow);
  });

  test('should put event for command configure map, query stations and query last availabilities', () => {
    const itineraryStep = 0;
    const itineraryAt = '2016-09-23 15:14:34';
    const periodStartAt = '2016-07-23 15:14:34';
    const periodEndAt = '2016-09-23 15:14:34';
    const interval = '5T';
    const stationIds = [uuid(), uuid(), uuid(), uuid()];
    const latitude = 41.322;
    const longitude = 2.187;
    const limit = 2000;
    const action = {
      payload: {
        itineraryStep,
        itineraryAt,
        periodStartAt,
        periodEndAt,
        interval,
        stationIds,
        latitude,
        longitude,
        limit},
      type: FLOW.START,
    };

    testSaga(flow, action)
      .next()
      .all([
        put(queryAvailabilitiesActions.fetchStart(
          itineraryStep,
          itineraryAt,
          periodStartAt,
          periodEndAt,
          interval,
          stationIds)),
        put(queryStationsActions.fetchStart(itineraryStep, latitude, longitude, limit)),
        put(commandConfigureMapActions.configureStart(latitude, longitude, limit)),
      ]);
  });
});
