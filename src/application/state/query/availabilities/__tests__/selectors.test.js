import * as selectors from 'application/state/query/availabilities/selectors';
import { v4 as uuid } from 'uuid';

describe('application/state/query/availabilities/selectors', () => {
  test('it can return an availability by its stationId and Itinerary step', () => {
    const itineraryStep = 0;
    const stationId = uuid();
    const availability = { id: stationId, status: 'OPENED' };

    const data = [availability, { id: uuid(), status: 'CLOSED' }];
    const state = {
      query: {
        availabilities: {
          itinerarySteps: [
            { itineraryStep, data },
            { itineraryStep: 2, data: undefined }],
        },
      },
    };

    expect(selectors.availabilityByItineraryStepAndId(state, itineraryStep, stationId))
      .toEqual(availability);
  });
  test('it can return error flag by Itinerary step', () => {
    const itineraryStep = 2;
    const state = {
      query: {
        availabilities: {
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
        availabilities: {
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
        availabilities: {
          itinerarySteps: [
            { isFetching: false, itineraryStep },
            { isFetching: true, itineraryStep: 3 },
          ],
        },
      },
    };

    expect(selectors.isFetchingByItineraryStep(state, itineraryStep)).toBeFalsy();
  });

  test('it can return periodStart by Itinerary step', () => {
    const periodStart = '2017-08-08 12:12:12';
    const itineraryStep = 2;
    const state = {
      query: {
        availabilities: {
          itinerarySteps: [
            { periodStart: '200-01-01 00:00:01', itineraryStep: 3 },
            { periodStart, itineraryStep },
          ],
        },
      },
    };

    expect(selectors.periodStartByItineraryStep(state, itineraryStep)).toEqual(periodStart);
  });

  test('it can return periodEnd by Itinerary step', () => {
    const periodEnd = '2017-08-08 12:12:12';
    const itineraryStep = 1;
    const state = {
      query: {
        availabilities: {
          itinerarySteps: [
            { periodEnd: '200-01-01 00:00:01', itineraryStep: 3 },
            { periodEnd, itineraryStep },
          ],
        },
      },
    };

    expect(selectors.periodEndByItineraryStep(state, itineraryStep)).toEqual(periodEnd);
  });

  test('it can return interval by Itinerary step', () => {
    const interval = '10T';
    const itineraryStep = 0;
    const state = {
      query: {
        availabilities: {
          itinerarySteps: [
            { interval, itineraryStep },
            { interval: '5T', itineraryStep: 1 },
          ],
        },
      },
    };

    expect(selectors.intervalByItineraryStep(state, itineraryStep)).toEqual(interval);
  });
  test('it can return stationId by Itinerary step', () => {
    const stationIds = [uuid(), uuid(), uuid()];
    const itineraryStep = 0;
    const state = {
      query: {
        availabilities: {
          itinerarySteps: [
            { stationIds, itineraryStep },
            { stationIds: [], itineraryStep: 1 },
          ],
        },
      },
    };

    expect(selectors.stationIdsByItineraryStep(state, itineraryStep)).toEqual(stationIds);
  });

  test('it can return an availability status by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const status = 'CLOSED';
    const data = [
      { id: stationId, status },
      { id: uuid(), status: 'OPENED' },
    ];
    const itineraryStep = 0;
    const state = {
      query: {
        availabilities: {
          itinerarySteps: [
            { data, itineraryStep },
            { data: undefined, itineraryStep: 1 },
          ],
        },
      },
    };

    expect(selectors.statusByItineraryStepAndStationId(state, itineraryStep, stationId))
      .toEqual(status);
  });

  test('it can return an availability available bike number by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const availableBikeNumber = 23;
    const data = [
      { id: uuid(), availableBikeNumber: 12 },
      { id: stationId, availableBikeNumber },
    ];
    const itineraryStep = 0;
    const state = {
      query: {
        availabilities: {
          itinerarySteps: [
            { data, itineraryStep },
            { data: undefined, itineraryStep: 1 },
          ],
        },
      },
    };

    expect(selectors.availableBikeNumberByItineraryStepAndStationId(
      state,
      itineraryStep,
      stationId,
    )).toEqual(availableBikeNumber);
  });
  test('it can return an availability available bike number by its stationId and Itinerary step', () => {
    const stationId = uuid();
    const availableSlotNumber = 5;
    const data = [
      { id: uuid(), availableSlotNumber: 12 },
      { id: stationId, availableSlotNumber },
    ];
    const itineraryStep = 0;
    const state = {
      query: {
        availabilities: {
          itinerarySteps: [
            { data, itineraryStep },
            { data: undefined, itineraryStep: 1 },
          ],
        },
      },
    };

    expect(selectors.availableSlotNumberByItineraryStepAndStationId(
      state,
      itineraryStep,
      stationId,
    )).toEqual(availableSlotNumber);
  });
});
