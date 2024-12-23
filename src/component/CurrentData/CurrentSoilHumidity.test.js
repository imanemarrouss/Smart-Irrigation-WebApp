import React from 'react';
import { render, screen, act } from '@testing-library/react';
import CurrentSoilHumidity from './CurrentSoilHumidity';
import { fetchHumiditySensorData } from '../../services/NodeMCUService';

jest.mock('../../services/NodeMCUService');

describe('CurrentSoilHumidity Component', () => {
  test('renders loading message initially', async () => {
    fetchHumiditySensorData.mockResolvedValue(50); // Mock a default response

    render(<CurrentSoilHumidity />);

    const loadingMessage = screen.getByText(/loading/i);
    expect(loadingMessage).toBeInTheDocument();

    await act(async () => {
      // Wait for the async fetch to complete
    });
  });

  test('renders chart with fetched data', async () => {
    fetchHumiditySensorData.mockResolvedValue(75); // Mock sensor data value

    await act(async () => {
      render(<CurrentSoilHumidity />);
    });

    const titleElement = screen.getByText(/current soil humidity/i);
    expect(titleElement).toBeInTheDocument();

    const chartElement = screen.getByText(/humidity/i);
    expect(chartElement).toBeInTheDocument();
  });

  test('handles fetch error gracefully', async () => {
    fetchHumiditySensorData.mockRejectedValue(new Error('Failed to fetch data'));

    await act(async () => {
      render(<CurrentSoilHumidity />);
    });

    const loadingMessage = screen.queryByText(/loading/i);
    expect(loadingMessage).not.toBeInTheDocument(); // Ensure loading message is gone

  });
});