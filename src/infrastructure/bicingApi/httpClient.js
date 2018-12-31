import axios from 'axios';

const httpClient = axios.create({
  baseURL: `${process.env.REACT_APP_BICING_API_URL}`,
});

export default httpClient;
