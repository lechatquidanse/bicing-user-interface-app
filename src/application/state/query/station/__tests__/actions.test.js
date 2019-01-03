import * as actions from 'application/state/query/station/actions';
import { FETCH } from 'application/state/query/station/types';
import { isError, isFSA } from 'flux-standard-action';
import { v4 as uuid } from 'uuid';

describe('application/state/query/station/actions', () => {
  test('should create an action to start fetching a station with function fetchStart()', () => {
    const stationId = uuid();
    const action = actions.fetchStart(stationId);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      payload: { stationId },
      type: FETCH.START,
    });
  });
  test('should create an action pending while fetching a station with function fetchPending()', () => {
    const action = actions.fetchPending();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      type: FETCH.PENDING,
    });
  });
  test('should create an action to notify the success of fetching a station with function fetchSuccess()', () => {
    const data = { name: '87 - C/ MALLORCA 41-43', type: 'BIKE' };

    const action = actions.fetchSuccess(data);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false },
      type: FETCH.SUCCESS,
      payload: data,
    });
  });
  test('should create an action when a failure occurred during fetching a station with function fetchFailure()', () => {
    const error = { message: 'An error occurred during fetching a station.' };

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
