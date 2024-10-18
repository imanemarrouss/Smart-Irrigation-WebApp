import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // Using Chart.js for web
import { fetchLightSensorData } from '../services/NodeMCUService';

const LightScreen = () => {
  const [lightData, setLightData] = useState({
    labels: ["Light Intensity"],
    datasets: [{
      label: 'Light Intensity',
      data: [0],
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
        const rawLightData = await fetchLightSensorData();
        const parsedLightData = parseLightSensorData(rawLightData);
        setLightData(parsedLightData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseLightSensorData = (rawData) => {
    const lightIntensity = parseFloat(rawData);
    return {
      labels: ["Light Intensity"],
      datasets: [{
        label: 'Light Intensity',
        data: [lightIntensity / 1024], // Assuming the light intensity is a percentage
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
        <>
          <h1 style={styles.title}>Current Light Data</h1>
          <div style={styles.chartContainer}>
            <Line data={lightData} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 1, // Assuming the light intensity is a percentage (0-1)
                },
              },
            }} />
          </div>
        </>
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
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  chartContainer: {
    width: '100%',
    maxWidth: '600px', // Max width for the chart
    height: '300px', // Set height for the chart
    margin: '0 auto', // Center the chart
  },
};

export default LightScreen;
