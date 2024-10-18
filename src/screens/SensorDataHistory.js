import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // Using react-chartjs-2 for charting
import { fetchAllLightSensorData, fetchAllSoilHumiditySensorData, fetchAllHumidityTemperatureData } from '../services/NodeMCUService';
import SoilHumidityHistory from './SoilHumidityHistory';
import LightSensorHistory from './LightSensorHistory';
import AirTemperatureHumidityHistory from './AirTemperatureHumidityHistory';

const SensorDataHistory = () => {
  const [lightSensorData, setLightSensorData] = useState([]);
  const [soilHumidityData, setSoilHumidityData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lightData = await fetchAllLightSensorData();
        setLightSensorData(lightData);

        const soilHumidity = await fetchAllSoilHumiditySensorData();
        setSoilHumidityData(soilHumidity);

        const humidityTemperatureData = await fetchAllHumidityTemperatureData();
        const temperatures = humidityTemperatureData.map(item => item.temperature_C);
        const humidities = humidityTemperatureData.map(item => item.humidity);
        setTemperatureData(temperatures);
        setHumidityData(humidities);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDataForChart = (data) => {
    const validData = data.filter(item => !isNaN(parseInt(item.value, 10)));
    return {
      labels: validData.map(item => new Date(item.timestamp).toLocaleTimeString()),
      datasets: [
        {
          label: 'Sensor Data',
          data: validData.map(item => parseInt(item.value, 10)),
          fill: false,
          borderColor: 'rgba(26, 255, 146, 1)',
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sensor Data History</h1>
      <h2>Light Sensor Data History</h2>
      {lightSensorData.length > 0 ? (
        <Line data={formatDataForChart(lightSensorData)} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
      ) : (
        <p>No data available</p>
      )}

      <h2>Soil Humidity Sensor Data History</h2>
      {soilHumidityData.length > 0 ? (
        <Line data={formatDataForChart(soilHumidityData)} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
      ) : (
        <p>No data available</p>
      )}

      <h2>Air Temperature and Humidity History</h2>
      <Line
        data={{
          labels: temperatureData.map((_, index) => `T${index + 1}`),
          datasets: [
            {
              label: 'Temperature (°C)',
              data: temperatureData,
              borderColor: 'rgba(26, 255, 146, 1)',
              fill: false,
              tension: 0.1,
            },
            {
              label: 'Humidity (%)',
              data: humidityData,
              borderColor: 'rgba(134, 65, 244, 1)',
              fill: false,
              tension: 0.1,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        }}
      />

      <LightSensorHistory />
      <SoilHumidityHistory />
      <AirTemperatureHumidityHistory />
    </div>
  );
};

export default SensorDataHistory;
