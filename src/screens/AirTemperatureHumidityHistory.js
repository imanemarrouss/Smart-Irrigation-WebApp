import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchAllHumidityTemperatureData } from '../services/NodeMCUService'; // Update with your actual path

const AirTemperatureHumidityHistory = () => {
  const [temperatureHumidityData, setTemperatureHumidityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const humidityTemperatureData = await fetchAllHumidityTemperatureData();
        setTemperatureHumidityData(humidityTemperatureData);
      } catch (error) {
        console.error('Error fetching humidity and temperature data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Air Temperature and Humidity History</h2>
      {temperatureHumidityData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={temperatureHumidityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature_C" stroke="#bd4833" activeDot={{ r: 8 }} name="Temperature (°C)" />
            <Line type="monotone" dataKey="humidity" stroke="#1e90ff" name="Humidity (%)" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p style={styles.noDataText}>No data available</p>
      )}
    </div>
  );
};

// Styling for the web
const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333',
  },
  noDataText: {
    fontSize: '18px',
    color: '#888',
    marginTop: '20px',
  },
};

export default AirTemperatureHumidityHistory;
