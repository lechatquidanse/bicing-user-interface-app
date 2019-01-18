import { defaultInputDateSelectOptions } from 'domain/definitions/byIntervalInPeriodDefinition';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

const InputDateSelector = ({
  datePlaceholder, dateSelected, dateChoices, onDateChange,
}) => (
  <Select
    value={dateChoices.find(choice => choice.value === dateSelected)}
    onChange={onDateChange}
    options={dateChoices}
    placeholder={datePlaceholder}
  />
);

InputDateSelector.propTypes = {
  datePlaceholder: PropTypes.string,
  dateSelected: PropTypes.string,
  dateChoices: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  onDateChange: PropTypes.func.isRequired,
};

InputDateSelector.defaultProps = {
  datePlaceholder: 'Later',
  dateSelected: null,
  dateChoices: defaultInputDateSelectOptions(),
};

export default InputDateSelector;
