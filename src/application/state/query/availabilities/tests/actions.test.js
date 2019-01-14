import * as actions from 'application/state/query/availabilities/actions';
import { FETCH } from 'application/state/query/availabilities/types';
import { isError, isFSA } from 'flux-standard-action';
import { v4 as uuid } from 'uuid';

describe('application/state/query/availabilities/actions', () => {
  test('should create an action to start fetching availabilities with function fetchStart() and parameters', () => {
    const itineraryStep = 0;
    const itineraryAt = '2017-08-08 12:22:12';
    const periodStartAt = '2017-08-08 12:12:12';
    const periodEndAt = '2017-08-08 12:32:12';
    const interval = '5T';
    const stationId1 = uuid();
    const stationId2 = uuid();
    const stationIds = [stationId1, stationId2];

    const action = actions.fetchStart(
      itineraryStep, itineraryAt, periodStartAt, periodEndAt, interval, stationIds,
    );

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true, itineraryStep, itineraryAt },
      payload: {
        periodStartAt, periodEndAt, interval, stationIds,
      },
      type: FETCH.START,
    });
  });
  test('should create an action pending while fetching availabilities with function fetchPending()', () => {
    const itineraryStep = 2;
    const action = actions.fetchPending(itineraryStep);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true, itineraryStep },
      type: FETCH.PENDING,
    });
  });
  test('should create an action to notify the success of fetching availabilities with function fetchSuccess()', () => {
    const itineraryStep = 1;
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
    const action = actions.fetchSuccess(itineraryStep, data);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false, itineraryStep },
      type: FETCH.SUCCESS,
      payload: data,
    });
  });
  test('should create an action when a failure occurred during fetching availabilities with function fetchFailure()', () => {
    const itineraryStep = 1;
    const error = { message: 'An error occurred during fetching a availabilities.' };

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
