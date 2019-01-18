import * as actions from 'application/state/command/toggleInfoWindow/actions';
import reducer from 'application/state/command/toggleInfoWindow/reducers';
import StateBuilder from 'application/state/command/toggleInfoWindow/tests/support/StateBuilder';
import { v4 as uuid } from 'uuid';

let stateBuilder;

describe('application/state/command/infoWindow/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(stateBuilder.withKey(null).build());
  });
  test('should not affect state for an unknown action type', () => {
    const initialState = stateBuilder.withKey(uuid()).build();

    expect(reducer(initialState, { type: 'NOT_EXISTING' })).toEqual(initialState);
  });
  test('should affect state for action with type defining a toggle start', () => {
    const initialState = stateBuilder.withKey(uuid()).build();
    const key = uuid();
    const expectedState = stateBuilder.withKey(key).build();

    expect(reducer(initialState, actions.toggle(key))).toEqual(expectedState);
  });
  beforeEach(() => {
    stateBuilder = StateBuilder.create().withIsReduced(true);
  });
});
