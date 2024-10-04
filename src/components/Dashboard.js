import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SensorDataService } from '../services/SensorDataService';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    soilMoisture: 0,
    temperature: 0,
    humidity: 0,
    lightIntensity: 0,
  });

  useEffect(() => {
    // Récupérer les données des capteurs à intervalles réguliers
    const fetchData = async () => {
      const data = await SensorDataService.getSensorData();
      setSensorData(data);
    };

    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Rafraîchir toutes les 5 secondes (par exemple)

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Humidité du Sol: {sensorData.soilMoisture}%</Text>
      <Text style={styles.label}>Température: {sensorData.temperature}°C</Text>
      <Text style={styles.label}>Humidité de l'Air: {sensorData.humidity}%</Text>
      <Text style={styles.label}>Intensité Lumineuse: {sensorData.lightIntensity} Lux</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Dashboard;
