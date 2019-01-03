import reducer from 'application/state/query/stationAvailabilities/reducers';
import { FETCH } from 'application/state/query/stationAvailabilities/types';
import produce from 'immer';
import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
  data: undefined,
  error: false,
  isFetching: false,
  stationId: undefined,
  periodStart: undefined,
  periodEnd: undefined,
  interval: undefined,
};

describe('application/state/query/stationAvailabilities/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  test('should not affect state for an unknown action type', () => {
    expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual(INITIAL_STATE);
  });

  test('should affect state for action with type defining a fetch start', () => {
    const stationId = uuid();
    const periodStart = '2017-08-12 15:56:00';
    const periodEnd = '2018-08-12 15:56:00';
    const
      interval = '5 min';

    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.isFetching = true;
      draft.stationId = stationId;
      draft.periodStart = periodStart;
      draft.periodEnd = periodEnd;
      draft.interval = interval;
    });

    expect(reducer(INITIAL_STATE, {
      type: FETCH.START,
      meta: { isFetching: true },
      payload: {
        stationId, periodStart, periodEnd, interval,
      },
    })).toEqual(expectedState);
  });

  test('should affect state for action with type defining a fetch success', () => {
    const expectedState = produce(INITIAL_STATE, (draft) => {
      draft.data = ['station data'];
      draft.isFetching = false;
    });

    expect(reducer(INITIAL_STATE, {
      type: FETCH.SUCCESS,
      payload: ['station data'],
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
