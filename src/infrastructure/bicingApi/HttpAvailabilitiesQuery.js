import { OK } from 'http-status';
import HttpAvailabilitiesQueryError
  from 'infrastructure/bicingApi/errors/HttpAvailabilitiesQueryError';
import httpClient from 'infrastructure/bicingApi/httpClient';
import httpHydraCollectionResponse
  from 'infrastructure/bicingApi/types/httpHydraCollectionResponse';

class HttpAvailabilitiesQuery {
  static async find() {
    const apiResponse = await httpClient.get('/last-availabilities-by-station')
      .then(response => response)
      .catch((error) => {
        throw HttpAvailabilitiesQueryError.withRequestError(error);
      });

    if (OK !== apiResponse.status) {
      throw HttpAvailabilitiesQueryError.withUnexpectedResponseStatus(apiResponse.status);
    }

    return HttpAvailabilitiesQuery.validate(apiResponse.data);
  }

  static validate(data) {
    return httpHydraCollectionResponse.validate(data)
      .then(result => (result['hydra:member']))
      .catch((validationError) => {
        throw HttpAvailabilitiesQueryError.withResponseFormatValidationErrors(
          validationError.details.map(d => d.message),
        );
      });
  }
}

export default HttpAvailabilitiesQuery;
