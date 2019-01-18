import React from 'react';

import GeoLocation from 'userInterface/react/containers/ItinerarySearch/GeoLocation';

const ItinerarySearch = () => <>
  <GeoLocation itineraryStep={0} />
  <GeoLocation itineraryStep={1} />
</>;

export default ItinerarySearch;
