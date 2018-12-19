import * as actions from 'application/state/query/stations/actions';
import { FETCH } from 'application/state/query/stations/types';
import { isFSA, isError } from 'flux-standard-action';

// @todo add logic with byGeoLocationFilter
describe('application/state/query/lastAvailabilities/actions', () => {
  test('should create an action to start fetching stations with function fetchStart()', () => {
    const action = actions.fetchStart();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      payload: { byGeoLocationFilter: null },
      type: FETCH.START,
    });
  });
  test('should create an action pending while fetching stations with function fetchPending()', () => {
    const action = actions.fetchPending();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      type: FETCH.PENDING,
    });
  });
  test('should create an action to cancel fetching stations with function fetchCancelled()', () => {
    const action = actions.fetchCancelled();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false },
      type: FETCH.CANCELLED,
    });
  });
  test('should create an action to notify the success of fetching stations with function fetchSuccess()', () => {
    const data = [
      {
        name: '87 - C/ MALLORCA 41-43',
        type: 'BIKE',
      },
      {
        name: '165 - C/ DEL DOCTOR TRUETA, 221',
        type: 'ELECTRIC_BIKE',
      },
    ];

    const action = actions.fetchSuccess(data);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false },
      type: FETCH.SUCCESS,
      payload: data,
    });
  });
  test('should create an action when a failure occurred during fetching stations with function fetchFailure()', () => {
    const error = { message: 'An error occurred during fetching stations.' };

    const action = actions.fetchFailure(error);

    expect(isError(action)).toBeTruthy();
    expect(action).toEqual({
      error: true,
      meta: { isFetching: false },
      type: FETCH.FAILURE,
      payload: error,
    });
  });
});
