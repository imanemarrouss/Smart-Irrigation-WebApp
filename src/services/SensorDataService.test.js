import { SensorDataService } from './SensorDataService';

describe('SensorDataService', () => {
  describe('getSensorData', () => {
    it('should return an object with all required sensor fields', async () => {
      const sensorData = await SensorDataService.getSensorData();
      
      expect(sensorData).toHaveProperty('soilMoisture');
      expect(sensorData).toHaveProperty('temperature');
      expect(sensorData).toHaveProperty('humidity');
      expect(sensorData).toHaveProperty('lightIntensity');
    });

    it('should return values between 1 and 100 for all sensors', async () => {
      const sensorData = await SensorDataService.getSensorData();
      
      Object.values(sensorData).forEach(value => {
        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThanOrEqual(100);
      });
    });

    it('should return numeric values for all sensors', async () => {
      const sensorData = await SensorDataService.getSensorData();
      
      Object.values(sensorData).forEach(value => {
        expect(typeof value).toBe('number');
        expect(Number.isInteger(value)).toBe(true);
      });
    });

    it('should return different values on subsequent calls', async () => {
      const firstReading = await SensorDataService.getSensorData();
      const secondReading = await SensorDataService.getSensorData();
      
      // Note: There's a very small chance this could fail due to random numbers
      // being the same, but it's extremely unlikely for all values to match
      expect(firstReading).not.toEqual(secondReading);
    });

    it('should resolve immediately as it is a mock service', async () => {
      const startTime = Date.now();
      await SensorDataService.getSensorData();
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(100); // Should resolve in less than 100ms
    });
  });
});