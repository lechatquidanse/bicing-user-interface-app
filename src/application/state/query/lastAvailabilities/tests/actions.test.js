import * as actions from 'application/state/query/lastAvailabilities/actions';
import * as Types from 'application/state/query/lastAvailabilities/types';

describe('application/state/query/lastAvailabilities/actions', () => {
    it('should create an action to start fetching a list of lastAvailabilities with function fetchListStart()', () => {
        expect(actions.fetchListStart()).toEqual({ type: Types.FETCH_LIST.START, payload: { isFetching: true } });
    });
    it('should create an action pending while fetching a list of lastAvailabilities with function fetchListPending()', () => {
        expect(actions.fetchListPending()).toEqual({ type: Types.FETCH_LIST.PENDING, payload: { isFetching: true } });
    });
    it('should create an action to cancel fetching a list of lastAvailabilities with function fetchListCancelled()', () => {
        expect(actions.fetchListCancelled()).toEqual({ type: Types.FETCH_LIST.CANCELLED, payload: { isFetching: false } });
    });
    it('should create an action to notify the success of fetching a list of lastAvailabilities with function fetchListSuccess()', () => {
        const data = [
            {
                statedAt: "2018-09-19T12:50:03+02:00",
                availableBikeNumber: 12,
                availableSlotNumber: 20,
                status: "OPENED"
            },
            {
                statedAt: "2018-09-19T12:50:03+02:00",
                availableBikeNumber: 4,
                availableSlotNumber: 17,
                status: "OPENED"
            },
        ];
        expect(actions.fetchListSuccess(data)).toEqual({ type: Types.FETCH_LIST.SUCCESS, payload: { data, isFetching: false }, });
    });
    it('should create an action when a failure occured during fetching a list of lastAvailabilities with function fetchListFailure()', () => {
        const error = { message: 'An error occured during fetching a list of lastAvailabilities.' };
        expect(actions.fetchListFailure(error)).toEqual({ type: Types.FETCH_LIST.FAILURE, payload: { error, isFetching: false } });
    });
})
