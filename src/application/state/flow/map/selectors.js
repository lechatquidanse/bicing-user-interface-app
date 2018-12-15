import { createSelector } from 'reselect'
import produce from 'immer';
import { stationsSelector } from 'application/state/query/stations/selectors';
import { lastAvailabilitiesSelector } from 'application/state/query/lastAvailabilities/selectors';

export const mapDisplayConfigurationSelector = (state) => {
    if (state.flow.map.payload.byFilter === null) {
        return {
            'zoom': 13,
            'center': { 'lat': 41.390205, 'lng': 2.154007 }
        }
    }

    return {
        'zoom': 15,
        'center': { 'lat': state.flow.map.payload.byFilter.latitude, 'lng': state.flow.map.payload.byFilter.longitude }
    }
}
export const stationsWithLastAvailabiltySelector = createSelector(
    [stationsSelector, lastAvailabilitiesSelector],
    (stations, lastAvailabilities) => {
        if (stations !== null && lastAvailabilities !== null) {
            const data = lastAvailabilities.map(lastAvailability => {
                let station = stations.find(station => lastAvailability.id === station.id);
                if (station) {
                    return produce(station, draft => {
                        draft.lastAvailability = lastAvailability
                    });
                }

                return null;
            }).filter(station => station);

            return data
        }

        return null;
    }
)
