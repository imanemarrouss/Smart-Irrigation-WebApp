import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import DashboardScreen from '../screens/DashboardScreen';
// import LightControlScreen from '../screens/LightControlScreen';
// import Notification from '../components/notification';
// import LightHumidityGraphScreen from '../screens/LightHumidityGraphScreen';
// import AirTemperature from '../screens/AirTemperature';
// import SensorDataHistory from '../screens/SensorDataHistory';
// import TemperatureScreen from '../screens/TemperatureScreen';
// import IrrigationHistoryScreen from '../screens/IrrigationHistoryScreen';
// import SoilScreenData from '../screens/SoilScreenData';
// import LightScreen from '../screens/LightScreen';
// import LightSensorHistory from '../screens/LightSensorHistory';
// import SoilHumidityHistory from '../screens/SoilHumidityHistory';
// import AirTemperatureHumidityHistory from '../screens/AirTemperatureHumidityHistory';
import HomeScreen from '../component/HomeScreen';
import LoginScreen from '../component/Login/LoginScreen';
// import Home from '../components/Home';
// //import AddPlants from '../components/pictures/AddPlants';
// import CameraView from '../screens/CameraView';
// import AddPlants from '../screens/AddPlants';
// import { PlantDetails } from '../screens/PlantDetails';
// import { AllPlants } from '../screens/AllPlants';
// import RagChainScreen from '../screens/RagChainScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import AskQuestion from '../component/Rag/AskQuestion';
// import Reference from '../component/Reference';
//import SubDomain from '../component/SubDomain';
import Reference from '../component/Reference';
import UserProfile from '../component/Login/UserProfile';
import HomeScreenPlants from '../component/Plants/HomeScreenPlants';
import AddPlantsScreen from '../component/Plants/AddPlantsScreen';
import EditPlantsScreen from '../component/Plants/EditPlantsScreen';
import PlantDetailScreen from '../component/Plants/PlantDetailScreen';



const AppNavigator = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path='/home' element={<HomeScreen/>}></Route>
      <Route path='/referentiel' element={<Reference/>} />
      <Route path='/login' element={<LoginScreen/>} />
      
        <Route path="/user-profile" element={<UserProfile />}/ >
        <Route path="/home-screen-plants" element={<HomeScreenPlants />} />
        <Route path="/plant-detail-screen/:id" element={<PlantDetailScreen />} />
        <Route path="/add-plants-screen" element={<AddPlantsScreen />} />
        <Route path="/edit-plants-screen/:plantId" element={<EditPlantsScreen />} />
              
    </Routes>
    </BrowserRouter>
  );
};

export default AppNavigator;
