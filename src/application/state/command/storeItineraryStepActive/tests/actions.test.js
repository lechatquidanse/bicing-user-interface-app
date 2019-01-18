import * as actions from 'application/state/command/storeItineraryStepActive/actions';
import { STORE } from 'application/state/command/storeItineraryStepActive/types';
import { isFSA } from 'flux-standard-action';

describe('application/state/command/storeItineraryStepActive/actions', () => {
  test('should create an action to enable geoLocation with function enable()', () => {
    const itineraryStep = 1;
    const action = actions.store(itineraryStep);

    expect(isFSA(action)).toEqual(true);
    expect(action).toEqual({
      payload: itineraryStep,
      type: STORE.START,
    });
  });
});
