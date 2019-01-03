import ByIntervalInPeriodFilter from 'application/state/filter/ByIntervalInPeriodFilter';
import { OK } from 'http-status';
import HttpStationAvailabilitiesForecastError
  from 'infrastructure/bicingForecastApi/errors/HttpStationAvailabilitiesForecastError';
import httpClient from 'infrastructure/bicingForecastApi/httpClient';
import HttpStationAvailabilitiesForecastResponse
  from 'infrastructure/bicingForecastApi/responses/HttpStationAvailabilitiesForecastResponse';

class HttpStationAvailabilitiesForecastQuery {
  static async find(stationId, byFilter) {
    const apiResponse = await httpClient.get(HttpStationAvailabilitiesForecastQuery.uri(
      stationId,
      byFilter,
    ))
      .then(response => response)
      .catch((error) => {
        throw HttpStationAvailabilitiesForecastError.withRequestError(error);
      });

    if (OK !== apiResponse.status) {
      throw HttpStationAvailabilitiesForecastError.withUnexpectedResponseStatus(apiResponse.status);
    }

    return HttpStationAvailabilitiesForecastResponse.fromRawValues(
      apiResponse.data.station_id,
      apiResponse.data.predictions,
    ).toModelAvailabilities();
  }

  static uri(stationId, byFilter) {
    const uri = `/stations/${stationId}`;

    if (byFilter instanceof ByIntervalInPeriodFilter) {
      return `${uri}?filter=${byFilter.periodStart},${byFilter.periodEnd},${byFilter.interval}`;
    }

    return uri;
  }
}

export default HttpStationAvailabilitiesForecastQuery;
