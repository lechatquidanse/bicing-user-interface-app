import HttpReverseGeoCodeQueryError
  from 'infrastructure/geoCodeApi/errors/HttpReverseGeoCodeQueryError';
import httpClient from 'infrastructure/geoCodeApi/httpClient';

class HttpReverseGeoCodeQuery {
  static async find(latitude, longitude) {
    const apiResponse = await httpClient.reverse({ lat: latitude, lng: longitude })
      .then(response => response)
      .catch((error) => {
        throw HttpReverseGeoCodeQueryError.withRequestError(error);
      });

    return apiResponse;
  }
}

export default HttpReverseGeoCodeQuery;
