import axios from 'axios';
import https from 'https';

const httpClient = axios.create({
  baseURL: `${process.env.REACT_APP_BICING_API_URL}`,
  //@todo move depending of dev env
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default httpClient;
