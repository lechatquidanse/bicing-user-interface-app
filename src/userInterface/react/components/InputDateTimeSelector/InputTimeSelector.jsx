import { DEFAULT_TIME_FORMAT, DEFAULT_TIME_INTERVAL } from 'domain/definitions/byIntervalInPeriodDefinition';
import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const InputTimeSelector = ({
  timeSelected, timeFormat, timeIntervals, onTimeChange,
}) => (
  <DatePicker
    selected={timeSelected}
    onChange={onTimeChange}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={timeIntervals}
    dateFormat={timeFormat}
    timeCaption="Time"
  />
);

InputTimeSelector.propTypes = {
  timeSelected: PropTypes.instanceOf(moment).isRequired,
  timeFormat: PropTypes.string,
  timeIntervals: PropTypes.number,
  onTimeChange: PropTypes.func.isRequired,
};

InputTimeSelector.defaultProps = {
  timeFormat: DEFAULT_TIME_FORMAT,
  timeIntervals: DEFAULT_TIME_INTERVAL,
};

export default InputTimeSelector;
