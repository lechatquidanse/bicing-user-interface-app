import * as actions from 'application/state/flow/station/actions';
import { FLOW } from 'application/state/flow/station/types';
import { isFSA } from 'flux-standard-action';
import { v4 as uuid } from 'uuid';

describe('application/state/flow/station/actions', () => {
  test('should create an action to start flow station', () => {
    const stationId = uuid();
    const periodStart = '2017-08-12 12:12:12';
    const periodEnd = '2017-09-12 12:12:12';
    const interval = '5 min';
    const action = actions.flow(stationId, periodStart, periodEnd, interval);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      payload: {
        stationId, periodStart, periodEnd, interval,
      },
      type: FLOW.START,
    });
  });
});
