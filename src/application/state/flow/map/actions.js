import * as Types from 'application/state/flow/map/types';

export const fetchMapStart = () => ({
    type: Types.FETCH_MAP.START,
    payload: {
        isFetching: true
    }
});

export const fetchMapSuccess = () => ({
    type: Types.FETCH_MAP.SUCCESS,
    payload: {
        isFetching: false
    },
});

export const fetchMapFailure = (error) => ({
    type: Types.FETCH_MAP.Failure,
    payload: {
        isFetching: false,
        error
    },
});
