import { shape, number, string, oneOf } from 'prop-types';

import { TYPE_ALLOWED } from 'domain/definitions/stationDefinition';
import lastAvailabilityType from 'domain/types/lastAvailabilityType';

const stationType = shape({
    id: string.isRequired,
    name: string.isRequired,
    type: oneOf(TYPE_ALLOWED),
    address: string,
    addressNumber: string,
    latitude: number.isRequired,
    longitude: number.isRequired,
    zipCode: string.isRequired,
    lastAvailability: lastAvailabilityType
});

export default stationType;
