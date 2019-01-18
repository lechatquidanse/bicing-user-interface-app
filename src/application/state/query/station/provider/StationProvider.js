import StationProviderError
  from 'application/state/query/station/provider/error/StationProviderError';
import { stationType } from 'domain/types/stationType';
import HttpStationQuery from 'infrastructure/bicingApi/HttpStationQuery';

class StationProvider {
  static async provide(stationId) {
    const station = await HttpStationQuery.find(stationId);

    return StationProvider.validate(station);
  }

  static async validate(station) {
    return stationType.validate(station)
      .then(station)
      .catch((validationError) => {
        throw StationProviderError.withInvalidResponseSchema(
          validationError.details.map(d => d.message).toString(),
        );
      });
  }
}

export default StationProvider;
