import { shape, number, string, oneOf } from 'prop-types';

const lastAvailabilityType = shape({
    id: string.isRequired,
    status: oneOf(['CLOSED', 'OPENED']), // @todo put those constants somewhere
    availableBikeNumber: number.isRequired,
    availableSlotNumber: number.isRequired,
    statedAt: string.isRequired,
});

export default lastAvailabilityType;
