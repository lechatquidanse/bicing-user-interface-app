import AvailabilitiesProviderError
  from 'application/state/query/availabilities/provider//error/AvailabilitiesProviderError';
import availabilitiesClientFactory
  from 'application/state/query/availabilities/provider/availabilitiesClientFactory';
import AvailabilitiesProvider
  from 'application/state/query/availabilities/provider/AvailabilitiesProvider';
import AvailabilityBuilder
  from 'application/state/query/availabilities/tests/support/AvailabilityBuilder';
import moment from 'moment';

let availabilityBuilder;

jest.mock('application/state/query/availabilities/provider/availabilitiesClientFactory');

describe('application/state/query/availabilities/provider/AvailabilitiesProvider', () => {
  test('it can provide availabilities', async () => {
    const now = moment();

    const fakeAvailabilities = [availabilityBuilder.build(), availabilityBuilder.build()];
    const fakeClient = { find: () => fakeAvailabilities };

    availabilitiesClientFactory.mockReturnValue(fakeClient);

    const availabilities = await AvailabilitiesProvider.provide(now, now, now, '5T', []);

    expect(availabilities).toEqual(fakeAvailabilities);
  });

  test('it can not provide availabilities if response is not valid', async () => {
    const now = moment();

    const fakeAvailabilities = 'not valid response';
    const fakeClient = { find: () => fakeAvailabilities };

    availabilitiesClientFactory.mockReturnValue(fakeClient);

    await expect(AvailabilitiesProvider.provide(now, now, now, '5T', []))
      .rejects
      .toEqual(AvailabilitiesProviderError.withInvalidResponseSchema('"value" must be an array'));
  });
  beforeEach(() => {
    availabilityBuilder = AvailabilityBuilder.create();
  });
});
