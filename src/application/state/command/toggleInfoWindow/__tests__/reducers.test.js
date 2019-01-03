import reducer from 'application/state/command/toggleInfoWindow/reducers';
import { TOGGLE } from 'application/state/command/toggleInfoWindow/types';
import produce from 'immer';
import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
  key: null,
};

describe('application/state/command/infoWindow/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  test('should not affect state for an unknown action type', () => {
    expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual(INITIAL_STATE);
  });

  test('should affect state for action with type defining a toggle start', () => {
    const key = uuid();

    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.key = key;
    });

    expect(reducer(INITIAL_STATE, {
      payload: { key },
      type: TOGGLE.START,
    })).toEqual(expectedState);
  });
});
