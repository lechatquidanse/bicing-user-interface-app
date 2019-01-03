import ByGeoLocationFilter from 'application/state/filter/ByGeoLocationFilter';
import { OK } from 'http-status';
import HttpStationQueryError from 'infrastructure/bicingApi/errors/HttpStationQueryError';
import httpClient from 'infrastructure/bicingApi/httpClient';
import httpHydraCollectionResponse
  from 'infrastructure/bicingApi/types/httpHydraCollectionResponse';

class HttpStationsQuery {
  static async find(byFilter) {
    const apiResponse = await httpClient.get(HttpStationsQuery.uri(byFilter))
      .then(response => response)
      .catch((error) => {
        throw HttpStationQueryError.withRequestError(error);
      });

    if (OK !== apiResponse.status) {
      throw HttpStationQueryError.withUnexpectedResponseStatus(apiResponse.status);
    }

    return HttpStationsQuery.validate(apiResponse.data);
  }

  static validate(data) {
    return httpHydraCollectionResponse.validate(data)
      .then(result => (result['hydra:member']))
      .catch((validationError) => {
        throw HttpStationQueryError.withResponseFormatValidationErrors(
          validationError.details.map(d => d.message),
        );
      });
  }

  static uri(byFilter) {
    const uri = '/stations';

    if (byFilter instanceof ByGeoLocationFilter) {
      return `${uri}?geo_location_filter=${byFilter.latitude},${byFilter.longitude},${byFilter.limit}`;
    }

    return uri;
  }
}

export default HttpStationsQuery;
