import {React , act} from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrentAirHumidity from './CurrentAirHumidity';
import { fetchHumidityTemperatureData } from '../../services/NodeMCUService';


jest.mock('react-chartjs-2', () => ({
  Line: jest.fn(() => null)
}));

// Mock the service
jest.mock('../../services/NodeMCUService', () => ({
  fetchHumidityTemperatureData: jest.fn()
}));

describe('CurrentAirHumidity Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders component title', async () => {
    // Mock successful data fetch
    fetchHumidityTemperatureData.mockResolvedValue({
      humidity: 45,
      temperature_C: 25,
      temperature_F: 77
    });

    await act(async () => {
      render(<CurrentAirHumidity />);
    });
    
    // Check if title is rendered
    expect(screen.getByText('Temperature and Humidity')).toBeInTheDocument();
  });

  test('fetches and displays temperature data', async () => {
    // Mock successful data fetch
    const mockData = {
      humidity: 45,
      temperature_C: 25,
      temperature_F: 77
    };
    fetchHumidityTemperatureData.mockResolvedValue(mockData);

    await act(async () => {
      render(<CurrentAirHumidity />);
    });

    // Wait for data to be fetched
    await waitFor(() => {
      expect(fetchHumidityTemperatureData).toHaveBeenCalledTimes(1);
    });
  });

  test('handles data fetching error', async () => {
    // Mock console.error to prevent error logging in test output
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mock fetch failure
    fetchHumidityTemperatureData.mockRejectedValue(new Error('Fetch failed'));

    await act(async () => {
      render(<CurrentAirHumidity />);
    });

    // Wait and verify error is logged
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching temperature data:', 
        expect.any(Error)
      );
    });

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  test('renders Line chart with correct props', async () => {
    // Mock the Line component from react-chartjs-2
    const { Line } = require('react-chartjs-2');

    // Mock successful data fetch
    const mockData = {
      humidity: 45,
      temperature_C: 25,
      temperature_F: 77
    };
    fetchHumidityTemperatureData.mockResolvedValue(mockData);

    await act(async () => {
      render(<CurrentAirHumidity />);
    });

    // Wait for data to be fetched and component to update
    await waitFor(() => {
      // Verify Line component was called with correct data and options
      expect(Line).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            labels: ['Temperature (°C)', 'Humidity (%)'],
            datasets: [
              expect.objectContaining({
                data: [25, 45],
                label: 'Temperature and Humidity'
              })
            ]
          },
          options: expect.objectContaining({
            responsive: true,
            maintainAspectRatio: false
          })
        }),
        {}
      );
    });
  });

  test('component styles are correct', async () => {
    // Mock successful data fetch
    fetchHumidityTemperatureData.mockResolvedValue({
      humidity: 45,
      temperature_C: 25,
      temperature_F: 77
    });

    let renderResult;
    await act(async () => {
      renderResult = render(<CurrentAirHumidity />);
    });

    // Get the main container
    const mainContainer = renderResult.container.firstChild;

    // Check container styles
    expect(mainContainer).toHaveStyle(`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    `);

    // Additional style checks can be added here
  });
});