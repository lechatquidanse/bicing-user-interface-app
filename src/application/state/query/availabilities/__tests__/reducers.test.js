import reducer, { INITIAL_STATE } from 'application/state/query/availabilities/reducers';
import { FETCH } from 'application/state/query/availabilities/types';
import { v4 as uuid } from 'uuid';

describe('application/state/query/availabilities/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  test('should not affect state for an unknown action type', () => {
    expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual(INITIAL_STATE);
  });

  test('should affect state for action with type defining a fetch start with step not existing', () => {
    const isFetching = false;
    const itineraryStep = 0;
    const itineraryAt = '2017-08-08 12:22:12';
    const periodStartAt = '2017-08-08 12:12:12';
    const periodEndAt = '2017-08-08 12:32:12';
    const interval = '5T';
    const stationId1 = uuid();
    const stationId2 = uuid();
    const stationIds = [stationId1, stationId2];

    expect(reducer(INITIAL_STATE, {
      type: FETCH.START,
      payload: {
        periodStartAt, periodEndAt, interval, stationIds,
      },
      meta: { isFetching, itineraryStep, itineraryAt },
    })).toEqual({
      itinerarySteps: [{
        data: undefined,
        error: false,
        isFetching,
        interval,
        itineraryAt,
        itineraryStep,
        periodStartAt,
        periodEndAt,
        stationIds,
      }],
    });
  });

  test('should affect state for action with type defining a fetch start with step existing', () => {
    const itineraryStep = 0;
    const existingState = {
      itinerarySteps: [
        {
          data: undefined,
          error: false,
          isFetching: false,
          interval: '10T',
          itineraryAt: '2002-08-08 12:22:12',
          itineraryStep,
          periodStartAt: '2002-06-08 12:22:12',
          periodEndAt: '2002-09-08 12:22:12',
          stationIds: [uuid(), uuid(), uuid(), uuid()],
        },
      ],
    };
    const isFetching = true;
    const itineraryAt = '2017-08-08 12:22:12';
    const periodStartAt = '2017-08-08 12:12:12';
    const periodEndAt = '2017-08-08 12:32:12';
    const interval = '5T';
    const stationId1 = uuid();
    const stationId2 = uuid();
    const stationIds = [stationId1, stationId2];

    expect(reducer(existingState, {
      type: FETCH.START,
      payload: {
        periodStartAt, periodEndAt, interval, stationIds,
      },
      meta: { isFetching, itineraryStep, itineraryAt },
    })).toEqual({
      itinerarySteps: [{
        data: undefined,
        error: false,
        isFetching,
        interval,
        itineraryAt,
        itineraryStep,
        periodStartAt,
        periodEndAt,
        stationIds,
      }],
    });
  });

  test('should affect state for action with type defining a fetch pending for existing step', () => {
    const error = false;
    const itineraryStep = 3;
    const itineraryAt = '2017-08-08 12:22:12';
    const periodStartAt = '2017-08-08 12:12:12';
    const periodEndAt = '2017-08-08 12:32:12';
    const interval = '5T';
    const stationId1 = uuid();
    const stationId2 = uuid();
    const stationIds = [stationId1, stationId2];

    const existingState = {
      itinerarySteps: [
        {
          data: undefined,
          error,
          isFetching: false,
          interval,
          itineraryAt,
          itineraryStep,
          periodStartAt,
          periodEndAt,
          stationIds,
        },
      ],
    };

    expect(reducer(existingState, {
      type: FETCH.PENDING,
      meta: { isFetching: true, itineraryStep },
    })).toEqual({
      itinerarySteps: [
        {
          data: undefined,
          error,
          isFetching: true,
          interval,
          itineraryAt,
          itineraryStep,
          periodStartAt,
          periodEndAt,
          stationIds,
        },
      ],
    });
  });

  test('should not affect state for action with type defining a fetch pending for non existing step', () => {
    const existingState = {
      itinerarySteps: [
        {
          data: undefined,
          error: false,
          isFetching: false,
          interval: '5T',
          itineraryAt: '2017-09-08 12:22:12',
          itineraryStep: 0,
          periodStartAt: '2017-08-08 12:32:12',
          periodEndAt: '2017-10-08 12:32:12',
          stationIds: [uuid(), uuid()],
        },
      ],
    };

    expect(reducer(existingState, {
      type: FETCH.PENDING,
      meta: { isFetching: true, itineraryStep: 1 },
    })).toEqual(existingState);
  });

  test('should affect state for action with type success a fetch pending for existing step', () => {
    const error = false;
    const itineraryStep = 3;
    const itineraryAt = '2017-08-08 12:22:12';
    const periodStartAt = '2017-08-08 12:12:12';
    const periodEndAt = '2017-08-08 12:32:12';
    const interval = '5T';
    const stationId1 = uuid();
    const stationId2 = uuid();
    const stationIds = [stationId1, stationId2];

    const existingState = {
      itinerarySteps: [
        {
          data: undefined,
          error,
          isFetching: true,
          interval,
          itineraryAt,
          itineraryStep,
          periodStartAt,
          periodEndAt,
          stationIds,
        },
        {
          data: undefined,
          error,
          isFetching: true,
          interval,
          itineraryAt,
          itineraryStep: 10,
          periodStartAt,
          periodEndAt,
          stationIds,
        },
      ],
    };

    const payload = ['availability 1', 'availability 2'];

    expect(reducer(existingState, {
      type: FETCH.SUCCESS,
      payload,
      meta: { isFetching: false, itineraryStep },
    })).toEqual({
      itinerarySteps: [
        {
          data: payload,
          error,
          isFetching: false,
          interval,
          itineraryAt,
          itineraryStep,
          periodStartAt,
          periodEndAt,
          stationIds,
        },
        {
          data: undefined,
          error,
          isFetching: true,
          interval,
          itineraryAt,
          itineraryStep: 10,
          periodStartAt,
          periodEndAt,
          stationIds,
        },
      ],
    });
  });

  test('should not affect state for action with type defining a fetch success for non existing step', () => {
    const existingState = {
      itinerarySteps: [
        {
          data: ['availability 1', 'availability 2'],
          error: false,
          isFetching: false,
          interval: '5T',
          itineraryAt: '2017-09-08 12:22:12',
          itineraryStep: 0,
          periodStartAt: '2017-08-08 12:32:12',
          periodEndAt: '2017-10-08 12:32:12',
          stationIds: [uuid(), uuid()],
        },
      ],
    };

    expect(reducer(existingState, {
      type: FETCH.SUCCESS,
      payload: ['availability 10'],
      meta: { isFetching: false, itineraryStep: 1 },
    })).toEqual(existingState);
  });

  test('should affect state for action with type error a fetch pending for existing step', () => {
    const itineraryStep = 3;
    const itineraryAt = '2017-08-08 12:22:12';
    const periodStartAt = '2017-08-08 12:12:12';
    const periodEndAt = '2017-08-08 12:32:12';
    const interval = '5T';
    const stationId1 = uuid();
    const stationId2 = uuid();
    const stationIds = [stationId1, stationId2];

    const existingState = {
      itinerarySteps: [
        {
          data: undefined,
          error: false,
          isFetching: true,
          interval,
          itineraryAt,
          itineraryStep,
          periodStartAt,
          periodEndAt,
          stationIds,
        },
        {
          data: undefined,
          error: false,
          isFetching: true,
          interval,
          itineraryAt,
          itineraryStep: 10,
          periodStartAt,
          periodEndAt,
          stationIds,
        },
      ],
    };

    const payload = 'An error occurred during fetch.';

    expect(reducer(existingState, {
      type: FETCH.FAILURE,
      payload,
      error: true,
      meta: { isFetching: false, itineraryStep },
    })).toEqual({
      itinerarySteps: [
        {
          data: payload,
          error: true,
          isFetching: false,
          interval,
          itineraryAt,
          itineraryStep,
          periodStartAt,
          periodEndAt,
          stationIds,
        },
        {
          data: undefined,
          error: false,
          isFetching: true,
          interval,
          itineraryAt,
          itineraryStep: 10,
          periodStartAt,
          periodEndAt,
          stationIds,
        },
      ],
    });
  });

  test('should not affect state for action with type defining a fetch error for non existing step', () => {
    const existingState = {
      itinerarySteps: [
        {
          data: ['availability 1', 'availability 2'],
          error: false,
          isFetching: false,
          interval: '5T',
          itineraryAt: '2017-09-08 12:22:12',
          itineraryStep: 0,
          periodStartAt: '2017-08-08 12:32:12',
          periodEndAt: '2017-10-08 12:32:12',
          stationIds: [uuid(), uuid()],
        },
      ],
    };

    expect(reducer(existingState, {
      type: FETCH.SUCCESS,
      error: true,
      payload: 'error for availability 10',
      meta: { isFetching: false, itineraryStep: 1 },
    })).toEqual(existingState);
  });
});
