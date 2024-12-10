// import React from 'react';
// import  { useState } from 'react';
// import {  useNavigate } from 'react-router-dom';
// // import { NavigationContainer } from '@react-navigation/native';
// // import DashboardScreen from '../screens/DashboardScreen';
// // import LightControlScreen from '../screens/LightControlScreen';
// // import Notification from '../components/notification';
// // import LightHumidityGraphScreen from '../screens/LightHumidityGraphScreen';
// // import AirTemperature from '../screens/AirTemperature';
// // import SensorDataHistory from '../screens/SensorDataHistory';
// // import TemperatureScreen from '../screens/TemperatureScreen';
// // import IrrigationHistoryScreen from '../screens/IrrigationHistoryScreen';
// // import SoilScreenData from '../screens/SoilScreenData';
// // import LightScreen from '../screens/LightScreen';
// // import LightSensorHistory from '../screens/LightSensorHistory';
// // import SoilHumidityHistory from '../screens/SoilHumidityHistory';
// // import AirTemperatureHumidityHistory from '../screens/AirTemperatureHumidityHistory';
// import HomeScreen from '../component/HomeScreen';
// import LoginScreen from '../component/Login/LoginScreen';
// // import Home from '../components/Home';
// // //import AddPlants from '../components/pictures/AddPlants';
// // import CameraView from '../screens/CameraView';
// // import AddPlants from '../screens/AddPlants';
// // import { PlantDetails } from '../screens/PlantDetails';
// // import { AllPlants } from '../screens/AllPlants';
// // import RagChainScreen from '../screens/RagChainScreen';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// // import AskQuestion from '../component/Rag/AskQuestion';
// // import Reference from '../component/Reference';
// //import SubDomain from '../component/SubDomain';
// import Reference from '../component/Reference';
// import UserProfile from '../component/Login/UserProfile';
// import HomeScreenPlants from '../component/Plants/HomeScreenPlants';
// import AddPlantsScreen from '../component/Plants/AddPlantsScreen';
// import EditPlantsScreen from '../component/Plants/EditPlantsScreen';
// import PlantDetailScreen from '../component/Plants/PlantDetailScreen';
// import About from '../component/About';
// import Contact from '../component/Contact.js';
// import NotFound from '../component/NotFound.js';
// import SensorDataHistory from '../component/SensorDataHistory';
// import MainLayout from '../component/MainLayout.js';
// import './AppNavigator.css';


// const [showProfile, setShowProfile] = useState(false);
//   const [lastPage, setLastPage] = useState('/home-screen-plants');
//   const navigate = useNavigate();
// const handleShowProfile = () => {
//   setShowProfile(prevState => !prevState);  // Toggle the visibility of UserProfile
// };

// const handleReturnToPreviousPage = () => {
//   setShowProfile(false);
//   navigate(lastPage);
// };

// const AppNavigator = () => {
//   return (
//     <BrowserRouter>
//      <Routes>
//         <Route path="/" element={<HomeScreen />} />
//         <Route path="/home" element={<HomeScreen />} />
//         <Route path="/referentiel" element={<Reference />} />
//         <Route path="/sign" element={<LoginScreen />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/user-profile" element={<UserProfile />} />
        
      
//       <Route path='/history' element={<SensorDataHistory/>} />

//         <Route path="/home-screen-plants" element={<HomeScreenPlants />} />
//         <Route path="/plant-detail-screen/:id" element={<PlantDetailScreen />} />
//         <Route path="/add-plants-screen" element={<AddPlantsScreen />} />
//         <Route path="/edit-plants-screen/:plantId" element={<EditPlantsScreen />} />
//         <Route path="*" element={<NotFound />} />
//         <Route
//         path="/user-profile"
//         element={<UserProfile setShowProfile={setShowProfile} handleReturnToPreviousPage={handleReturnToPreviousPage} />}
//       />
//       <Route
//         element={<MainLayout showProfile={showProfile} setShowProfile={setShowProfile} handleShowProfile={handleShowProfile} handleReturnToPreviousPage={handleReturnToPreviousPage} />}
//       ></Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppNavigator;


import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

// Import components
import HomeScreen from '../component/HomeScreen';
import LoginScreen from '../component/Login/LoginScreen';
import Reference from '../component/Reference';
import UserProfile from '../component/Login/UserProfile';
import HomeScreenPlants from '../component/Plants/HomeScreenPlants';
import AddPlantsScreen from '../component/Plants/AddPlantsScreen';
import EditPlantsScreen from '../component/Plants/EditPlantsScreen';
import PlantDetailScreen from '../component/Plants/PlantDetailScreen';
import About from '../component/About';
import Contact from '../component/Contact';
import NotFound from '../component/NotFound';
import SensorDataHistory from '../component/SensorDataHistory';
import MainLayout from '../component/MainLayout';
import CurrentDataDashboard from '../component/CurrentData/CurrentDataDashboard';
import Form from '../component/PlantDiseaseDetection/Form';
import DiseaseDetection from '../component/PlantDiseaseDetection/DiseaseDetection';

// Wrapper for components that need useNavigate
const RouterWrapper = () => {
  const [showProfile, setShowProfile] = useState(false); // State to control profile visibility
  const [lastPage, setLastPage] = useState('/home-screen-plants'); // Track last visited page
  const navigate = useNavigate();

  // Toggle UserProfile visibility
  const handleShowProfile = () => {
    setShowProfile(prevState => !prevState);
  };

  // Return to the last visited page
  const handleReturnToPreviousPage = () => {
    setShowProfile(false);
    navigate(lastPage); // Navigate back to the last page
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomeScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/referentiel" element={<Reference />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<LoginScreen />} />

      {/* Protected Routes with Sidebar Layout */}
      <Route element={
        <MainLayout
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          handleShowProfile={handleShowProfile}
          handleReturnToPreviousPage={handleReturnToPreviousPage}
        />
      }>
        {/* <Route index element={<HomeScreenPlants />} /> */}
        <Route path="/history" element={<SensorDataHistory />} />
        <Route path="/current-data" element={<CurrentDataDashboard />} />
        <Route path="/home-screen-plants" element={<HomeScreenPlants />} />
        <Route path="/plant-detail-screen/:id" element={<PlantDetailScreen />} />
        <Route path="/add-plants-screen" element={<AddPlantsScreen />} />
        {/* <Route path="/detect" element={<Form />} /> */}
        <Route path="/detect" element={<DiseaseDetection />} />
        <Route path="/edit-plants-screen/:plantId" element={<EditPlantsScreen />} />
      </Route>

      User Profile
      <Route path="/user-profile" element={
        <UserProfile
          setShowProfile={setShowProfile}
          handleReturnToPreviousPage={handleReturnToPreviousPage}
        />
      } />
    </Routes>
  );
};

// Main App Router Component
const AppNavigator = () => {
  return (
    <BrowserRouter>
      <RouterWrapper />
    </BrowserRouter>
  );
};

export default AppNavigator;
