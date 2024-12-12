import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchHumiditySensorData } from '../../services/NodeMCUService';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);


const CurrentSoilHumidity = () => {
  const [soilHumidityData, setSoilHumidityData] = useState({
    labels: ["Soil Humidity"],
    datasets: [
      {
        label: "Humidity",
        data: [0],
        backgroundColor: 'rgba(26, 255, 146, 0.6)',
        borderColor: 'rgba(26, 255, 146, 1)',
        borderWidth: 2,
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const humidity = await fetchHumiditySensorData();
        setSoilHumidityData({
          labels: ["Soil Humidity"],
          datasets: [
            {
              label: "Humidity",
              data: [humidity / 100], // Adjust to your data scaling
              backgroundColor: 'rgba(26, 255, 146, 0.6)',
              borderColor: 'rgba(26, 255, 146, 1)',
              borderWidth: 2,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 style={styles.title}>Current Soil Humidity</h2>
          <div style={styles.chart}>
            <Bar
              data={soilHumidityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Humidity (%)',
                    },
                  },
                },
              }}
            />
          </div>
        </>
      )}
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

export default CurrentSoilHumidity;
