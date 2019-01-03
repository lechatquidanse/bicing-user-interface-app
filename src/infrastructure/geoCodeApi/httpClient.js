import NodeGeocoder from 'node-geocoder';

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'YOUR_API_KEY',
};

const httpClient = NodeGeocoder(options);

export default httpClient;
