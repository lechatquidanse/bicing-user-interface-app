/* eslint-disable */
import { shape, string } from 'prop-types';
import React from 'react';

const StationDetails = ({
  station: {
    name, type, address, addressNumber, zipCode,
  },
}) => (
  <div>
    <h6>{name}</h6>
    <p>
      {type}
      {address}
      {addressNumber}
      {zipCode}
    </p>
  </div>
);

StationDetails.propTypes = {
  station: shape({
    name: string.isRequired,
    type: string.isRequired,
    address: string,
    addressNumber: string,
    zipCode: string,
  }),
};

StationDetails.defaultProps = {
  address: '',
  addressNumber: '',
  zipCode: '',
};

export default StationDetails;
