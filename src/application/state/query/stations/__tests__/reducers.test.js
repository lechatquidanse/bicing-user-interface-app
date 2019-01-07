import reducer, { INITIAL_STATE } from 'application/state/query/stations/reducers';
import { FETCH } from 'application/state/query/stations/types';

describe('application/state/query/stations/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  test('should not affect state for an unknown action type', () => {
    expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual(INITIAL_STATE);
  });

  test('should affect state for action with type defining a fetch start', () => {
    const isFetching = false;
    const itineraryStep = 0;
    const latitude = 41.213;
    const longitude = 2.134;
    const limit = 200;

    expect(reducer(INITIAL_STATE, {
      type: FETCH.START,
      meta: { isFetching, itineraryStep },
      payload: { latitude, longitude, limit },
    })).toEqual({
      itinerarySteps: [{
        data: undefined,
        error: false,
        isFetching,
        itineraryStep,
        latitude,
        longitude,
        limit,
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
          itineraryStep,
          latitude: 20.213,
          longitude: 9.134,
          limit: 1200,
        },
      ],
    };
    const isFetching = true;
    const latitude = 41.213;
    const longitude = 2.134;
    const limit = 200;

    expect(reducer(existingState, {
      type: FETCH.START,
      payload: { latitude, longitude, limit },
      meta: { isFetching, itineraryStep },
    })).toEqual({
      itinerarySteps: [{
        data: undefined,
        error: false,
        isFetching,
        itineraryStep,
        latitude,
        longitude,
        limit,
      }],
    });
  });

  test('should affect state for action with type defining a fetch pending for existing step', () => {
    const error = false;
    const itineraryStep = 3;
    const latitude = 41.213;
    const longitude = 2.134;
    const limit = 200;

    const existingState = {
      itinerarySteps: [
        {
          data: undefined,
          error,
          isFetching: false,
          itineraryStep,
          latitude,
          longitude,
          limit,
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
          itineraryStep,
          latitude,
          longitude,
          limit,
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
          itineraryStep: 0,
          latitude: 41.213,
          longitude: 2.134,
          limit: 200,
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
    const latitude = 41.213;
    const longitude = 2.134;
    const limit = 200;

    const existingState = {
      itinerarySteps: [
        {
          data: undefined,
          error,
          isFetching: true,
          itineraryStep,
          latitude,
          longitude,
          limit,
        },
        {
          data: undefined,
          error,
          isFetching: true,
          itineraryStep,
          latitude,
          longitude,
          limit,
        },
      ],
    };

    const payload = ['station 1', 'station 2'];

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
          itineraryStep,
          latitude,
          longitude,
          limit,
        },
        {
          data: undefined,
          error,
          isFetching: true,
          itineraryStep,
          latitude,
          longitude,
          limit,
        },
      ],
    });
  });

  test('should not affect state for action with type defining a fetch success for non existing step', () => {
    const existingState = {
      itinerarySteps: [
        {
          data: ['station 1', 'station 2'],
          error: false,
          isFetching: false,
          itineraryStep: 0,
          latitude: 41.213,
          longitude: 2.134,
          limit: 200,
        },
      ],
    };

    expect(reducer(existingState, {
      type: FETCH.SUCCESS,
      payload: ['station 10'],
      meta: { isFetching: false, itineraryStep: 1 },
    })).toEqual(existingState);
  });

  test('should affect state for action with type error a fetch error for existing step', () => {
    const error = false;
    const itineraryStep = 3;
    const latitude = 41.213;
    const longitude = 2.134;
    const limit = 200;

    const existingState = {
      itinerarySteps: [
        {
          data: undefined,
          error,
          isFetching: true,
          itineraryStep,
          latitude,
          longitude,
          limit,
        },
        {
          data: undefined,
          error,
          isFetching: true,
          itineraryStep,
          latitude,
          longitude,
          limit,
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
          itineraryStep,
          latitude,
          longitude,
          limit,
        },
        {
          data: undefined,
          error: false,
          isFetching: true,
          itineraryStep,
          latitude,
          longitude,
          limit,
        },
      ],
    });
  });

  test('should not affect state for action with type defining a fetch error for non existing step', () => {
    const existingState = {
      itinerarySteps: [
        {
          data: ['station 1', 'station 2'],
          error: false,
          isFetching: false,
          itineraryStep: 0,
          latitude: 41.213,
          longitude: 2.134,
          limit: 200,
        },
      ],
    };

    expect(reducer(existingState, {
      type: FETCH.SUCCESS,
      error: true,
      payload: 'error for station 10',
      meta: { isFetching: false, itineraryStep: 1 },
    })).toEqual(existingState);
  });
});
