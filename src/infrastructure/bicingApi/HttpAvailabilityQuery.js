import axios from 'axios';
import { OK } from 'http-status';

import HttpAvailabilityQueryError from 'infrastructure/bicingApi/errors/HttpAvailabilityQueryError';

/** @todo make this class as a service (singleton) as pass API_URL threw construction */
class HttpAvailabilityQuery {
  static findAll() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_BICING_API_URL}/last-availabilities-by-station`)
        .then(response => {
          if (OK !== response.status) {
            reject({
              error: HttpAvailabilityQueryError.withUnexpectedResponseStatus(response.status)
            });
          }
          resolve(response);
        }).catch(error => {
          reject({
            error: HttpAvailabilityQueryError.withRequestError(error)
          });
        })
    });
  }
}

export default HttpAvailabilityQuery;
