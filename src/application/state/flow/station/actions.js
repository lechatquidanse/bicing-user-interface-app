import * as Types from 'application/state/flow/station/types';

export const fetchStationStart = (stationId) => ({ type: Types.FETCH_STATION.START, payload: { stationId } });
export const fetchStationSuccess = () => ({ type: Types.FETCH_STATION.SUCCESS, payload: {} });
export const fetchStationFailure = (error) => ({ type: Types.FETCH_STATION.Failure, payload: { error } });
