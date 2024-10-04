import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // Importing Chart.js for web
import { fetchHumidityTemperatureData } from '../services/NodeMCUService';

const LightSensorData = () => {
  const [data, setData] = useState({
    labels: ["Humidity", "Temperature (C)", "Temperature (F)"],
    datasets: [{
      label: 'Sensor Data',
      data: [0, 0, 0],
      backgroundColor: 'rgba(26, 255, 146, 0.5)',
      borderColor: 'rgba(26, 255, 146, 1)',
      borderWidth: 1,
      tension: 0.4,
    }],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchHumidityTemperatureData();
        const parsedData = parseSensorData(rawData);
        setData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseSensorData = (rawData) => {
    const humidityMatch = rawData.match(/Humidity: (\d+\.\d+)%/);
    const tempCMatch = rawData.match(/Temperature: (\d+\.\d+)°C/);
    const tempFMatch = rawData.match(/~ (\d+\.\d+)°F/);

    const humidity = humidityMatch ? parseFloat(humidityMatch[1]) / 100 : 0;
    const tempC = tempCMatch ? parseFloat(tempCMatch[1]) / 100 : 0;
    const tempF = tempFMatch ? parseFloat(tempFMatch[1]) / 100 : 0;

    return {
      labels: ["Humidity", "Temperature (C)", "Temperature (F)"],
      datasets: [{
        label: 'Sensor Data',
        data: [humidity, tempC, tempF],
        backgroundColor: 'rgba(26, 255, 146, 0.5)',
        borderColor: 'rgba(26, 255, 146, 1)',
        borderWidth: 1,
        tension: 0.4,
      }],
    };
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.chartContainer}>
          <Line 
            data={data} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 1, // Assuming humidity and temperature are percentages
                },
              },
            }} 
          />
        </div>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa', // Light background
    minHeight: '100vh', // Full height
  },
  chartContainer: {
    width: '100%',
    maxWidth: '600px', // Max width for the chart
    height: '300px', // Set height for the chart
    margin: '0 auto', // Center the chart
  },
};

export default LightSensorData;
