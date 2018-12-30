import { actions as commandConfigureMapActions } from 'application/state/command/configureMap';
import operation, { flow } from 'application/state/flow/map/operations';
import { FLOW } from 'application/state/flow/map/types';
import { actions as queryLastAvailabilitiesActions } from 'application/state/query/lastAvailabilities';
import { actions as queryStationsActions } from 'application/state/query/stations';
import { testSaga } from 'redux-saga-test-plan';
import { put } from 'redux-saga/effects';

describe('application/state/flow/map/operations', () => {
  test('should wait for a flow start event to flow map with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(FLOW.START, flow);
  });

  test('should put event for command configure map, query stations and query last availabilities', () => {
    const latitude = 41.234; const longitude = 2.455; const
      limit = 5000;
    const action = {
      payload: { latitude, longitude, limit },
      type: FLOW.START,
    };

    testSaga(flow, action)
      .next()
      .all([
        put(queryLastAvailabilitiesActions.fetchStart()),
        put(queryStationsActions.fetchStart(latitude, longitude, limit)),
        put(commandConfigureMapActions.configureStart(latitude, longitude, limit)),
      ]);
  });
});
