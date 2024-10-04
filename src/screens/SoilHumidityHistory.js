import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchAllSoilHumiditySensorData } from '../services/NodeMCUService';

const SoilHumidityHistory = () => {
  const [soilHumidityData, setSoilHumidityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const soilHumidity = await fetchAllSoilHumiditySensorData();
        setSoilHumidityData(soilHumidity);
      } catch (error) {
        console.error('Error fetching soil humidity data:', error);
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
          label: 'Soil Humidity',
          data: validData.map(item => parseInt(item.value, 10)),
          backgroundColor: 'rgba(26, 255, 146, 0.2)',
          borderColor: 'rgba(26, 255, 146, 1)',
          borderWidth: 2,
          fill: true,
        }
      ]
    };
  };

  const chartData = formatDataForChart(soilHumidityData);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '16px',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const chartStyle = {
    margin: '8px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '600px', // Adjust based on your layout
    height: '300px', // Set height for the chart
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Soil Humidity Sensor Data History</h2>
      {soilHumidityData.length > 0 ? (
        <div style={chartStyle}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Soil Humidity (%)',
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

export default SoilHumidityHistory;
