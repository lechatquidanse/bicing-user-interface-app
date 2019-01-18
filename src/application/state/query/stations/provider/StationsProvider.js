import ByItineraryGeoLocationFilter from 'application/state/filter/ByItineraryGeoLocationFilter';
import StationsProviderError
  from 'application/state/query/stations/provider/error/StationsProviderError';
import { stationsType } from 'domain/types/stationType';
import HttpStationsQuery from 'infrastructure/bicingApi/HttpStationsQuery';

class StationsProvider {
  static async provide(latitude, longitude, limit) {
    const filter = await ByItineraryGeoLocationFilter.fromRawValues(latitude, longitude, limit);
    const stations = await HttpStationsQuery.find(filter);

    return StationsProvider.validate(stations);
  }

  static async validate(stations) {
    return stationsType.validate(stations)
      .then(stations)
      .catch((validationError) => {
        throw StationsProviderError.withInvalidResponseSchema(
          validationError.details.map(d => d.message).toString(),
        );
      });
  }
}

export default StationsProvider;
