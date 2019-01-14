import * as selectors from 'application/state/query/stations/selectors';
import ItineraryStepBuilder
  from 'application/state/query/stations/tests/support/ItineraryStepBuilder';
import StateBuilder from 'application/state/query/stations/tests/support/StateBuilder';
import StationBuilder from 'application/state/query/stations/tests/support/StationBuilder';
import { v4 as uuid } from 'uuid';

describe('application/state/query/stations/selectors', () => {
  test('it can return a station by its stationId and Itinerary step', () => {
    const itineraryStep = 3;
    const stationId = uuid();

    const station = StationBuilder.create().withStationId(stationId).build();

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withStations(station, StationBuilder.create().build())
          .build(),
      )
      .build();

    expect(selectors.stationByItineraryStepAndId(itineraryStep, stationId, state))
      .toEqual(station);
  });

  test('it can not return a station if Itinerary step does not exist', () => {
    const stationId = uuid();

    const state = StateBuilder.create()
      .withItinerarySteps(ItineraryStepBuilder.create()
        .withItineraryStep(1)
        .withStations(StationBuilder.create().withStationId(stationId).build())
        .build())
      .build();

    expect(selectors.stationByItineraryStepAndId(99, stationId, state))
      .toBeUndefined();
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

  test('it can return latitude by Itinerary step', () => {
    const latitude = 41.322;
    const itineraryStep = 2;

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withLatitude(latitude)
          .build(),
      )
      .build();

    expect(selectors.latitudeByItineraryStep(itineraryStep)(state)).toEqual(latitude);
  });

  test('it can return longitude by Itinerary step', () => {
    const longitude = 1.322;
    const itineraryStep = 1;
    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withLongitude(longitude)
          .build(),
      )
      .build();

    expect(selectors.longitudeByItineraryStep(itineraryStep)(state)).toEqual(longitude);
  });

  test('it can return limit by Itinerary step', () => {
    const limit = 1000;
    const itineraryStep = 3;
    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create().build(),
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withLimit(limit)
          .build(),
      )
      .build();

    expect(selectors.limitByItineraryStep(itineraryStep)(state)).toEqual(limit);
  });
  test('it can return stationIds by Itinerary step', () => {
    const stationId1 = uuid();
    const stationId2 = uuid();
    const itineraryStep = 0;

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withStations(
            StationBuilder.create().withStationId(stationId1).build(),
            StationBuilder.create().withStationId(stationId2).build(),
          )
          .build(),
      )
      .build();

    expect(selectors.stationIdsByItineraryStep(itineraryStep)(state))
      .toEqual([stationId1, stationId2]);
  });

  test('it can return a station name by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const name = 'Rocafort';
    const itineraryStep = 0;

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withStations(
            StationBuilder.create().withStationId(stationId).withName(name).build(),
            StationBuilder.create().build(),
          )
          .build(),
      )
      .build();

    expect(selectors.nameByItineraryStepAndStationId(itineraryStep, stationId)(state))
      .toEqual(name);
  });
  test('it can return a station zipCode by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const zipCode = '08024';
    const itineraryStep = 5;

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withStations(
            StationBuilder.create().withStationId(stationId).withZipCode(zipCode).build(),
            StationBuilder.create().build(),
          )
          .build(),
      )
      .build();

    expect(selectors.zipCodeByItineraryStepAndStationId(itineraryStep, stationId)(state))
      .toEqual(zipCode);
  });
  test('it can return a station type by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const type = 'BIKE';
    const itineraryStep = 0;

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withStations(
            StationBuilder.create().withStationId(stationId).withType(type).build(),
            StationBuilder.create().build(),
          )
          .build(),
      )
      .build();

    expect(selectors.typeByItineraryStepAndStationId(itineraryStep, stationId)(state))
      .toEqual(type);
  });
  test('it can return a station latitude by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const latitude = 41.322;
    const itineraryStep = 0;

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withStations(
            StationBuilder.create().withStationId(stationId).withLatitude(latitude).build(),
            StationBuilder.create().build(),
          )
          .build(),
      )
      .build();

    expect(selectors.latitudeByItineraryStepAndStationId(itineraryStep, stationId)(state))
      .toEqual(latitude);
  });
  test('it can return a station longitude by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const longitude = 1.322;
    const itineraryStep = 0;

    const state = StateBuilder.create()
      .withItinerarySteps(
        ItineraryStepBuilder.create()
          .withItineraryStep(itineraryStep)
          .withStations(
            StationBuilder.create().withStationId(stationId).withLongitude(longitude).build(),
            StationBuilder.create().build(),
          )
          .build(),
      )
      .build();

    expect(selectors.longitudeByItineraryStepAndStationId(itineraryStep, stationId)(state))
      .toEqual(longitude);
  });
});
