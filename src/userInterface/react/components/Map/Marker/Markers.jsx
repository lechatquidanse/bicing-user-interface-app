import {
  arrayOf, string, shape, node,
} from 'prop-types';
import React from 'react';

const Markers = ({
  data,
  children,
}) => (data.map(station => React.cloneElement(children, {
  stationId: station.id,
  key: station.id,
})));

Markers.propTypes = {
  data: arrayOf(shape({ id: string.isRequired })).isRequired,
  children: node.isRequired,
};

export default Markers;
