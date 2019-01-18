import axios from 'axios';
import https from 'https';

const httpClient = axios.create({
  baseURL: `${process.env.REACT_APP_BICING_FORECAST_API_URL}`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default httpClient;
