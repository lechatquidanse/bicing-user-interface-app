import * as actions from 'application/state/query/stations/actions';
import * as Types from 'application/state/query/stations/types';

describe('application/state/query/stations/actions', () => {
    it('should create an action to start fetching a list of stations with function fetchListStart()', () => {
        expect(actions.fetchListStart()).toEqual({ type: Types.FETCH_LIST.START, payload: { isFetching: true } });
    });
    it('should create an action pending while fetching a list of stations with function fetchListPending()', () => {
        expect(actions.fetchListPending()).toEqual({ type: Types.FETCH_LIST.PENDING, payload: { isFetching: true } });
    });
    it('should create an action to cancel fetching a list of stations with function fetchListCancelled()', () => {
        expect(actions.fetchListCancelled()).toEqual({ type: Types.FETCH_LIST.CANCELLED, payload: { isFetching: false } });
    });
    it('should create an action to notify the success of fetching a list of stations with function fetchListSuccess()', () => {
        const data = [
            {
                name: '87 - C/ MALLORCA 41-43',
                type: 'BIKE',
            },
            {
                name: '165 - C/ DEL DOCTOR TRUETA, 221',
                type: 'ELECTRIC_BIKE',
            },
        ];
        expect(actions.fetchListSuccess(data)).toEqual({ type: Types.FETCH_LIST.SUCCESS, payload: { data, isFetching: false } });
    });
    it('should create an action when a failure occured during fetching a list of stations with function fetchListFailure()', () => {
        const error = { message: 'An error occured during fetching a list of stations.' };
        expect(actions.fetchListFailure(error)).toEqual({ type: Types.FETCH_LIST.FAILURE, payload: { error, isFetching: false } });
    });
})
