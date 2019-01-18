import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import InputDateSelector
  from 'userInterface/react/components/InputDateTimeSelector/InputDateSelector';
import InputTimeSelector
  from 'userInterface/react/components/InputDateTimeSelector/InputTimeSelector';
import 'userInterface/react/components/InputDateTimeSelector/stylesheets/react-datepicker.css';

const InputDateTimeSelector = ({
  dateSelected, timeSelected, onTimeChange, onDateChange,
}) => <>
  <InputDateSelector
    dateSelected={dateSelected}
    onDateChange={onDateChange}
  />
  <InputTimeSelector
    timeSelected={timeSelected}
    onTimeChange={onTimeChange}
  />
</>;

InputDateSelector.propTypes = {
  dateSelected: PropTypes.string,
  timeSelected: PropTypes.instanceOf(moment),
  onDateChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
};

export default InputDateTimeSelector;
