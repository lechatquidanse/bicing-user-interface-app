import React from 'react';

import StationDetails from 'userInterface/react/containers/StationDetails';
import StationAvailabilities from 'userInterface/react/containers/StationAvailabilities';

const Station = () => (
  <div>
    <StationDetails />
    <StationAvailabilities />
  </div>
);

export default Station;
