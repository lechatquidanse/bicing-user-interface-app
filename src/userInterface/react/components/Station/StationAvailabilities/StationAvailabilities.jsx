/* eslint-disable */
import React from 'react';
import FilterWithDateRangeAndSelect
  from 'userInterface/react/components/FilterWithDateRangeAndSelect';
import StationAvailabilitiesChartLine
  from 'userInterface/react/components/Station/StationAvailabilities/StationAvailabilitiesChartLine';

const intervalOptions = [
  { value: '5 minute', label: '5 min' },
  { value: '10 minute', label: '10 min' },
  { value: '15 minute', label: '15 min' },
  { value: '30 minute', label: '30 min' },
  { value: '1 hour', label: '1 hour' },
  { value: '2 hour', label: '2 hour' },
  { value: '1 day', label: '1 day' },
];

const StationAvailabilities = ({
  stationAvailabilities,
  dateStart,
  dateEnd,
  interval,
  onDateStartChange,
  onDateEndChange,
  onIntervalChange,
}) => (
  <div>
    <p>
Select a start date, an end date and an interval to see availabilities statistics for your
        station.
    </p>
    <FilterWithDateRangeAndSelect
      dateStart={dateStart}
      dateEnd={dateEnd}
      option={interval}
      options={intervalOptions}
      onDateStartChange={onDateStartChange}
      onDateEndChange={onDateEndChange}
      onOptionChange={onIntervalChange}
    />

    <h3>Bike availability statistics</h3>
    <StationAvailabilitiesChartLine
      stationAvailabilities={stationAvailabilities}
    />

    <h3>Slot availability statistics</h3>
    <StationAvailabilitiesChartLine
      stationAvailabilities={stationAvailabilities}
      type="availableSlot"
    />
  </div>
);

export default StationAvailabilities;
