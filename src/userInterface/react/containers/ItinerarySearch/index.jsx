import React from 'react';

import GeoLocation from 'userInterface/react/containers/ItinerarySearch/GeoLocation';
import SelectWhen from 'userInterface/react/containers/ItinerarySearch/SelectWhen';

const ItinerarySearch = () => <>
  <GeoLocation itineraryStep={0} />
  <GeoLocation itineraryStep={1} />
  <SelectWhen />
</>;

export default ItinerarySearch;
