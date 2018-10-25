import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { FETCH_LIST } from 'application/state/query/lastAvailabilities/types';
import { fetchListPending, fetchListSuccess, fetchListFailure } from 'application/state/query/lastAvailabilities/actions';
import operation from 'application/state/query/lastAvailabilities/operations';
import { list } from 'application/state/query/lastAvailabilities/operations';
import HttpAvailabilityQuery from 'infrastructure/bicingApi/HttpAvailabilityQuery';

describe('application/state/query/lastAvailabilities/operations', () => {
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

    it('should list expected lastAvailabilities with list()', () => {
        const fakeLastAvailabilities = [
            {
                "@id": "\/api\/last-availabilities-by-station\/4028fe46-d10e-47df-9a66-f1960475af15",
                "@type": "lastAvailabilitiesByStationView",
                "id": "4028fe46-d10e-47df-9a66-f1960475af15",
                "statedAt": "2018-09-19T12:50:03+02:00",
                "availableBikeNumber": 1,
                "availableSlotNumber": 25,
                "status": "OPENED"
            },
        ];

        // @todo use real stub/mock with https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#srcsetuptestsjs-1
        return expectSaga(list)
            .provide([
                [matchers.call.fn(HttpAvailabilityQuery.findAll), fakeLastAvailabilities],
            ])
            .put(fetchListSuccess(fakeLastAvailabilities))
            .run();
    });

    it('should handle error when api call failed in list() couilles', () => {
        const error = new Error('error_api_call');

        return expectSaga(list)
            .provide([
                [matchers.call.fn(HttpAvailabilityQuery.findAll), throwError(error)],
            ])
            .put(fetchListFailure(error))
            .run();
    });
})
