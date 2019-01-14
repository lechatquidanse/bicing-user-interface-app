import { DEFAULT_TIME_FORMAT, DEFAULT_TIME_INTERVAL } from 'domain/definitions/byIntervalInPeriodDefinition';
import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'userInterface/react/components/InputDateTimeSelector/stylesheets/react-datepicker.css';

const InputTimeSelector = ({
  selected, dateFormat, timeIntervals, onChange,
}) => (
  <DatePicker
    selected={selected}
    onChange={onChange}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={timeIntervals}
    dateFormat={dateFormat}
    timeCaption="Time"
  />
);

InputTimeSelector.propTypes = {
  selected: PropTypes.instanceOf(moment).isRequired,
  dateFormat: PropTypes.string,
  timeIntervals: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

InputTimeSelector.defaultProps = {
  dateFormat: DEFAULT_TIME_FORMAT,
  timeIntervals: DEFAULT_TIME_INTERVAL,
};

export default InputTimeSelector;
