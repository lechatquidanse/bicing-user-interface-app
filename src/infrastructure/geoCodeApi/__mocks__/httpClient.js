const httpClient = jest.genMockFromModule('infrastructure/geoCodeApi/httpClient');

httpClient.reverse = jest.fn(() => {});

export default httpClient;
