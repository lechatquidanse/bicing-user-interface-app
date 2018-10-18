import { createSelector } from 'reselect'

import { stationsData as stationsSelector } from 'application/state/query/stations/selectors';
import { lastAvailabilitiesData as lastAvailabilitiesSelector } from 'application/state/query/lastAvailabilities/selectors';

export const stationsWithLastAvailabilty = createSelector(
    [stationsSelector, lastAvailabilitiesSelector],
    (stations, lastAvailabilities) => {
        if (stations.length === 0 || lastAvailabilities.length === 0) {
            return stations;
        }

        return lastAvailabilities.map(lastAvailability => {
            let station = stations.find(station => lastAvailability.id === station.id)

            if (station) {
                station['lastAvailability'] = lastAvailability;
            }

            return station;
        });
    }
)
