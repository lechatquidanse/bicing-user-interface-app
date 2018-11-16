import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { FETCH } from 'application/state/query/station/types';
import { fetchPending, fetchSuccess, fetchFailure } from 'application/state/query/station/actions';
import operation from 'application/state/query/station/operations';
import { fetch } from 'application/state/query/station/operations';
import HttpStationQuery from 'infrastructure/bicingApi/HttpStationQuery';
import * as Types from 'application/state/query/station/types';

describe('application/state/query/station/operations', () => {
    it('should wait for a fetch start event to fetch with operation()', () => {
        testSaga(operation)
            .next()
            .takeLatestEffect(FETCH.START, fetch);
    });

    it('should dispatch a fetchPending action with fetch()', () => {
        testSaga(fetch)
            .next()
            .put(fetchPending());
    });

    it('should fetch expected station with fetch()', () => {
        const stationId = 'f7fa1d7b-4a7b-410d-bae0-549d862a2523';
        const fakeStation = {
            "@id": `\/api\/stations\/${stationId}`,
            "@type": "stationView",
            "id": `${stationId}`,
            "name": "233 - C\/NOU DE LA RAMBLA, 164",
            "type": "BIKE",
            "address": "Nou de la Rambla",
            "addressNumber": "164",
            "zipCode": "08004",
            "latitude": 41.371965,
            "longitude": 2.166871
        };
        const action = { type: Types.FETCH.START, payload: { stationId } };

        // @todo use real stub/mock with https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#srcsetuptestsjs-1
        return expectSaga(fetch, action)
            .provide([
                [matchers.call.fn(HttpStationQuery.find, stationId), fakeStation],
            ])
            .put(fetchSuccess(fakeStation))
            .run();
    });

    it('should handle error when api call failed in fetch()', () => {
        const stationId = 'f7fa1d7b-4a7b-410d-bae0-549d862a2523';
        const error = new Error('error_api_call');
        const action = { type: Types.FETCH.START, payload: { stationId } };

        return expectSaga(fetch, action)
            .provide([
                [matchers.call.fn(HttpStationQuery.find, stationId), throwError(error)],
            ])
            .put(fetchFailure(error))
            .run();
    });
})
