import * as Types from './types';

export const fetchListStart = () => ({
    type: Types.FETCH_LIST.START,
    payload: {
        isFetching: true
    }
});

export const fetchListSuccess = data => ({
    type: Types.FETCH_LIST.SUCCESS,
    payload: {
        data,
        isFetching: false
    },
});
