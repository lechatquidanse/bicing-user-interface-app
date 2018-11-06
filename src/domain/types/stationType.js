import { shape, number, string, oneOf } from 'prop-types';

import lastAvailabilityType from 'domain/types/lastAvailabilityType';

const stationType = shape({
    id: string.isRequired,
    name: string.isRequired,
    type: oneOf(['BIKE', 'ELECTRIC_BIKE']), // @todo put those constants somewhere
    latitude: number.isRequired,
    longitude: number.isRequired,
    zipCode: string.isRequired,
    lastAvailability: lastAvailabilityType
});

export default stationType;
