import * as selectors from 'application/state/query/stations/selectors';
import { v4 as uuid } from 'uuid';

describe('application/state/query/stations/selectors', () => {
  test('it can return a station by its stationId and Itinerary step', () => {
    const itineraryStep = 0;
    const stationId = uuid();
    const station = { id: stationId, name: 'station 1' };

    const data = [station, { id: uuid(), name: 'station 2' }];
    const state = {
      query: {
        stations: {
          itinerarySteps: [
            { itineraryStep, data },
            { itineraryStep: 2, data: undefined }],
        },
      },
    };

    expect(selectors.stationByItineraryStepAndId(state, itineraryStep, stationId))
      .toEqual(station);
  });
  test('it can return error flag by Itinerary step', () => {
    const itineraryStep = 2;
    const state = {
      query: {
        stations: {
          itinerarySteps: [
            { error: true, itineraryStep },
            { error: false, itineraryStep: 3 },
          ],
        },
      },
    };

    expect(selectors.isErrorByItineraryStep(state, itineraryStep)).toBeTruthy();
  });
  test('it can return error by Itinerary step', () => {
    const itineraryStep = 1;
    const error = 'an error occurred';

    const state = {
      query: {
        stations: {
          itinerarySteps: [
            { error: true, itineraryStep, data: error },
            { error: false, itineraryStep: 3 },
          ],
        },
      },
    };

    expect(selectors.errorByItineraryStep(state, itineraryStep)).toEqual(error);
  });
  test('it can return isFetching flag by Itinerary step', () => {
    const itineraryStep = 2;
    const state = {
      query: {
        stations: {
          itinerarySteps: [
            { isFetching: false, itineraryStep },
            { isFetching: true, itineraryStep: 3 },
          ],
        },
      },
    };

    expect(selectors.isFetchingByItineraryStep(state, itineraryStep)).toBeFalsy();
  });

  test('it can return latitude by Itinerary step', () => {
    const latitude = 41.322;
    const itineraryStep = 2;
    const state = {
      query: {
        stations: {
          itinerarySteps: [
            { latitude: 10.0, itineraryStep: 3 },
            { latitude, itineraryStep },
          ],
        },
      },
    };

    expect(selectors.latitudeByItineraryStep(state, itineraryStep)).toEqual(latitude);
  });

  test('it can return longitude by Itinerary step', () => {
    const longitude = 1.322;
    const itineraryStep = 1;
    const state = {
      query: {
        stations: {
          itinerarySteps: [
            { longitude: 8.234, itineraryStep: 3 },
            { longitude, itineraryStep },
          ],
        },
      },
    };

    expect(selectors.longitudeByItineraryStep(state, itineraryStep)).toEqual(longitude);
  });

  test('it can return limit by Itinerary step', () => {
    const limit = 1000;
    const itineraryStep = 0;
    const state = {
      query: {
        stations: {
          itinerarySteps: [
            { limit, itineraryStep },
            { limit: 5, itineraryStep: 1 },
          ],
        },
      },
    };

    expect(selectors.limitByItineraryStep(state, itineraryStep)).toEqual(limit);
  });
  // test('it can return stationIds by Itinerary step', () => {
  //   const stationIds = [uuid(), uuid(), uuid()];
  //   const itineraryStep = 0;
  //   const state = {
  //     query: {
  //       availabilities: {
  //         itinerarySteps: [
  //           { stationIds, itineraryStep },
  //           { stationIds: [], itineraryStep: 1 }
  //         ]
  //       }
  //     }
  //   };
  //
  //   expect(selectors.stationIdsByItineraryStep(state, itineraryStep)).toEqual(stationIds);
  // });

  test('it can return a station name by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const name = 'Rocafort';
    const data = [
      { id: stationId, name },
      { id: uuid(), name: 'Catalunya' },
    ];
    const itineraryStep = 0;
    const state = {
      query: {
        stations: {
          itinerarySteps: [
            { data, itineraryStep },
            { data: undefined, itineraryStep: 1 },
          ],
        },
      },
    };

    expect(selectors.nameByItineraryStepAndStationId(state, itineraryStep, stationId))
      .toEqual(name);
  });
  test('it can return a station zipCode by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const zipCode = '08024';
    const data = [
      { id: stationId, zipCode },
      { id: uuid(), zipCode: '0823' },
    ];
    const itineraryStep = 0;
    const state = {
      query: {
        stations: {
          itinerarySteps: [
            { data, itineraryStep },
            { data: undefined, itineraryStep: 1 },
          ],
        },
      },
    };

    expect(selectors.zipCodeByItineraryStepAndStationId(state, itineraryStep, stationId))
      .toEqual(zipCode);
  });
  test('it can return a station type by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const type = 'BIKE';
    const data = [
      { id: stationId, type },
      { id: uuid(), type: 'ELECTRIC_BIKE' },
    ];
    const itineraryStep = 0;
    const state = {
      query: {
        stations: {
          itinerarySteps: [
            { data, itineraryStep },
            { data: undefined, itineraryStep: 1 },
          ],
        },
      },
    };

    expect(selectors.typeByItineraryStepAndStationId(state, itineraryStep, stationId))
      .toEqual(type);
  });
  test('it can return a station latitude by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const latitude = 41.322;
    const data = [
      { id: stationId, latitude },
      { id: uuid(), latitude: 23.23 },
    ];
    const itineraryStep = 0;
    const state = {
      query: {
        stations: {
          itinerarySteps: [
            { data, itineraryStep },
            { data: undefined, itineraryStep: 1 },
          ],
        },
      },
    };

    expect(selectors.latitudeByItineraryStepAndStationId(state, itineraryStep, stationId))
      .toEqual(latitude);
  });
  test('it can return a station longitude by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const longitude = 1.322;
    const data = [
      { id: stationId, longitude },
      { id: uuid(), longitude: 23.23 },
    ];
    const itineraryStep = 0;
    const state = {
      query: {
        stations: {
          itinerarySteps: [
            { data, itineraryStep },
            { data: undefined, itineraryStep: 1 },
          ],
        },
      },
    };

    expect(selectors.longitudeByItineraryStepAndStationId(state, itineraryStep, stationId))
      .toEqual(longitude);
  });
});
