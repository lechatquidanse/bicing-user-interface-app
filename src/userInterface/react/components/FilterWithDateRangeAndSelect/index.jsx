import {
  arrayOf, func, shape, string,
} from 'prop-types';
import moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import 'userInterface/react/components/FilterWithDateRangeAndSelect/stylesheets/react-datepicker.css';

// @todo clean and separate component
const filterWithDateRangeAndSelect = ({
  dateStart,
  dateEnd,
  option,
  options,
  onDateStartChange,
  onDateEndChange,
  onOptionChange,
  momentFormat,
}) => (
  <div>
    <DatePicker
      selected={moment(dateStart, momentFormat)}
      selectsStart
      startDate={moment(dateStart, momentFormat)}
      endDate={moment(dateEnd, momentFormat)}
      onChange={date => onDateStartChange(date.format(momentFormat))}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={5}
      dateFormat="LLL"
      timeCaption="time"
    />
    <DatePicker
      selected={moment(dateEnd, momentFormat)}
      selectsEnd
      startDate={moment(dateStart, momentFormat)}
      endDate={moment(dateEnd, momentFormat)}
      onChange={date => onDateEndChange(date.format(momentFormat))}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={5}
      dateFormat="LLL"
      timeCaption="time"
    />
    <Select
      value={options.find(optionObj => optionObj.value === option)}
      onChange={selectedOption => onOptionChange(selectedOption.value)}
      options={options}
    />
  </div>
);

filterWithDateRangeAndSelect.propTypes = {
  dateStart: string,
  dateEnd: string,
  option: string,
  options: arrayOf(shape({
    value: string.isRequired,
    label: string.isRequired,
  })),
  onDateStartChange: func.isRequired,
  onDateEndChange: func.isRequired,
  onOptionChange: func.isRequired,
  momentFormat: string,
};

filterWithDateRangeAndSelect.defaultProps = {
  dateStart: moment().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
  dateEnd: moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
  option: '5 min',
  options: [
    { value: '5 minute', label: '5 min' },
    { value: '10 minute', label: '10 min' },
    { value: '15 minute', label: '15 min' },
    { value: '30 minute', label: '30 min' },
    { value: '1 hour', label: '1 hour' },
    { value: '2 hour', label: '2 hour' },
    { value: '1 day', label: '1 day' },
  ],
  momentFormat: 'YYYY-MM-DD HH:mm:ss',
};

export default filterWithDateRangeAndSelect;
