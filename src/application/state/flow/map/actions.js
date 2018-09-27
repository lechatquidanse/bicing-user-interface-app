import * as Types from './types';

export const fetchMapStart = () => ({
    type: Types.FETCH_MAP.START,
    payload: {
        isFetching: true
    }
});

export const fetchMapSuccess = (stations, lastAvailabilities) => ({
    type: Types.FETCH_MAP.SUCCESS,
    payload: {
        stations,
        lastAvailabilities,
        isFetching: false
    },
});
