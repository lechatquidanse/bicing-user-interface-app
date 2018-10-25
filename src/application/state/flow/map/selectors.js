import { createSelector } from 'reselect'
import produce from 'immer';
import { stationsDataList as stationsSelector } from 'application/state/query/stations/selectors';
import { lastAvailabilitiesDataList as lastAvailabilitiesSelector } from 'application/state/query/lastAvailabilities/selectors';

export const stationsWithLastAvailabilty = createSelector(
    [stationsSelector, lastAvailabilitiesSelector],
    (stations, lastAvailabilities) => {
        //@todo check staions and lastAvailabilities
        if (stations.length === 0 || lastAvailabilities.length === 0) {
            return stations;
        }

        return lastAvailabilities.map(lastAvailability => {
            let station = stations.find(station => lastAvailability.id === station.id);

            if (station) {
                return produce(station, draft => {
                    draft.lastAvailability = lastAvailability
                });
            }

            return station;
        });
    }
)
