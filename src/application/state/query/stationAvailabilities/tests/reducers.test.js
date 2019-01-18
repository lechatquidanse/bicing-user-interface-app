import * as actions from 'application/state/query/stationAvailabilities/actions';
import reducer from 'application/state/query/stationAvailabilities/reducers';
import StateBuilder from 'application/state/query/stationAvailabilities/tests/support/StateBuilder';
import AvailabilityBuilder from 'application/state/query/availabilities/tests/support/AvailabilityBuilder';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

let stateBuilder; let
  availabilityBuilder;

describe('application/state/query/stationAvailabilities/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(stateBuilder
      .withNoStationAvailabilities()
      .withIsError(false)
      .withIsFetching(false)
      .build());
  });
  test('should not affect state for an unknown action type', () => {
    const initialState = stateBuilder.build();

    expect(reducer(initialState, { type: 'NOT_EXISTING' })).toEqual(initialState);
  });
  test('should affect state for action with type defining a fetch start', () => {
    const initialState = stateBuilder.build();
    const expectedState = stateBuilder
      .withNoStationAvailabilities()
      .withIsError(false)
      .withIsFetching(false)
      .build();

    expect(reducer(initialState, actions.fetchStart(
      uuid(),
      moment(),
      moment(),
      '5 min',
    ))).toEqual(expectedState);
  });
  test('should affect state for action with type defining a fetch pending for existing step', () => {
    const initialState = stateBuilder
      .withIsFetching(false)
      .build();
    const expectedState = stateBuilder
      .withNoStationAvailabilities()
      .withIsError(false)
      .withIsFetching(true)
      .build();

    expect(reducer(initialState, actions.fetchPending())).toEqual(expectedState);
  });
  test('should affect state for action with type success a fetch success for existing step', () => {
    const initialState = stateBuilder
      .withNoStationAvailabilities()
      .withIsFetching(true)
      .build();

    const stationAvailability = availabilityBuilder.build();

    const expectedState = stateBuilder
      .withStationAvailabilities(stationAvailability)
      .withIsError(false)
      .withIsFetching(false)
      .build();

    const action = actions.fetchSuccess([stationAvailability]);

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  test('should affect state for action with type error a fetch error for existing step', () => {
    const initialState = stateBuilder
      .withStationAvailabilities(availabilityBuilder.build())
      .withIsError(false)
      .withIsFetching(true)
      .build();

    const error = new Error('An error occurred');

    const expectedState = stateBuilder
      .withError(error)
      .withIsError(true)
      .withIsFetching(false)
      .build();

    expect(reducer(initialState, actions.fetchFailure(error))).toEqual(expectedState);
  });
  beforeEach(() => {
    stateBuilder = StateBuilder.create().withIsReduced(true);
    availabilityBuilder = AvailabilityBuilder.create();
  });
});
