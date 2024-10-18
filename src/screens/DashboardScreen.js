import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useHistory } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import TemperatureScreen from './TemperatureScreen';
import SoilScreenData from './SoilScreenData';
import LightScreen from './LightScreen';

const DashboardScreen = () => {
  const history = useHistory();

  const navigateToSensorDataHistory = () => {
    history.push('/sensor-data-history');
  };

  return (
    <View style={styles.container}>
      <SoilScreenData />
      <TemperatureScreen />
      <LightScreen />
      <View style={styles.buttonContainer}>
        <Button title="Check Sensor Data History" onPress={navigateToSensorDataHistory} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  buttonContainer: {
    marginVertical: 20,
  },
});

export default DashboardScreen;
