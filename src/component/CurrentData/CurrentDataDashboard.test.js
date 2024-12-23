import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentDataDashboard from './CurrentDataDashboard';
import CurrentAirHumidity from './CurrentAirHumidity';
import CurrentSoilHumidity from './CurrentSoilHumidity';

jest.mock('./CurrentAirHumidity', () => () => <div>Mocked Current Air Humidity</div>);
jest.mock('./CurrentSoilHumidity', () => () => <div>Mocked Current Soil Humidity</div>);

describe('CurrentDataDashboard Component', () => {
  test('renders both CurrentAirHumidity and CurrentSoilHumidity components', () => {
    render(<CurrentDataDashboard />);

    const airHumidityComponent = screen.getByText(/mocked current air humidity/i);
    const soilHumidityComponent = screen.getByText(/mocked current soil humidity/i);

    expect(airHumidityComponent).toBeInTheDocument();
    expect(soilHumidityComponent).toBeInTheDocument();
  });
});
