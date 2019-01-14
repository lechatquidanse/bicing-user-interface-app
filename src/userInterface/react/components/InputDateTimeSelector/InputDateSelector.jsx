import { defaultInputDateSelectOptions } from 'domain/definitions/byIntervalInPeriodDefinition';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

const InputDateSelector = ({
  placeholder, option, options, onOptionChange,
}) => (
  <Select
    value={options.find(optionObj => optionObj.value === option)}
    onChange={onOptionChange}
    options={options}
    placeholder={placeholder}
  />
);

InputDateSelector.propTypes = {
  placeholder: PropTypes.string,
  option: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  onOptionChange: PropTypes.func.isRequired,
};

InputDateSelector.defaultProps = {
  placeholder: 'Later',
  option: null,
  options: defaultInputDateSelectOptions(),
};

export default InputDateSelector;
