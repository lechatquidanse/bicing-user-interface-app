import reducer from 'application/state/command/configureMap/reducers';
import { CONFIGURE } from 'application/state/command/configureMap/types';
import produce from 'immer';

const INITIAL_STATE = {
  error: false,
  data: undefined,
  latitude: undefined,
  longitude: undefined,
  limit: undefined,
};

describe('application/state/command/configureMap/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  test('should not affect state for an unknown action type', () => {
    expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual(INITIAL_STATE);
  });

  test('should affect state for action with type defining a configure start', () => {
    const latitude = 41.976; const longitude = 2.765; const
      limit = 500;

    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.latitude = latitude;
      draft.longitude = longitude;
      draft.limit = limit;
    });

    expect(reducer(INITIAL_STATE, {
      error: false,
      payload: { latitude, longitude, limit },
      type: CONFIGURE.START,
    })).toEqual(expectedState);
  });

  test('should affect state for action with type defining a configure success', () => {
    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.data = 12;
    });

    expect(reducer(INITIAL_STATE, {
      error: false,
      payload: 12,
      type: CONFIGURE.SUCCESS,
    })).toEqual(expectedState);
  });

  test('should affect state for action with type defining a configure failure', () => {
    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.data = 'An error occurred during configuration map.';
      draft.error = true;
    });
    expect(reducer(INITIAL_STATE, {
      error: true,
      payload: 'An error occurred during configuration map.',
      type: CONFIGURE.FAILURE,
    })).toEqual(expectedState);
  });
});
