import React from 'react';
import { create } from 'react-test-renderer';
import FilterWithDateRangeAndSelect
  from 'userInterface/react/components/FilterWithDateRangeAndSelect';

describe('userInterface/react/components/FilterWithDateRangeAndSelect/index.js', () => {
  test('it can renders with default values as expected', () => {
    const component = create(<FilterWithDateRangeAndSelect
      dateStart="2018-08-04 14:35:00"
      dateEnd="2018-08-04 14:35:00"
      onDateStartChange={jest.fn()}
      onDateEndChange={jest.fn()}
      onOptionChange={jest.fn()}
    />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('it can renders with input values as expected', () => {
    const component = create(<FilterWithDateRangeAndSelect
      dateStart="2018-08-04 14:35:00"
      dateEnd="2018-08-04 14:35:00"
      option="10 min"
      options={[
        { value: '5 minute', label: '5 min' },
        { value: '10 minute', label: '10 min' }]}
      onDateStartChange={jest.fn()}
      onDateEndChange={jest.fn()}
      onOptionChange={jest.fn()}
      momentFormat="YYYY-MM-DD HH:mm:ss"
    />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
