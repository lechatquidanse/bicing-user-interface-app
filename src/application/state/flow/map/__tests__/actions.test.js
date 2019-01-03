import * as actions from 'application/state/flow/map/actions';
import { FLOW } from 'application/state/flow/map/types';
import { isFSA } from 'flux-standard-action';

describe('application/state/map/flow/actions', () => {
  test('should create an action to start flow map', () => {
    const latitude = 41.322; const longitude = 2.187; const
      limit = 2000;
    const action = actions.flow(latitude, longitude, limit);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      payload: { latitude, longitude, limit },
      type: FLOW.START,
    });
  });
});
