import * as actions from 'application/state/query/reverseGeoCode/actions';
import { FETCH } from 'application/state/query/reverseGeoCode/types';
import { isError, isFSA } from 'flux-standard-action';

describe('application/state/query/reverseGeoCode/actions', () => {
  test('should create an action to start fetching a reverseGeoCode with function fetchStart()', () => {
    const latitude = 41.211;
    const longitude = 2.1233;

    const action = actions.fetchStart(latitude, longitude);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      payload: { latitude, longitude },
      type: FETCH.START,
    });
  });
  test('should create an action pending while fetching a reverseGeoCode with function fetchPending()', () => {
    const action = actions.fetchPending();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      type: FETCH.PENDING,
    });
  });
  test('should create an action to notify the success of fetching a reverseGeoCode with function fetchSuccess()', () => {
    const data = { address: '87 - C/ MALLORCA 41-43', zipCode: '08024' };

    const action = actions.fetchSuccess(data);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false },
      type: FETCH.SUCCESS,
      payload: data,
    });
  });
  test('should create an action when a failure occurred during fetching a reverseGeoCode with function fetchFailure()', () => {
    const error = { message: 'An error occurred during fetching a reverseGeoCode.' };

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
