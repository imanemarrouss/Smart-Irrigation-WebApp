import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchData } from '../services/NodeMCUService';
import { database } from '../config/firebaseConfig';
import { ref, get } from 'firebase/database';
import './IrrigationHistoryScreen.css'; // Import the CSS file for styling

const IrrigationHistoryScreen = () => {
  const [pumpStatus, setPumpStatus] = useState('');
  const [sensorStatus, setSensorStatus] = useState('');
  const [irrigationHistory, setIrrigationHistory] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        await fetchData(setPumpStatus, setSensorStatus);

        // Fetch irrigation history from Firebase
        const irrigationHistoryRef = ref(database, 'irrigationHistory');
        const snapshot = await get(irrigationHistoryRef);
        const data = snapshot.val();

        if (data) {
          const formattedData = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setIrrigationHistory(formattedData);
        } else {
          setIrrigationHistory([]);
        }
      } catch (error) {
        console.error('Error fetching irrigation history:', error);
      }
    };

    getData();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: irrigationHistory.map(entry => new Date(entry.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Pump Status (ON=1, OFF=0)',
        data: irrigationHistory.map(entry => (entry.pumpStatus === 'ON' ? 1 : 0)),
        borderColor: 'rgba(26, 255, 146, 1)', // green
        fill: false,
      },
      {
        label: 'Soil Sensor Data',
        data: irrigationHistory.map(entry => parseFloat(entry.sensorStatus)),
        borderColor: 'rgba(134, 65, 244, 1)', // purple
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="container">
      <h1 className="title">Current Pump Status: {pumpStatus}</h1>
      <h2 className="title">Current Sensor Status: {sensorStatus}</h2>
      <h2 className="subtitle">Irrigation History:</h2>
      
      {irrigationHistory.length > 0 ? (
        <Line data={chartData} options={chartOptions} height={220} />
      ) : (
        <p>No data available</p>
      )}
      
      {irrigationHistory.map((entry) => (
        <div key={entry.id} className="historyEntry">
          <p>Pump Status: {entry.pumpStatus}</p>
          <p>Sensor Status: {entry.sensorStatus}</p>
          <p>Timestamp: {new Date(entry.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default IrrigationHistoryScreen;
