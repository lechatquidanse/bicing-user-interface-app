import * as selectors from 'application/state/query/availabilities/selectors';
import AvailabilityBuilder
  from 'application/state/query/availabilities/tests/support/AvailabilityBuilder';
import ItineraryStepBuilder
  from 'application/state/query/availabilities/tests/support/ItineraryStepBuilder';
import StateBuilder from 'application/state/query/availabilities/tests/support/StateBuilder';
import { v4 as uuid } from 'uuid';

describe('application/state/query/availabilities/selectors', () => {
  test('it can return an availability by its stationId and Itinerary step', () => {
    const itineraryStep = 3;
    const stationId = uuid();

    const availability = AvailabilityBuilder.create().withStationId(stationId).build();

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withAvailabilities(availability, AvailabilityBuilder.create().build())
          .build(),
      )
      .build();

    expect(selectors.availabilityByItineraryStepAndId(itineraryStep, stationId, state))
      .toEqual(availability);
  });
  test('it can not return an availability if Itinerary step does not exist', () => {
    const stationId = uuid();

    const state = StateBuilder.create()
      .withItinerarySteps(ItineraryStepBuilder.create()
        .withItineraryStep(1)
        .withAvailabilities(AvailabilityBuilder.create().withStationId(stationId).build())
        .build())
      .build();

    expect(selectors.availabilityByItineraryStepAndId(99, stationId, state))
      .toBeUndefined();
  });
  test('it can not return an availability if station id does not exist', () => {
    const itineraryStep = 3;

    const state = StateBuilder.create()
      .withItinerarySteps(ItineraryStepBuilder.create()
        .withItineraryStep(3)
        .withAvailabilities(AvailabilityBuilder.create().withStationId(uuid()).build())
        .build())
      .build();

    expect(selectors.availabilityByItineraryStepAndId(itineraryStep, uuid(), state))
      .toBeUndefined();
  });
  test('it can return error flag by Itinerary step', () => {
    const itineraryStep = 1;

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withIsError(true)
          .build(),
      )
      .build();

    expect(selectors.isErrorByItineraryStep(itineraryStep)(state)).toEqual(true);
  });
  test('it can return an Error message by Itinerary step', () => {
    const itineraryStep = 1;
    const error = new Error('an error occurred');

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withIsError(true)
          .withError(error)
          .build(),
      )
      .build();

    expect(selectors.errorByItineraryStep(itineraryStep)(state)).toEqual('an error occurred');
  });
  test('it can return an Error message by Itinerary step if isError is false', () => {
    const itineraryStep = 1;
    const error = new Error('an error occurred');

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withIsError(false)
          .withError(error)
          .build(),
      )
      .build();

    expect(selectors.errorByItineraryStep(itineraryStep)(state)).toBeUndefined();
  });
  test('it can return an Error message by Itinerary step if error is not an Error Type', () => {
    const itineraryStep = 1;
    const error = 'not an Error type';

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withIsError(true)
          .withError(error)
          .build(),
      )
      .build();

    expect(selectors.errorByItineraryStep(itineraryStep)(state)).toBeUndefined();
  });

  test('it can return isFetching flag by Itinerary step', () => {
    const itineraryStep = 1;
    const isFetching = true;

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withIsFetching(isFetching)
          .build(),
      )
      .build();

    expect(selectors.isFetchingByItineraryStep(itineraryStep)(state)).toEqual(isFetching);
  });
  test('it can return false isFetching flag if Itinerary step does not exist', () => {
    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().withItineraryStep(1).withIsFetching(true).build(),
      )
      .build();

    expect(selectors.isFetchingByItineraryStep(99)(state)).toEqual(false);
  });

  test('it can return all itinerarySteps', () => {
    const itineraryStep1 = 0;
    const itineraryStep2 = 1;
    const itineraryStep3 = 2;

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().withItineraryStep(itineraryStep1).build(),
        ItineraryStepBuilder.create().withItineraryStep(itineraryStep2).build(),
        ItineraryStepBuilder.create().withItineraryStep(itineraryStep3).build(),
      ).build();

    expect(selectors.itinerarySteps(state))
      .toEqual([itineraryStep1, itineraryStep2, itineraryStep3]);
  });

  test('it can return periodStartAt by Itinerary step', () => {
    const periodStartAt = '2017-08-08 12:12:12';
    const itineraryStep = 2;
    const state = StateBuilder.create()
      .withItinerarySteps(ItineraryStepBuilder.create()
        .withItineraryStep(itineraryStep)
        .withPeriodStartAt(periodStartAt)
        .build())
      .build();

    expect(selectors.periodStartAtByItineraryStep(itineraryStep)(state)).toEqual(periodStartAt);
  });
  //
  test('it can return periodEndAt by Itinerary step', () => {
    const periodEndAt = '2017-08-08 12:12:12';
    const itineraryStep = 1;
    const state = StateBuilder.create()
      .withItinerarySteps(ItineraryStepBuilder.create()
        .withItineraryStep(itineraryStep)
        .withPeriodEndAt(periodEndAt)
        .build())
      .build();

    expect(selectors.periodEndAtByItineraryStep(itineraryStep)(state)).toEqual(periodEndAt);
  });
  test('it can return interval by Itinerary step', () => {
    const interval = '10T';
    const itineraryStep = 5;
    const state = StateBuilder.create()
      .withItinerarySteps(ItineraryStepBuilder.create()
        .withItineraryStep(itineraryStep)
        .withInterval(interval)
        .build())
      .build();

    expect(selectors.intervalByItineraryStep(itineraryStep)(state)).toEqual(interval);
  });
  test('it can return itineraryAt by Itinerary step', () => {
    const itineraryAt = '2016-04-28 14:34:00';
    const itineraryStep = 0;
    const state = StateBuilder.create()
      .withItinerarySteps(ItineraryStepBuilder.create()
        .withItineraryStep(itineraryStep)
        .withItineraryAt(itineraryAt)
        .build())
      .build();

    expect(selectors.itineraryAtByItineraryStep(itineraryStep)(state)).toEqual(itineraryAt);
  });
  test('it can return an availability status by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const status = 'CLOSED';
    const itineraryStep = 3;

    const availability = AvailabilityBuilder.create()
      .withStationId(stationId)
      .withStatus(status)
      .build();

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withAvailabilities(availability, AvailabilityBuilder.create().build())
          .build(),
      )
      .build();

    expect(selectors.statusByItineraryStepAndStationId(itineraryStep, stationId)(state))
      .toEqual(status);
  });

  test('it can return an availability available bike number by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const itineraryStep = 1;
    const availableBikeNumber = 23;

    const availability = AvailabilityBuilder.create()
      .withStationId(stationId)
      .withAvailableBikeNumber(availableBikeNumber)
      .build();

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withAvailabilities(availability, AvailabilityBuilder.create().build())
          .build(),
      )
      .build();

    expect(selectors.availableBikeNumberByItineraryStepAndStationId(
      itineraryStep,
      stationId,
    )(state)).toEqual(availableBikeNumber);
  });
  test('it can return an availability available bike number by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const itineraryStep = 1;
    const availableSlotNumber = 5;

    const availability = AvailabilityBuilder.create()
      .withStationId(stationId)
      .withAvailableSlotNumber(availableSlotNumber)
      .build();

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withAvailabilities(availability, AvailabilityBuilder.create().build())
          .build(),
      )
      .build();

    expect(selectors.availableSlotNumberByItineraryStepAndStationId(
      itineraryStep,
      stationId,
    )(state)).toEqual(availableSlotNumber);
  });
});
