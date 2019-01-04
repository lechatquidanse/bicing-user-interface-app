import * as actions from 'application/state/query/availabilities/actions';
import { FETCH } from 'application/state/query/availabilities/types';
import { isError, isFSA } from 'flux-standard-action';
import { v4 as uuid } from 'uuid';

describe('application/state/query/availabilities/actions', () => {
  test('should create an action to start fetching availabilities with function fetchStart()', () => {
    const action = actions.fetchStart();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      payload: {
        periodStart: null, periodEnd: null, interval: null, stationIds: [],
      },
      type: FETCH.START,
    });
  });
  test('should create an action to start fetching availabilities with function fetchStart() and parameters', () => {
    const periodStart = '2017-08-08 12:12:12';
    const periodEnd = '2017-08-08 12:12:12';
    const interval = '5T';
    const stationId1 = uuid();
    const stationId2 = uuid();

    const action = actions.fetchStart(periodStart, periodEnd, interval, stationId1, stationId2);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      payload: {
        periodStart, periodEnd, interval, stationIds: [stationId1, stationId2],
      },
      type: FETCH.START,
    });
  });
  test('should create an action pending while fetching availabilities with function fetchPending()', () => {
    const action = actions.fetchPending();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      type: FETCH.PENDING,
    });
  });
  test('should create an action to notify the success of fetching availabilities with function fetchSuccess()', () => {
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
  test('should create an action when a failure occurred during fetching availabilities with function fetchFailure()', () => {
    const error = { message: 'An error occurred during fetching a availabilities.' };

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
