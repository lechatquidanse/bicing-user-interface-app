import {
  shape, number, string, oneOf,
} from 'prop-types';
import { STATUS_ALLOWED } from 'domain/definitions/availabilityDefinition';

const lastAvailabilityType = shape({
  id: string.isRequired,
  status: oneOf(STATUS_ALLOWED),
  availableBikeNumber: number.isRequired,
  availableSlotNumber: number.isRequired,
  statedAt: string.isRequired,
});

export default lastAvailabilityType;
