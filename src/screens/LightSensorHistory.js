import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // Importing Chart.js for web
import { fetchAllLightSensorData } from '../services/NodeMCUService';

const LightSensorHistory = () => {
  const [lightSensorData, setLightSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lightData = await fetchAllLightSensorData();
        setLightSensorData(lightData);
      } catch (error) {
        console.error('Error fetching light sensor data:', error);
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
          label: 'Light Sensor Data',
          data: validData.map(item => parseInt(item.value, 10)),
          backgroundColor: 'rgba(26, 255, 146, 0.5)',
          borderColor: 'rgba(26, 255, 146, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        }
      ]
    };
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Light Sensor Data History</h2>
      {lightSensorData.length > 0 ? (
        <div style={styles.chartContainer}>
          <Line 
            data={formatDataForChart(lightSensorData)} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              plugins: {
                legend: {
                  labels: {
                    color: 'rgba(255, 255, 255, 1)', // Change legend color
                  },
                },
              },
            }} 
          />
        </div>
      ) : (
        <p>No data available</p>
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
    margin: '16px',
    backgroundColor: '#1E2923', // Background color
    color: 'white', // Text color
    padding: '20px',
    borderRadius: '8px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'rgba(26, 255, 146, 1)', // Title color
  },
  chartContainer: {
    width: '100%',
    maxWidth: '600px', // Max width for the chart
    height: '300px', // Set height for the chart
    margin: '0 auto', // Center the chart
  },
};

export default LightSensorHistory;
