import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Line } from 'react-chartjs-2';
import { fetchData } from '../services/NodeMCUService';
import { database } from '../config/firebaseConfig';
import { ref, get } from 'firebase/database';

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Current Pump Status: {pumpStatus}</Text>
      <Text style={styles.title}>Current Sensor Status: {sensorStatus}</Text>
      <Text style={styles.subtitle}>Irrigation History:</Text>
      
      {irrigationHistory.length > 0 ? (
        <Line data={chartData} options={chartOptions} height={220} />
      ) : (
        <Text>No data available</Text>
      )}
      
      {irrigationHistory.map((entry) => (
        <View key={entry.id} style={styles.historyEntry}>
          <Text>Pump Status: {entry.pumpStatus}</Text>
          <Text>Sensor Status: {entry.sensorStatus}</Text>
          <Text>Timestamp: {new Date(entry.timestamp).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  historyEntry: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
  },
});

export default IrrigationHistoryScreen;
