import { string } from 'prop-types';
import React from 'react';

const StationDetails = ({
  name, type, address, addressNumber, zipCode,
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
  name: string.isRequired,
  type: string.isRequired,
  address: string,
  addressNumber: string,
  zipCode: string,
};

StationDetails.defaultProps = {
  address: '',
  addressNumber: '',
  zipCode: '',
};

export default StationDetails;
