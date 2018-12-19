import reducer from 'application/state/command/map/reducers';
import { DISPLAY } from 'application/state/command/map/types';
import produce from 'immer';
import byGeoLocationFilter from 'application/state/filter/byGeoLocationFilter';

const INITIAL_STATE = {
  data: null,
  error: false,
  filter: null,
  isDisplaying: false,
};

describe('application/state/command/map/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  test('should not affect state for an unknown action type', () => {
    expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual(INITIAL_STATE);
  });

  test('should affect state for action with type defining a display start', () => {
    const filter = byGeoLocationFilter(41.976, 2.765, 500);

    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.isDisplaying = true;
      draft.filter = filter;
    });

    expect(reducer(INITIAL_STATE, {
      error: false,
      payload: { byGeoLocationFilter: filter },
      meta: { isDisplaying: true },
      type: DISPLAY.START,
    })).toEqual(expectedState);
  });

  test('should affect state for action with type defining a display success', () => {
    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.isDisplaying = false;
    });

    expect(reducer(INITIAL_STATE, {
      error: false,
      meta: { isDisplaying: false },
      type: DISPLAY.SUCCESS,
    })).toEqual(expectedState);
  });

  test('should affect state for action with type defining a display failure', () => {
    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.data = 'An error occurred during display.';
      draft.error = true;
      draft.isDisplaying = false;
    });
    expect(reducer(INITIAL_STATE, {
      error: true,
      payload: 'An error occurred during display.',
      meta: { isDisplaying: false },
      type: DISPLAY.FAILURE,
    })).toEqual(expectedState);
  });
});
