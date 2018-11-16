import * as actions from 'application/state/query/stationAvailabilities/actions';
import * as Types from 'application/state/query/stationAvailabilities/types';

describe('application/state/query/stationAvailabilities/actions', () => {
    it('should create an action to start fetching availabilities for a station with function fetchStart()', () => {
        const stationId = 'cc90eb4e-4988-4443-aedf-6464f79eeb12';
        const periodStart = '2016-08-11 14:15:00';
        const periodEnd = '2016-08-13 16:15:00';
        const interval = '5 minute';

        expect(actions.fetchStart(stationId, periodStart, periodEnd, interval)).toEqual({
            type: Types.FETCH.START, payload: { stationId, periodStart, periodEnd, interval, isFetching: true }
        });
    });
    it('should create an action pending while fetching availabilities for a station with function fetchPending()', () => {
        expect(actions.fetchPending()).toEqual({ type: Types.FETCH.PENDING, payload: { isFetching: true } });
    });
    it('should create an action to cancel fetching vailabilities for a station with function fetchCancelled()', () => {
        expect(actions.fetchCancelled()).toEqual({ type: Types.FETCH.CANCELLED, payload: { isFetching: false } });
    });
    it('should create an action to notify the success of fetching vailabilities for a station with function fetchSuccess()', () => {
        const data = [
            {
                "interval": "2018-11-05 14:45:00",
                "available_bike_avg": "20.0",
                "available_slot_avg": "9.0",
            },
            {
                "interval": "2018-11-05 14:50:00",
                "available_bike_avg": "13.0",
                "available_slot_avg": "16.0",
            },
        ];
        expect(actions.fetchSuccess(data)).toEqual({ type: Types.FETCH.SUCCESS, payload: { data, isFetching: false }, });
    });
    it('should create an action when a failure occured during fetching vailabilities for a station with function fetchFailure()', () => {
        const error = { message: 'An error occured during fetching vailabilities for a station.' };

        expect(actions.fetchFailure(error)).toEqual({ type: Types.FETCH.FAILURE, payload: { error, isFetching: false } });
    });
})
