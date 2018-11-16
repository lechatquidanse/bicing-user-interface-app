import React from 'react';

import stationType from 'domain/types/stationType';

const StationDetails = ({ station }) => {
    return <div>
        <h6>{station.name}</h6>
        <p>
            {station.type}
            {station.address}
            {station.addressNumber}
            {station.zipCode}
            {/* {station.lastAvailability} */}
        </p>
    </div>
};

StationDetails.propTypes = {
    station: stationType.isRequired,
};

export default StationDetails;
