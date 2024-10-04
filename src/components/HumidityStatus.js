import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { fetchData } from '../services/NodeMCUService';

const HumidityStatus = () => {
  const [pumpStatus, setPumpStatus] = useState('');
  const [sensorStatus, setSensorStatus] = useState('');

  useEffect(() => {
    fetchData(setPumpStatus, setSensorStatus); // Call fetchData function
  }, []);

  return (
    <View>
      <Text>Pump Status: <Text>{pumpStatus}</Text></Text>
      <Text>Sensor Status: <Text>{sensorStatus}</Text></Text>
      <Button title="Refresh" onPress={() => fetchData(setPumpStatus, setSensorStatus)} />
    </View>
  );
};

export default HumidityStatus;
