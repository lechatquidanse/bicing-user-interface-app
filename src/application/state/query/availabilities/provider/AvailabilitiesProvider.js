import availabilitiesClientFactory
  from 'application/state/query/availabilities/provider/availabilitiesClientFactory';
import AvailabilitiesProviderError
  from 'application/state/query/availabilities/provider/error/AvailabilitiesProviderError';
import { availabilitiesType } from 'domain/types/availabilityType';

class AvailabilitiesProvider {
  static async provide(itineraryAt, periodStart, periodEnd, interval, stationIds) {
    const client = await availabilitiesClientFactory(
      itineraryAt,
      periodStart,
      periodEnd,
      interval,
      stationIds,
    );

    const availabilities = await client.find();

    return AvailabilitiesProvider.validate(availabilities);
  }

  static async validate(availabilities) {
    return availabilitiesType.validate(availabilities)
      .then(availabilities)
      .catch((validationError) => {
        throw AvailabilitiesProviderError.withInvalidResponseSchema(
          validationError.details.map(d => d.message).toString(),
        );
      });
  }
}

export default AvailabilitiesProvider;
