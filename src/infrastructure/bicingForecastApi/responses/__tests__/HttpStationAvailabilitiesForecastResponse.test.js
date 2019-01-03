import HttpStationAvailabilitiesForecastResponse
  from 'infrastructure/bicingForecastApi/responses/HttpStationAvailabilitiesForecastResponse';

describe('infrastructure/bicingForecastApi/responses/HttpStationAvailabilitiesForecastResponse', () => {
  test('it can create from raw values', () => {
    const stationId = '76fc88f9-aa4e-4fbf-9852-f23a8cc7c525';
    const availabilities = [
      {
        available_bike_number: 13.5,
        available_slot_number: 12.0,
        forecast_at: '2018-12-24 16:10:00',
        status: 'OPENED',
      },
      {
        available_bike_number: 14.5,
        available_slot_number: 12.667,
        forecast_at: '2018-12-24 16:15:00',
        status: 'OPENED',
      },
    ];

    const response = HttpStationAvailabilitiesForecastResponse.fromRawValues(
      stationId,
      availabilities,
    );

    expect(response.stationId).toEqual(stationId);
    expect(response.availabilities).toEqual(availabilities);
  });
  test('it can not create from raw values with stationId not valid', () => {
    const stationId = 1234;
    const availabilities = [
      {
        available_bike_number: 13.5,
        available_slot_number: 12.0,
        forecast_at: '2018-12-24 16:10:00',
        status: 'OPENED',
      },
    ];

    expect(() => HttpStationAvailabilitiesForecastResponse.fromRawValues(stationId, availabilities))
      .toThrowErrorMatchingSnapshot();
  });
  test('it can not create from raw values with availabilities not valid', () => {
    const stationId = 1234;
    const availabilities = [
      {
        not_valid_key: 14.5,
        available_slot_number: 12.667,
        forecast_at: '2018-12-24 16:10:00',
        status: 'OPENED',
      },
    ];

    expect(() => HttpStationAvailabilitiesForecastResponse.fromRawValues(stationId, availabilities))
      .toThrowErrorMatchingSnapshot();
  });
  test('it can be rendered to availabilities model', () => {
    const stationId = '76fc88f9-aa4e-4fbf-9852-f23a8cc7c525';
    const availabilities = [
      {
        available_bike_number: '13.500000',
        available_slot_number: '12.000000',
        forecast_at: '2018-12-24 16:10:00',
        status: 'OPENED',
      },
      {
        available_bike_number: 14.5,
        available_slot_number: 12.667,
        forecast_at: '2018-12-24 16:15:00',
        status: 'CLOSED',
      },
    ];

    expect(HttpStationAvailabilitiesForecastResponse.fromRawValues(stationId, availabilities)
      .toModelAvailabilities()).toEqual([
      {
        stationId: '76fc88f9-aa4e-4fbf-9852-f23a8cc7c525',
        availableBikeNumber: 13.5,
        availableSlotNumber: 12,
        status: 'OPENED',
        statedAt: '2018-12-24 16:10:00',
      },
      {
        stationId: '76fc88f9-aa4e-4fbf-9852-f23a8cc7c525',
        availableBikeNumber: 14.5,
        availableSlotNumber: 12.667,
        status: 'CLOSED',
        statedAt: '2018-12-24 16:15:00',
      },
    ]);
  });
});
