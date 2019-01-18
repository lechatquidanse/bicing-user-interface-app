import { OK } from 'http-status';
import HttpStationQueryError from 'infrastructure/bicingApi/errors/HttpStationQueryError';
import httpClient from 'infrastructure/bicingApi/httpClient';

class HttpStationQuery {
  static async find(stationId) {
    const apiResponse = await httpClient.get(HttpStationQuery.uri(stationId))
      .then(response => response)
      .catch((error) => {
        throw HttpStationQueryError.withRequestError(error);
      });

    if (OK !== apiResponse.status) {
      throw HttpStationQueryError.withUnexpectedResponseStatus(apiResponse.status);
    }

    return apiResponse.data;
  }

  static uri(stationId) {
    return `/stations/${stationId}`;
  }
}

export default HttpStationQuery;
