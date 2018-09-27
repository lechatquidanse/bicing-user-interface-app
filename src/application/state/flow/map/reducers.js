import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable';

import * as Types from './types';

export const INITIAL_STATE = Immutable({ error: false, stationsWithLastAvailabilities: [] });

export const fetchMapStart = (state = INITIAL_STATE, action) => {
  const { isFetching } = action.payload;
  return { ...state, isFetching };
};

export const fetchMapSuccess = (state = INITIAL_STATE, action) => {
  const { isFetching, stations, lastAvailabilities } = action.payload;
  if (stations.length === 0) {
    return { ...state, isFetching, stations };
  }

  const stationsWithLastAvailabilities = lastAvailabilities.map(lastAvailability => {
    let station = stations.find(station => lastAvailability.id === station.id)

    if (station) {
      station['lastAvailability'] = lastAvailability;
    }

    return station;
  });

  return { ...state, isFetching, stationsWithLastAvailabilities };
}

export const HANDLERS = {
  [Types.FETCH_MAP.START]: fetchMapStart,
  [Types.FETCH_MAP.SUCCESS]: fetchMapSuccess,
}

export default createReducer(INITIAL_STATE, HANDLERS);
