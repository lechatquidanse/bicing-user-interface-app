import operation, { flow } from 'application/state/flow/map/operations';
import { FLOW } from 'application/state/flow/map/types';
import { actions as queryStationsActions } from 'application/state/query/stations';
import STATIONS_FETCH from 'application/state/query/stations/types';
import { testSaga } from 'redux-saga-test-plan';

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
        latitude,
        longitude,
        limit,
      },
      type: FLOW.START,
    };

    testSaga(flow, action)
      .next()
      .put(queryStationsActions.fetchStart(itineraryStep, latitude, longitude, limit))
      .next()
      .take(STATIONS_FETCH.SUCCESS);

    // .next()
    // .select(queryStationsSelectors.stationIdsByItineraryStep(itineraryStep))
    // .next(stationIds)
    // .all([
    //   put(queryAvailabilitiesActions.fetchStart(
    //     itineraryStep,
    //     itineraryAt,
    //     periodStartAt,
    //     periodEndAt,
    //     interval,
    //     stationIds
    //   )),
    //   put(commandConfigureMapActions.configureStart(latitude, longitude, limit))
    // ])
    // .next()
    // .isDone();
  });
});
