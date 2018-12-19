import { selectors as commandMapSelectors } from 'application/state/command/map';
import { selectors as queryLastAvailabilitiesSelectors } from 'application/state/query/lastAvailabilities';
import { selectors as queryStationsSelectors } from 'application/state/query/stations';
import produce from 'immer';
import { createSelector } from 'reselect';

export const displayConfiguration = state => commandMapSelectors.displayConfiguration(state);
// @todo add isDisplaying and rename as isLoading
export const isFetching = state => queryStationsSelectors.isFetching(state);

export const stationsWithLastAvailability = createSelector(
  [queryStationsSelectors.stations, queryLastAvailabilitiesSelectors.lastAvailabilities],
  (stations, lastAvailabilities) => {
    if (stations !== null && lastAvailabilities !== null) {
      const data = lastAvailabilities.map((lastAvailability) => {
        const stationData = stations.find(station => lastAvailability.id === station.id);
        if (stationData) {
          return produce(stationData, (draft) => {
            draft.lastAvailability = lastAvailability;
          });
        }

        return null;
      }).filter(station => station);

      return data;
    }

    return null;
  },
);
