import React from 'react';
import { create } from 'react-test-renderer';
import { StationDetails } from 'userInterface/react/components/StationDetails';

describe('userInterface/react/components/FilterWithDateRangeAndSelect/index.js', () => {
  test('it can renders with default values as expected', () => {
    const station = { name: '97 - C/ TARRAGONA 141', type: 'BIKE' };
    const component = create(<StationDetails station={station} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('it can renders with values as expected', () => {
    const station = {
      name: '97 - C/ TARRAGONA 141',
      type: 'BIKE',
      address: 'Tarragona',
      addressNumber: '141',
      zipCode: '080014',
    };
    const component = create(<StationDetails station={station} />);


    expect(component.toJSON()).toMatchSnapshot();
  });
});
