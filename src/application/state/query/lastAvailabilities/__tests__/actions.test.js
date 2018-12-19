import * as actions from 'application/state/query/lastAvailabilities/actions';
import { FETCH } from 'application/state/query/lastAvailabilities/types';
import { isFSA, isError } from 'flux-standard-action';

describe('application/state/query/lastAvailabilities/actions', () => {
  test('should create an action to start fetching lastAvailabilities with function fetchStart()', () => {
    const action = actions.fetchStart();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      type: FETCH.START,
    });
  });
  test('should create an action pending while fetching lastAvailabilities with function fetchPending()', () => {
    const action = actions.fetchPending();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      type: FETCH.PENDING,
    });
  });
  test('should create an action to cancel fetching lastAvailabilities with function fetchCancelled()', () => {
    const action = actions.fetchCancelled();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false },
      type: FETCH.CANCELLED,
    });
  });
  test('should create an action to notify the success of fetching lastAvailabilities with function fetchSuccess()', () => {
    const data = [
      {
        statedAt: '2018-09-19T12:50:03+02:00',
        availableBikeNumber: 12,
        availableSlotNumber: 20,
        status: 'OPENED',
      },
      {
        statedAt: '2018-09-19T12:50:03+02:00',
        availableBikeNumber: 4,
        availableSlotNumber: 17,
        status: 'OPENED',
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
  test('should create an action when a failure occurred during fetching lastAvailabilities with function fetchFailure()', () => {
    const error = { message: 'An error occurred during fetching a lastAvailabilities.' };

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
