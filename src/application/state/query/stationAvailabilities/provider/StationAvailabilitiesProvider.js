import ByIntervalInPeriodFilter from 'application/state/filter/ByIntervalInPeriodFilter';
import StationAvailabilitiesProviderError
  from 'application/state/query/stationAvailabilities/provider/error/StationAvailabilitiesProviderError';
import { availabilitiesType } from 'domain/types/availabilityType';
import HttpStationAvailabilitiesQuery
  from 'infrastructure/bicingApi/HttpStationAvailabilitiesQuery';

class StationAvailabilitiesProvider {
  static async provide(stationId, periodStart, periodEnd, interval) {
    const stationAvailabilities = await HttpStationAvailabilitiesQuery.find(
      stationId,
      ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, interval),
    );

    return StationAvailabilitiesProvider.validate(stationAvailabilities);
  }

  static async validate(stationAvailabilities) {
    return availabilitiesType.validate(stationAvailabilities)
      .then(stationAvailabilities)
      .catch((validationError) => {
        throw StationAvailabilitiesProviderError.withInvalidResponseSchema(
          validationError.details.map(d => d.message).toString(),
        );
      });
  }
}

export default StationAvailabilitiesProvider;
