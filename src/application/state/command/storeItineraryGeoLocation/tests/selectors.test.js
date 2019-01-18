import * as selectors from 'application/state/command/storeItineraryGeoLocation/selectors';
import ItineraryStepBuilder
  from 'application/state/command/storeItineraryGeoLocation/tests/support/ItineraryStepBuilder';
import StateBuilder
  from 'application/state/command/storeItineraryGeoLocation/tests/support/StateBuilder';
import ByItineraryGeoLocationFilterBuilder
  from 'application/state/filter/tests/support/ByItineraryGeoLocationFilterBuilder';
import AppError from 'domain/errors/AppError';

let stateBuilder; let itineraryStepBuilder; let
  filterBuilder;

describe('application/state/command/storeItineraryGeoLocation/selectors', () => {
  test('it can return error flag by Itinerary step', () => {
    const itineraryStep = 1;

    const state = stateBuilder.withItinerarySteps(
      itineraryStepBuilder.build(),
      itineraryStepBuilder.withItineraryStep(itineraryStep).withIsError(true).build(),
    ).build();

    expect(selectors.isErrorByItineraryStep(itineraryStep)(state)).toEqual(true);
  });
  test('it can return an AppError public message by Itinerary step', () => {
    const itineraryStep = 1;
    const publicMessage = 'an error occurred with public message';

    const state = stateBuilder.withItinerarySteps(
      itineraryStepBuilder.build(),
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withIsError(true)
        .withError(new AppError('an error', publicMessage))
        .build(),
    ).build();

    expect(selectors.errorByItineraryStep(itineraryStep)(state)).toEqual(publicMessage);
  });
  test('it can not return an AppError public message by Itinerary step it error is not AppError Type', () => {
    const itineraryStep = 1;

    const state = stateBuilder.withItinerarySteps(
      itineraryStepBuilder.build(),
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withIsError(true)
        .withError(new Error('an error'))
        .build(),
    ).build();

    expect(selectors.errorByItineraryStep(itineraryStep)(state)).toBeUndefined();
  });
  test('it can not return an AppError public message by Itinerary step it isError is not true', () => {
    const itineraryStep = 1;

    const state = stateBuilder.withItinerarySteps(
      itineraryStepBuilder.build(),
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withIsError(false)
        .withError(new AppError('an error', 'an error occurred with public message'))
        .build(),
    ).build();

    expect(selectors.errorByItineraryStep(itineraryStep)(state)).toBeUndefined();
  });
  test('it can return latitude by itinerary step if itinerary step exists', async () => {
    const itineraryStep = 1;
    const latitude = 41.123;
    const filter = await filterBuilder.withLatitude(latitude).build();

    const state = stateBuilder.withItinerarySteps(
      itineraryStepBuilder.build(),
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withFilter(filter)
        .build(),
    ).build();

    expect(selectors.latitudeByItineraryStep(itineraryStep)(state)).toEqual(latitude);
  });
  test('it can not return latitude by itinerary step if itinerary step does not exist', async () => {
    const filter = await filterBuilder.withLatitude(41.123).build();

    const state = stateBuilder.withItinerarySteps(
      itineraryStepBuilder.build(),
      itineraryStepBuilder
        .withItineraryStep(1)
        .withFilter(filter)
        .build(),
    ).build();

    expect(selectors.latitudeByItineraryStep(999)(state)).toBeUndefined();
  });
  test('it can return longitude by itinerary step if itinerary step exists', async () => {
    const itineraryStep = 1;
    const longitude = 2.123;
    const filter = await filterBuilder.withLongitude(longitude).build();

    const state = stateBuilder.withItinerarySteps(
      itineraryStepBuilder.build(),
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withFilter(filter)
        .build(),
    ).build();

    expect(selectors.longitudeByItineraryStep(itineraryStep)(state)).toEqual(longitude);
  });
  test('it can not return longitude by itinerary step if itinerary step does not exist', async () => {
    const filter = await filterBuilder.withLongitude(2.123).build();

    const state = stateBuilder.withItinerarySteps(
      itineraryStepBuilder.build(),
      itineraryStepBuilder
        .withItineraryStep(1)
        .withFilter(filter)
        .build(),
    )
      .build();

    expect(selectors.longitudeByItineraryStep(999)(state)).toBeUndefined();
  });
  test('it can return limit by itinerary step if itinerary step exists', async () => {
    const itineraryStep = 1;
    const limit = 2000;
    const filter = await filterBuilder.withLimit(limit).build();

    const state = stateBuilder.withItinerarySteps(
      itineraryStepBuilder.build(),
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withFilter(filter)
        .build(),
    ).build();

    expect(selectors.limitByItineraryStep(itineraryStep)(state)).toEqual(limit);
  });
  test('it can not return longitude by itinerary step if itinerary step does not exist', async () => {
    const filter = await filterBuilder.withLimit(400).build();

    const state = stateBuilder.withItinerarySteps(
      itineraryStepBuilder.build(),
      itineraryStepBuilder
        .withItineraryStep(1)
        .withFilter(filter)
        .build(),
    )
      .build();

    expect(selectors.limitByItineraryStep(999)(state)).toBeUndefined();
  });
  beforeEach(async () => {
    stateBuilder = await StateBuilder.create();
    itineraryStepBuilder = await ItineraryStepBuilder.create();
    filterBuilder = await ByItineraryGeoLocationFilterBuilder.create();
  });
});
