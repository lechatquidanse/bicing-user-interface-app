import reducer from 'application/state/query/availabilities/reducers';
import { FETCH } from 'application/state/query/availabilities/types';
import produce from 'immer';

const INITIAL_STATE = { data: undefined, error: false, isFetching: false };

describe('application/state/query/availabilities/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  test('should not affect state for an unknown action type', () => {
    expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual(INITIAL_STATE);
  });

  test('should affect state for action with type defining a fetch start', () => {
    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.isFetching = true;
    });

    expect(reducer(INITIAL_STATE, {
      type: FETCH.START,
      meta: { isFetching: true },
    })).toEqual(expectedState);
  });

  test('should affect state for action with type defining a fetch success', () => {
    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.data = ['last availability 1', 'last availability 2'];
      draft.isFetching = false;
    });

    expect(reducer(INITIAL_STATE, {
      type: FETCH.SUCCESS,
      payload: ['last availability 1', 'last availability 2'],
      meta: { isFetching: false },
    })).toEqual(expectedState);
  });

  test('should affect state for action with type defining a fetch failure', () => {
    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.data = 'An error occurred during fetch.';
      draft.error = true;
      draft.isFetching = false;
    });
    expect(reducer(INITIAL_STATE, {
      type: FETCH.FAILURE,
      error: true,
      payload: 'An error occurred during fetch.',
      meta: { isFetching: false },
    })).toEqual(expectedState);
  });
});
