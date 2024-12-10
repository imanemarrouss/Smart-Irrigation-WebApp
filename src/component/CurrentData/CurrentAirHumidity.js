import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchHumidityTemperatureData } from '../../services/NodeMCUService';

const CurrentAirHumidity = () => {
  const [temperatureData, setTemperatureData] = useState({ humidity: 0, temperature_C: 0, temperature_F: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHumidityTemperatureData();
        setTemperatureData(data);
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['Temperature (°C)', 'Humidity (%)'],
    datasets: [
      {
        label: 'Temperature and Humidity',
        data: [temperatureData.temperature_C, temperatureData.humidity],
        data: [18, 60],

        borderColor: 'rgba(3, 107, 58, 1)',
        backgroundColor: 'rgba(3, 107, 58, 0.6)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Temperature and Humidity</h2>
      <div style={styles.chart}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  chart: {
    width: '100%',
    maxWidth: '600px', // Adjust based on your layout
    height: '300px', // Set height for the chart
    marginTop: '20px',
  },
};

export default CurrentAirHumidity ;

