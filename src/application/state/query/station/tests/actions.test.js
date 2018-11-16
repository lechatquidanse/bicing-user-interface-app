import * as actions from 'application/state/query/station/actions';
import * as Types from 'application/state/query/station/types';

describe('application/state/query/station/actions', () => {
    it('should create an action to start fetching a station with function fetchStart()', () => {
        const stationId = '630863d3-510c-4dba-8a39-bb1404ebbb78';

        expect(actions.fetchStart(stationId)).toEqual({ type: Types.FETCH.START, payload: { stationId, isFetching: true, isFetching: true } });
    });
    it('should create an action pending while fetching a station with function fetchPending()', () => {
        expect(actions.fetchPending()).toEqual({ type: Types.FETCH.PENDING, payload: { isFetching: true } });
    });
    it('should create an action to cancel fetching a station with function fetchCancelled()', () => {
        expect(actions.fetchCancelled()).toEqual({ type: Types.FETCH.CANCELLED, payload: { isFetching: false } });
    });
    it('should create an action to notify the success of fetching a station with function fetchSuccess()', () => {
        const data = { name: '87 - C/ MALLORCA 41-43', type: 'BIKE' };

        expect(actions.fetchSuccess(data)).toEqual({ type: Types.FETCH.SUCCESS, payload: { data, isFetching: false }, });
    });
    it('should create an action when a failure occured during fetching a station with function fetchFailure()', () => {
        const error = { message: 'An error occured during fetching a station.' };

        expect(actions.fetchFailure(error)).toEqual({ type: Types.FETCH.FAILURE, payload: { error, isFetching: false } });
    });
})
