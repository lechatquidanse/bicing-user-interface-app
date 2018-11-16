import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { FETCH } from 'application/state/query/stationAvailabilities/types';
import { fetchPending, fetchSuccess, fetchFailure } from 'application/state/query/stationAvailabilities/actions';
import operation from 'application/state/query/stationAvailabilities/operations';
import { fetch } from 'application/state/query/stationAvailabilities/operations';
import HttpStationAvailabilityQuery from 'infrastructure/bicingApi/HttpStationAvailabilityQuery';
import * as Types from 'application/state/query/stationAvailabilities/types';

describe('application/state/query/stationAvailabilities/operations', () => {
    it('should wait for a fetch start event to fecth with operation()', () => {
        testSaga(operation)
            .next()
            .takeLatestEffect(FETCH.START, fetch);
    });

    it('should dispatch a fetchPending action with fetch()', () => {
        testSaga(fetch)
            .next()
            .put(fetchPending());
    });

    it('should fetch expected availabilities for a station with fetch()', () => {
        const stationId = 'cc90eb4e-4988-4443-aedf-6464f79eeb12';
        const periodStart = '2016-08-11 14:15:00';
        const periodEnd = '2016-08-13 16:15:00';
        const interval = '5 minute';

        const fakeStationAvailabilities = [
            {
                "interval": "2018-11-05 14:45:00",
                "available_bike_avg": "20.0000000000000000",
                "available_bike_min": 20,
                "available_bike_max": 20,
                "available_slot_avg": "9.0000000000000000",
                "available_slot_min": 9,
                "available_slot_max": 9
            },
            {
                "interval": "2018-11-05 14:50:00",
                "available_bike_avg": "20.0000000000000000",
                "available_bike_min": 19,
                "available_bike_max": 21,
                "available_slot_avg": "9.0000000000000000",
                "available_slot_min": 8,
                "available_slot_max": 10
            },
        ];

        const action = { type: Types.FETCH.START, payload: { stationId, periodStart, periodEnd, interval } };

        // @todo use real stub/mock with https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#srcsetuptestsjs-1
        return expectSaga(fetch, action)
            .provide([
                [matchers.call.fn(
                    HttpStationAvailabilityQuery.find, stationId, periodStart, periodEnd, interval),
                    fakeStationAvailabilities
                ],
            ])
            .put(fetchSuccess(fakeStationAvailabilities))
            .run();
    });

    it('should handle error when api call failed in fetch()', () => {
        const error = new Error('error_api_call');
        const stationId = 'cc90eb4e-4988-4443-aedf-6464f79eeb12';
        const action = { type: Types.FETCH.START, payload: { stationId } };

        return expectSaga(fetch, action)
            .provide([
                [matchers.call.fn(HttpStationAvailabilityQuery.find, stationId), throwError(error)],
            ])
            .put(fetchFailure(error))
            .run();
    });
})
