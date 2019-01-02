import React from 'react';
import { create } from 'react-test-renderer';
import { StationDetails } from 'userInterface/react/components/StationDetails';

describe('userInterface/react/components/FilterWithDateRangeAndSelect/index.js', () => {
  test('it can renders with default values as expected', () => {
    const name = '97 - C/ TARRAGONA 141';
    const type = 'BIKE';
    const component = create(<StationDetails name={name} type={type} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('it can renders with values as expected', () => {
    const name = '97 - C/ TARRAGONA 141';
    const type = 'BIKE';
    const address = 'Tarragona';
    const addressNumber = '141';
    const zipCode = '08014';

    const component = create(<StationDetails
      name={name}
      type={type}
      address={address}
      addressNumber={addressNumber}
      zipCode={zipCode}
    />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
