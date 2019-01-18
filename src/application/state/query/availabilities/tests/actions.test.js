import * as actions from 'application/state/query/availabilities/actions';
import AvailabilityBuilder
  from 'application/state/query/availabilities/tests/support/AvailabilityBuilder';
import { FETCH } from 'application/state/query/availabilities/types';
import { isError, isFSA } from 'flux-standard-action';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

describe('application/state/query/availabilities/actions', () => {
  test('should create an action to start fetching availabilities with function fetchStart() and parameters', () => {
    const itineraryStep = 0;
    const itineraryAt = moment();
    const periodStartAt = moment();
    const periodEndAt = moment();
    const interval = '5T';
    const stationIds = [uuid(), uuid()];

    const action = actions.fetchStart(
      itineraryStep,
      itineraryAt,
      periodStartAt,
      periodEndAt,
      interval,
      stationIds,
    );

    expect(isFSA(action)).toEqual(true);
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false, itineraryStep },
      payload: {
        itineraryAt, periodStartAt, periodEndAt, interval, stationIds,
      },
      type: FETCH.START,
    });
  });
  test('should create an action pending while fetching availabilities with function fetchPending()', () => {
    const itineraryStep = 2;
    const action = actions.fetchPending(itineraryStep);

    expect(isFSA(action)).toEqual(true);
    expect(action).toEqual({
      error: false,
      meta: { isFetching: true, itineraryStep },
      type: FETCH.PENDING,
    });
  });
  test('should create an action to notify the success of fetching availabilities with function fetchSuccess()', () => {
    const itineraryStep = 1;
    const data = [AvailabilityBuilder.create(), AvailabilityBuilder.create()];
    const action = actions.fetchSuccess(itineraryStep, data);

    expect(isFSA(action)).toEqual(true);
    expect(action).toEqual({
      error: false,
      meta: { isFetching: false, itineraryStep },
      type: FETCH.SUCCESS,
      payload: data,
    });
  });
  test('should create an action when a failure occurred during fetching availabilities with function fetchFailure()', () => {
    const itineraryStep = 1;
    const error = new Error('An error occurred.');

    const action = actions.fetchFailure(itineraryStep, error);

    expect(isError(action)).toEqual(true);
    expect(action).toEqual({
      error: true,
      meta: { isFetching: false, itineraryStep },
      type: FETCH.FAILURE,
      payload: error,
    });
  });
});
