import axios from 'axios';
import https from 'https';

// @todo move depending of dev env
const httpClient = axios.create({
  baseURL: `${process.env.REACT_APP_BICING_API_URL}`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default httpClient;
