import * as actions from 'application/state/flow/map/actions';
import { FLOW } from 'application/state/flow/map/types';
import { isFSA } from 'flux-standard-action';

describe('application/state/map/flow/actions', () => {
  test('should create an action to start flow map', () => {
    const itineraryStep = 0;
    const itineraryAt = '2016-09-23 15:14:34';
    const periodStartAt = '2016-07-23 15:14:34';
    const periodEndAt = '2016-09-23 15:14:34';
    const interval = '5T';
    const latitude = 41.322;
    const longitude = 2.187;
    const limit = 2000;
    const action = actions.flow(
      itineraryStep,
      itineraryAt,
      periodStartAt,
      periodEndAt,
      interval,
      latitude,
      longitude,
      limit,
    );

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
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
    });
  });
});
