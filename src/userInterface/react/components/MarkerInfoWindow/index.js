import React from 'react';

import { string, number, func } from 'prop-types';

const InfoWindow = ({ name, zipCode, type, availableBikeNumber, availableSlotNumber, status, onInfoWindowViewMoreClick, stationId }) =>
    <div>
        <h6>{name}, {zipCode}</h6>
        <p>type: {type}</p>
        <p>availableBikeNumber: {availableBikeNumber}</p>
        <p>availableSlotNumber: {availableSlotNumber}</p>
        <p>status: {status}</p>
        <button onClick={() => onInfoWindowViewMoreClick(stationId)}>viewMore</button>
    </div>;

InfoWindow.defaultProps = {
    availableBikeNumber: 0,
    availableSlotNumber: 0,
    status: 'OPENED',
};

InfoWindow.propTypes = {
    name: string.isRequired,
    zipCode: string.isRequired,
    type: string.isRequired,
    availableBikeNumber: number,
    availableSlotNumber: number,
    status: string,
    onInfoWindowViewMoreClick: func.isRequired,
    stationId: string.isRequired,
};

export default InfoWindow;
