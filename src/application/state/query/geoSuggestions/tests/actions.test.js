import * as actions from 'application/state/query/geoSuggestions/actions';
import { FETCH } from 'application/state/query/geoSuggestions/types';
import StationBuilder from 'application/state/query/stations/tests/support/StationBuilder';
import { isError, isFSA } from 'flux-standard-action';

describe('application/state/query/geoSuggestions/actions', () => {
  test('should create an action to start fetching geoSuggestions with function fetchStart() and parameters', () => {
    const action = actions.fetchStart();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false },
      type: FETCH.START,
    });
  });
  test('should create an action pending while fetching geoSuggestions with function fetchPending()', () => {
    const action = actions.fetchPending();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      type: FETCH.PENDING,
    });
  });
  test('should create an action to notify the success of fetching geoSuggestions with function fetchSuccess()', () => {
    const data = [StationBuilder.create().build(), StationBuilder.create().build()];
    const action = actions.fetchSuccess(data);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false },
      type: FETCH.SUCCESS,
      payload: data,
    });
  });
  test('should create an action when a failure occurred during fetching geoSuggestions with function fetchFailure()', () => {
    const error = new Error('An error occurred');

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
