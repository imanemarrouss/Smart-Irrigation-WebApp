import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './SensorDataHistory.css'; // Import the CSS file

// Register necessary components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const SensorDataHistory = () => {
  const [humidityData, setHumidityData] = useState([]);
  const [lightData, setLightData] = useState([]);
  const [soilHumidityData, setSoilHumidityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch sensor data from Firebase
  const fetchSensorData = async (sensorType, setData) => {
    const url = `https://smart-garden-dc0c4-default-rtdb.firebaseio.com/${sensorType}.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching ${sensorType}: ${response.statusText}`);
      }
      const data = await response.json();
      setData(Object.values(data)); // Convert object to array
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchSensorData('humiditySensorData', setHumidityData),
        fetchSensorData('lightSensorData', setLightData),
        fetchSensorData('soilHumiditySensorData', setSoilHumidityData),
      ]);
    };

    fetchData();
  }, []);

  // Prepare chart data
  const prepareChartData = (data, label) => {
    const timestamps = data.map(item => item.timestamp);
    const values = data.map(item => item.value);
    return {
      labels: timestamps,
      datasets: [
        {
          label: label,
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    };
  };

  // Render loading state, error message, or data
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <div className="chart-container">
        <h2>Humidity Sensor Data</h2>
        <Line className="line-chart" data={prepareChartData(humidityData, 'Humidity')} options={{ responsive: true }} />
      </div>

      <div className="chart-container">
        <h2>Light Sensor Data</h2>
        <Line className="line-chart" data={prepareChartData(lightData, 'Light')} options={{ responsive: true }} />
      </div>

      <div className="chart-container">
        <h2>Soil Humidity Sensor Data</h2>
        <Line className="line-chart" data={prepareChartData(soilHumidityData, 'Soil Humidity')} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default SensorDataHistory;
