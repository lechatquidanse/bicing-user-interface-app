import React from 'react';

import { string, number } from 'prop-types';

const InfoWindow = ({ name, zipCode, type, availableBikeNumber, availableSlotNumber, status }) =>
    <div>
        <h6>{name}, {zipCode}</h6>
        <p>type: {type}</p>
        <p>availableBikeNumber: {availableBikeNumber}</p>
        <p>availableSlotNumber: {availableSlotNumber}</p>
        <p>status: {status}</p>
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
};

export default InfoWindow;
