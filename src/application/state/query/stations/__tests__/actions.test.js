import * as actions from 'application/state/query/stations/actions';
import { FETCH } from 'application/state/query/stations/types';
import { isError, isFSA } from 'flux-standard-action';

describe('application/state/query/lastAvailabilities/actions', () => {
  test('should create an action to start fetching stations with function fetchStart() and parameters', () => {
    const itineraryStep = 0;
    const latitude = 41.3244;
    const longitude = 2.345;
    const limit = 5000;

    const action = actions.fetchStart(itineraryStep, latitude, longitude, limit);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true, itineraryStep },
      payload: { latitude, longitude, limit },
      type: FETCH.START,
    });
  });
  test('should create an action pending while fetching stations with function fetchPending()', () => {
    const itineraryStep = 2;
    const action = actions.fetchPending(itineraryStep);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true, itineraryStep },
      type: FETCH.PENDING,
    });
  });
  test('should create an action to notify the success of fetching stations with function fetchSuccess()', () => {
    const itineraryStep = 0;
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

    const action = actions.fetchSuccess(itineraryStep, data);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false, itineraryStep },
      type: FETCH.SUCCESS,
      payload: data,
    });
  });
  test('should create an action when a failure occurred during fetching stations with function fetchFailure()', () => {
    const itineraryStep = 1;
    const error = { message: 'An error occurred during fetching stations.' };

    const action = actions.fetchFailure(itineraryStep, error);

    expect(isError(action)).toBeTruthy();
    expect(action).toEqual({
      error: true,
      meta: { isFetching: false, itineraryStep },
      type: FETCH.FAILURE,
      payload: error,
    });
  });
});
