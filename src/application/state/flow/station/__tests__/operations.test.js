import operation, { flow } from 'application/state/flow/station/operations';
import { FLOW } from 'application/state/flow/station/types';
import { testSaga } from 'redux-saga-test-plan';
import { put } from 'redux-saga/effects';
import { actions as queryStationActions } from 'application/state/query/station';
import { actions as queryStationAvailabilitiesActions } from 'application/state/query/stationAvailabilities';
import { v4 as uuid } from 'uuid';

describe('application/state/flow/station/operations', () => {
  test('should wait for a flow start event to flow station with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(FLOW.START, flow);
  });

  test('should put event for query station and query stationAvailabilities', () => {
    const stationId = uuid();
    const periodStart = '2017-08-12 12:12:12';
    const periodEnd = '2017-09-12 12:12:12';
    const interval = '5 min';

    const action = {
      payload: {
        stationId, periodStart, periodEnd, interval,
      },
      type: FLOW.START,
    };

    testSaga(flow, action)
      .next()
      .all([
        put(queryStationActions.fetchStart(stationId)),
        put(queryStationAvailabilitiesActions.fetchStart(
          stationId,
          periodStart, periodEnd, interval,
        )),
      ]);
  });
});
