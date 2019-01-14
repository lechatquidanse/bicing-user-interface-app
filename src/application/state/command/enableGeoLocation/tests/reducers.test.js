import reducer, { INITIAL_STATE } from 'application/state/command/enableGeoLocation/reducers';
import { ENABLE } from 'application/state/command/enableGeoLocation/types';

describe('application/state/command/infoWindow/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual({
      enabled: false,
      itineraryStep: 0,
    });
  });

  test('should not affect state for an unknown action type', () => {
    expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual({
      enabled: false,
      itineraryStep: 0,
    });
  });

  test('should affect state for action with type defining a enabled start', () => {
    const enabled = true;
    const itineraryStep = 3;

    expect(reducer(INITIAL_STATE, {
      payload: { enabled, itineraryStep },
      type: ENABLE.START,
    })).toEqual({
      enabled,
      itineraryStep,
    });
  });
});
