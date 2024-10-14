import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import LightControlScreen from '../screens/LightControlScreen';
import Notification from '../components/notification';
import LightHumidityGraphScreen from '../screens/LightHumidityGraphScreen';
import AirTemperature from '../screens/AirTemperature';
import SensorDataHistory from '../screens/SensorDataHistory';
import TemperatureScreen from '../screens/TemperatureScreen';
import IrrigationHistoryScreen from '../screens/IrrigationHistoryScreen';
import SoilScreenData from '../screens/SoilScreenData';
import LightScreen from '../screens/LightScreen';
import LightSensorHistory from '../screens/LightSensorHistory';
import SoilHumidityHistory from '../screens/SoilHumidityHistory';
import AirTemperatureHumidityHistory from '../screens/AirTemperatureHumidityHistory';
import HomeScreen from '../components/HomeScreen';
import LoginScreen from '../components/Login/LoginScreen';
import Home from '../components/Home';
//import AddPlants from '../components/pictures/AddPlants';
import CameraView from '../screens/CameraView';
import AddPlants from '../screens/AddPlants';
import { PlantDetails } from '../screens/PlantDetails';
import { AllPlants } from '../screens/AllPlants';
import RagChainScreen from '../screens/RagChainScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AskQuestion from '../components/Rag/AskQuestion';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path='/home' element={<HomeScreen/>}></Route>
      <Route path='/referentiel' element={<AskQuestion/>} />

    </Routes>
    </BrowserRouter>
  );
};

export default AppNavigator;
