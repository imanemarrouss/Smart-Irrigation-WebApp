import React from 'react';
import { Text } from 'react-native';

const SensorDataDisplay = ({ value }) => {
  return <Text>Light Sensor Data: {value}</Text>;
};

export default SensorDataDisplay;
