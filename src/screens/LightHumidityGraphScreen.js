import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Line } from 'react-chartjs-2';
import { fetchLightSensorData, fetchHumiditySensorData, fetchHumidityTemperatureData } from '../services/NodeMCUService';

const screenWidth = Dimensions.get('window').width;

const LightHumidityGraphScreen = () => {
  const [lightSensorData, setLightSensorData] = useState([]);
  const [humiditySensorData, setHumiditySensorData] = useState([]);
  const [temperatureSensorData, setTemperatureSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lightData = await fetchLightSensorData();
        const humidityData = await fetchHumiditySensorData();
        const temperatureData = await fetchHumidityTemperatureData();

        setLightSensorData(lightData);
        setHumiditySensorData(humidityData);
        setTemperatureSensorData(temperatureData);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const lightChartData = {
    labels: Array.from({ length: lightSensorData.length }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: 'Light Intensity',
        data: lightSensorData,
        fill: false,
        backgroundColor: 'rgba(0, 255, 0, 1)',
        borderColor: 'rgba(0, 255, 0, 0.2)',
      },
    ],
  };

  const humidityChartData = {
    labels: Array.from({ length: humiditySensorData.length }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: 'Humidity Levels',
        data: humiditySensorData,
        fill: false,
        backgroundColor: 'rgba(0, 0, 255, 1)',
        borderColor: 'rgba(0, 0, 255, 0.2)',
      },
    ],
  };

  const temperatureChartData = {
    labels: Array.from({ length: temperatureSensorData.length }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: 'Temperature',
        data: temperatureSensorData,
        fill: false,
        backgroundColor: 'rgba(255, 99, 71, 1)',
        borderColor: 'rgba(255, 99, 71, 0.2)',
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sensor Data</Text>
      <View style={styles.chartContainer}>
        <Text style={styles.graphTitle}>Current Light Intensity</Text>
        <Line data={lightChartData} options={{ maintainAspectRatio: false }} />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.graphTitle}>Current Humidity</Text>
        <Line data={humidityChartData} options={{ maintainAspectRatio: false }} />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.graphTitle}>Current Temperature</Text>
        <Line data={temperatureChartData} options={{ maintainAspectRatio: false }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    marginVertical: 20,
    width: '100%',
    height: 300, // Adjust height for charts
  },
});

export default LightHumidityGraphScreen;
