import AvailabilityBuilder
  from 'application/state/query/availabilities/tests/support/AvailabilityBuilder';
import * as actions from 'application/state/query/stationAvailabilities/actions';
import { FETCH } from 'application/state/query/stationAvailabilities/types';
import { isError, isFSA } from 'flux-standard-action';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

describe('application/state/query/stationAvailabilities/actions', () => {
  test('should create an action to start fetching stationAvailabilities with function fetchStart()', () => {
    const stationId = uuid();
    const periodStart = moment();
    const periodEnd = moment();
    const interval = '5 min';

    const action = actions.fetchStart(stationId, periodStart, periodEnd, interval);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false },
      payload: {
        stationId, periodStart, periodEnd, interval,
      },
      type: FETCH.START,
    });
  });
  test('should create an action pending while fetching stationAvailabilities with function fetchPending()', () => {
    const action = actions.fetchPending();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true },
      type: FETCH.PENDING,
    });
  });
  test('should create an action to notify the success of fetching stationAvailabilities with function fetchSuccess()', () => {
    const data = [AvailabilityBuilder.create().build(), AvailabilityBuilder.create().build()];

    const action = actions.fetchSuccess(data);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false },
      type: FETCH.SUCCESS,
      payload: data,
    });
  });
  test('should create an action when a failure occurred during fetching stationAvailabilities with function fetchFailure()', () => {
    const error = new Error('An error occurred.');

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
