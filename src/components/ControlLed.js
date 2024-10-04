import React from 'react';
import { Button } from 'react-native';

const ControlLed = ({ onPress, title }) => {
  return <Button onPress={onPress} title={title} />;
};

export default ControlLed;
