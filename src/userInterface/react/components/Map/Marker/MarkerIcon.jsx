import { STATUS_CLOSED } from 'domain/definitions/availabilityDefinition';
import { TYPE_ELECTRIC_BIKE } from 'domain/definitions/stationDefinition';
import { number, string } from 'prop-types';
import IconBike0 from 'userInterface/react/components/Map/Marker/icons/bike-0-min.png';
import IconBike100 from 'userInterface/react/components/Map/Marker/icons/bike-100-min.png';
import IconBike25 from 'userInterface/react/components/Map/Marker/icons/bike-25-min.png';
import IconBike50 from 'userInterface/react/components/Map/Marker/icons/bike-50-min.png';
import IconBike75 from 'userInterface/react/components/Map/Marker/icons/bike-75-min.png';
import IconClosed from 'userInterface/react/components/Map/Marker/icons/closed-min.png';
import IconElectricBike0
  from 'userInterface/react/components/Map/Marker/icons/electric-bike-0-min.png';
import IconElectricBike100
  from 'userInterface/react/components/Map/Marker/icons/electric-bike-100-min.png';
import IconElectricBike25
  from 'userInterface/react/components/Map/Marker/icons/electric-bike-25-min.png';
import IconElectricBike50
  from 'userInterface/react/components/Map/Marker/icons/electric-bike-50-min.png';
import IconElectricBike75
  from 'userInterface/react/components/Map/Marker/icons/electric-bike-75-min.png';

const getIconElectricBike = (availability) => {
  if (availability === 0) {
    return IconElectricBike0;
  }
  if (availability < 25) {
    return IconElectricBike25;
  }
  if (availability < 50) {
    return IconElectricBike50;
  }
  if (availability < 75) {
    return IconElectricBike75;
  }

  return IconElectricBike100;
};

const getIconBike = (availability) => {
  if (availability === 0) {
    return IconBike0;
  }
  if (availability < 25) {
    return IconBike25;
  }
  if (availability < 50) {
    return IconBike50;
  }
  if (availability < 75) {
    return IconBike75;
  }

  return IconBike100;
};

const MarkerIcon = (type, status, bikeNumber, slotNumber) => {
  const total = (bikeNumber + slotNumber) > 0 ? bikeNumber + slotNumber : 1;
  const availability = (bikeNumber / total) * 100;

  if (status === STATUS_CLOSED) {
    return IconClosed;
  }

  switch (type) {
    case TYPE_ELECTRIC_BIKE:
      return getIconElectricBike(availability);
    default:
      return getIconBike(availability);
  }
};

MarkerIcon.defaultProps = {
  availableBikeNumber: 0,
  availableSlotNumber: 0,
  status: 'CLOSED',
};

MarkerIcon.propTypes = {
  type: string.isRequired,
  availableBikeNumber: number,
  availableSlotNumber: number,
  status: string,
};

export default MarkerIcon;
