import * as actions from 'application/state/query/stationAvailabilities/actions';
import { FETCH } from 'application/state/query/stationAvailabilities/types';
import { isError, isFSA } from 'flux-standard-action';
import { v4 as uuid } from 'uuid';

describe('application/state/query/stationAvailabilities/actions', () => {
  test('should create an action to start fetching a stationAvailabilities with function fetchStart()', () => {
    const stationId = uuid(); const periodStart = '2017-08-13 23:56:23';


    const periodEnd = '2017-09-13 23:56:23'; const
      interval = '5 min';
    const action = actions.fetchStart(stationId, periodStart, periodEnd, interval);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      payload: {
        stationId, periodStart, periodEnd, interval,
      },
      type: FETCH.START,
    });
  });
  test('should create an action pending while fetching a stationAvailabilities with function fetchPending()', () => {
    const action = actions.fetchPending();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      type: FETCH.PENDING,
    });
  });
  test('should create an action to notify the success of fetching a stationAvailabilities with function fetchSuccess()', () => {
    const data = [
      {
        interval: '2018-11-05 14:45:00',
        available_bike_avg: '20.0',
        available_slot_avg: '9.0',
      },
      {
        interval: '2018-11-05 14:50:00',
        available_bike_avg: '13.0',
        available_slot_avg: '16.0',
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
  test('should create an action when a failure occurred during fetching a stationAvailabilities with function fetchFailure()', () => {
    const error = { message: 'An error occurred during fetching a stationAvailabilities.' };

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
