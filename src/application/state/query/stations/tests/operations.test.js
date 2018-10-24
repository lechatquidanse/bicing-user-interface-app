import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { FETCH_LIST } from 'application/state/query/stations/types';
import { fetchListPending, fetchListSuccess, fetchListFailure } from 'application/state/query/stations/actions';
import operation from 'application/state/query/stations/operations';
import { list } from 'application/state/query/stations/operations';
import HttpStationQuery from 'infrastructure/bicingApi/HttpStationQuery';

describe('application/state/query/stations/operations', () => {
    it('should wait for a fetch list start event to list with operation()', () => {
        testSaga(operation)
            .next()
            .takeLatestEffect(FETCH_LIST.START, list);
    });

    it('should dispatch a fetchListPending action with list()', () => {
        testSaga(list)
            .next()
            .put(fetchListPending());
    });

    it('should list expected stations with list()', () => {
        const fakeStations = [
            {
                "@id": "\/api\/stations\/f7fa1d7b-4a7b-410d-bae0-549d862a2523",
                "@type": "stationView",
                "id": "f7fa1d7b-4a7b-410d-bae0-549d862a2523",
                "name": "233 - C\/NOU DE LA RAMBLA, 164",
                "type": "BIKE",
                "address": "Nou de la Rambla",
                "addressNumber": "164",
                "zipCode": "08004",
                "latitude": 41.371965,
                "longitude": 2.166871
            },
        ];

        // @todo use real stub/mock with https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#srcsetuptestsjs-1
        return expectSaga(list)
            .provide([
                [matchers.call.fn(HttpStationQuery.findAll), fakeStations],
            ])
            .put(fetchListSuccess(fakeStations))
            .run();
    });

    it('should handle error when api call failed in list() couilles', () => {
        const error = new Error('error_api_call');

        return expectSaga(list)
            .provide([
                [matchers.call.fn(HttpStationQuery.findAll), throwError(error)],
            ])
            .put(fetchListFailure(error))
            .run();
    });
})
