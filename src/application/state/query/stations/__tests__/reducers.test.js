import reducer from 'application/state/query/stations/reducers';
import { FETCH } from 'application/state/query/stations/types';
import produce from 'immer';

const INITIAL_STATE = {
  byGeoLocationFilter: null,
  data: null,
  error: false,
  isFetching: false,
};

// @todo add byGeoLocationFilter logic
describe('application/state/query/stations/reducers', () => {
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
      payload: { byGeoLocationFilter: null },
    })).toEqual(expectedState);
  });

  test('should affect state for action with type defining a fetch success', () => {
    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.data = ['station 1', 'station 2'];
      draft.isFetching = false;
    });

    expect(reducer(INITIAL_STATE, {
      type: FETCH.SUCCESS,
      payload: ['station 1', 'station 2'],
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
