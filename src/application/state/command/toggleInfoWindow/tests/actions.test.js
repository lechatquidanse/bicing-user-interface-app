import * as actions from 'application/state/command/toggleInfoWindow/actions';
import { TOGGLE } from 'application/state/command/toggleInfoWindow/types';
import { isFSA } from 'flux-standard-action';
import { v4 as uuid } from 'uuid';

describe('application/state/command/toggleInfoWindow/actions', () => {
  test('should create an action to start displaying infoWindow with function toggle()', () => {
    const key = uuid();
    const action = actions.toggle(key);

    expect(isFSA(action)).toEqual(true);
    expect(action).toEqual({
      payload: { key },
      type: TOGGLE.START,
    });
  });
});
