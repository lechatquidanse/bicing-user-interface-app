import React from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment';

import 'userInterface/react/components/FilterWithDateRangeAndSelect/stylesheets/react-datepicker.css';

const momentFormat = 'YYYY-MM-DD HH:mm:ss';

const filterWithDateRangeAndSelect = ({
    dateStart,
    dateEnd,
    option,
    options,
    onDateStartChange,
    onDateEndChange,
    onOptionChange
}) => {
    return <div>
        <DatePicker
            selected={moment(dateStart, momentFormat)}
            selectsStart
            startDate={moment(dateStart, momentFormat)}
            endDate={moment(dateEnd, momentFormat)}
            onChange={(date) => onDateStartChange(date.format(momentFormat))}
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
            onChange={(date) => onDateEndChange(date.format(momentFormat))}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={5}
            dateFormat="LLL"
            timeCaption="time"
        />
        <Select
            value={options.find(optionObj => optionObj.value === option)}
            onChange={(selectedOption) => onOptionChange(selectedOption.value)}
            options={options}
        />
    </div>
};

export default filterWithDateRangeAndSelect;
