import { createSelector } from 'reselect'
import produce from 'immer';
import { stationsSelector } from 'application/state/query/stations/selectors';
import { lastAvailabilitiesSelector } from 'application/state/query/lastAvailabilities/selectors';

export const stationsWithLastAvailabiltySelector = createSelector(
    [stationsSelector, lastAvailabilitiesSelector],
    (stations, lastAvailabilities) => {
        if (stations === null || lastAvailabilities === null) {
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
