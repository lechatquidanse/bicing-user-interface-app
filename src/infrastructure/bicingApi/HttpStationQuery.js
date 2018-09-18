import axios from 'axios';

class HttpStationQuery {
  static findAll() {
    return axios.get('http://localhost:8080/stations');
  }
}

export default HttpStationQuery;
