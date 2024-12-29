import { database } from '../config/firebaseConfig';
import { ref, push, get, child } from 'firebase/database';
import {
  toggleLED,
  fetchLightSensorData,
  fetchHumidityTemperatureData,
  activateIrrigation,
  fetchHumiditySensorData,
  fetchAllSoilHumiditySensorData,
  fetchData,
  fetchTemperatureSensorData,
  fetchAllLightSensorData,
  fetchAllHumidityTemperatureData
} from './NodeMCUService';

// Mock fetch
global.fetch = jest.fn();

// Mock Firebase
jest.mock('../config/firebaseConfig', () => ({
  database: {}
}));

jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  push: jest.fn(),
  get: jest.fn(),
  child: jest.fn()
}));

describe('NodeMCU Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    global.fetch.mockClear();
  });

  describe('toggleLED', () => {
    it('should successfully toggle LED', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true });
      await toggleLED();
      expect(fetch).toHaveBeenCalledWith('https://192.168.1.30/toggle');
    });

    it('should throw error when toggle fails', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });
      await expect(toggleLED()).rejects.toThrow('Failed to toggle LED');
    });
  });

  describe('fetchLightSensorData', () => {
    it('should fetch and save light sensor data', async () => {
      const mockData = '500';
      global.fetch.mockResolvedValueOnce({
        text: () => Promise.resolve(mockData)
      });
      push.mockResolvedValueOnce();

      const result = await fetchLightSensorData();

      expect(result).toEqual([mockData]);
      expect(push).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith('https://192.168.1.30/lightSensorData');
    });

    it('should handle errors gracefully', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));
      const result = await fetchLightSensorData();
      expect(result).toEqual([0]);
    });
  });

  describe('fetchHumidityTemperatureData', () => {
    it('should parse humidity and temperature data correctly', async () => {
      const mockResponse = 'Humidity:45.5|Temperature:23.5°C~74.3°F';
      global.fetch.mockResolvedValueOnce({
        text: () => Promise.resolve(mockResponse)
      });

      const result = await fetchHumidityTemperatureData();

      expect(result).toEqual({
        humidity: 45.5,
        temperature_C: 23.5,
        temperature_F: 74.3
      });
    });

    it('should handle errors gracefully', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));
      const result = await fetchHumidityTemperatureData();
      expect(result).toEqual({
        humidity: 0,
        temperature_C: 0,
        temperature_F: 0
      });
    });
  });

  describe('fetchHumiditySensorData', () => {
    it('should fetch and save soil humidity data', async () => {
      const mockData = { humidity: 75.5 };
      global.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockData)
      });
      push.mockResolvedValueOnce();

      const result = await fetchHumiditySensorData();

      expect(result).toBe(75.5);
      expect(push).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith('https://192.168.1.30/humiditySensorData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should handle errors gracefully', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));
      const result = await fetchHumiditySensorData();
      expect(result).toBe(0);
    });
  });

  describe('fetchAllSoilHumiditySensorData', () => {
    it('should fetch all soil humidity data from Firebase', async () => {
      const mockData = {
        key1: { value: 75, timestamp: '2024-01-01' },
        key2: { value: 80, timestamp: '2024-01-02' }
      };
      get.mockResolvedValueOnce({
        val: () => mockData,
        exists: () => true
      });

      const result = await fetchAllSoilHumiditySensorData();

      expect(result).toEqual([
        { id: 'key1', value: 75, timestamp: '2024-01-01' },
        { id: 'key2', value: 80, timestamp: '2024-01-02' }
      ]);
    });

    it('should handle empty data', async () => {
      get.mockResolvedValueOnce({
        val: () => null,
        exists: () => false
      });

      const result = await fetchAllSoilHumiditySensorData();
      expect(result).toEqual([]);
    });
  });

  describe('fetchData', () => {
    it('should fetch and save pump and sensor status', async () => {
      const setPumpStatus = jest.fn();
      const setSensorStatus = jest.fn();
      const mockPumpData = 'ON';
      const mockSensorData = 'ACTIVE';

      global.fetch
        .mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(mockPumpData)
        })
        .mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve(mockSensorData)
        });

      await fetchData(setPumpStatus, setSensorStatus);

      expect(setPumpStatus).toHaveBeenCalledWith(mockPumpData);
      expect(setSensorStatus).toHaveBeenCalledWith(mockSensorData);
      expect(push).toHaveBeenCalled();
    });

    it('should handle pump fetch error', async () => {
      const setPumpStatus = jest.fn();
      const setSensorStatus = jest.fn();

      global.fetch.mockResolvedValueOnce({ ok: false });

      await fetchData(setPumpStatus, setSensorStatus);

      expect(setPumpStatus).not.toHaveBeenCalled();
      expect(setSensorStatus).not.toHaveBeenCalled();
    });
  });

  describe('activateIrrigation', () => {
    it('should successfully activate irrigation', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true });
      await activateIrrigation();
      expect(fetch).toHaveBeenCalledWith('https://192.168.1.30/activateIrrigation');
    });

    it('should throw error when activation fails', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });
      await expect(activateIrrigation()).rejects.toThrow('Failed to activate irrigation');
    });
  });
});