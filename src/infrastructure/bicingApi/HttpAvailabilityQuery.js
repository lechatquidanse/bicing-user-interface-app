import axios from 'axios';

class HttpAvailabilityQuery {
  static findAll() {
    return axios.get('http://localhost:8080/availabilities');
  }
}

export default HttpAvailabilityQuery;
