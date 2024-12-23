


// import React, { useState } from 'react';
// import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

// // Import components
// import HomeScreen from '../component/HomeScreen';
// import LoginScreen from '../component/Login/LoginScreen';
// import Reference from '../component/Reference';
// import UserProfile from '../component/Login/UserProfile';
// import HomeScreenPlants from '../component/Plants/HomeScreenPlants';
// import AddPlantsScreen from '../component/Plants/AddPlantsScreen';
// import EditPlantsScreen from '../component/Plants/EditPlantsScreen';
// import PlantDetailScreen from '../component/Plants/PlantDetailScreen';
// import About from '../component/About';
// import Contact from '../component/Contact';
// import NotFound from '../component/NotFound';
// import SensorDataHistory from '../component/SensorDataHistory';
// import MainLayout from '../component/MainLayout';
// import CurrentDataDashboard from '../component/CurrentData/CurrentDataDashboard';
// import DiseaseDetection from '../component/PlantDiseaseDetection/DiseaseDetection';
// import Dashboard from '../component/Dash/Dashboard';

// // Wrapper for components that need useNavigate
// const RouterWrapper = () => {
//   const [showProfile, setShowProfile] = useState(false); // State to control profile visibility
//   const [lastPage] = useState('/home-screen-plants'); // Track last visited page
//   const navigate = useNavigate();

//   // Toggle UserProfile visibility
//   const handleShowProfile = () => {
//     setShowProfile(prevState => !prevState);
//   };

//   // Return to the last visited page
//   const handleReturnToPreviousPage = () => {
//     setShowProfile(false);
//     navigate(lastPage); // Navigate back to the last page
//   };

//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/" element={<HomeScreen />} />
//       <Route path="/home" element={<HomeScreen />} />
//       <Route path="/referentiel" element={<Reference />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="*" element={<NotFound />} />
//       <Route path="/login" element={<LoginScreen />} />

//       {/* Protected Routes with Sidebar Layout */}
//       <Route element={
//         <MainLayout
//           showProfile={showProfile}
//           setShowProfile={setShowProfile}
//           handleShowProfile={handleShowProfile}
//           handleReturnToPreviousPage={handleReturnToPreviousPage}
//         />
//       }>
//         <Route path="/dash" element={<Dashboard />} />

//         {/* <Route index element={<HomeScreenPlants />} /> */}
//         <Route path="/history" element={<SensorDataHistory />} />
//         <Route path="/current-data" element={<CurrentDataDashboard />} />
//         <Route path="/home-screen-plants" element={<HomeScreenPlants />} />
//         <Route path="/plant-detail-screen/:id" element={<PlantDetailScreen />} />
//         <Route path="/add-plants-screen" element={<AddPlantsScreen />} />
//         {/* <Route path="/detect" element={<Form />} /> */}
//         <Route path="/detect" element={<DiseaseDetection />} />
//         <Route path="/edit-plants-screen/:plantId" element={<EditPlantsScreen />} />
//       </Route>

//       User Profile
//       <Route path="/user-profile" element={
//         <UserProfile
//           setShowProfile={setShowProfile}
//           handleReturnToPreviousPage={handleReturnToPreviousPage}
//         />
//       } />
//     </Routes>
//   );
// };

// // Main App Router Component
// const AppNavigator = () => {
//   return (
//     <BrowserRouter>
//       <RouterWrapper />
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
import DiseaseDetection from '../component/PlantDiseaseDetection/DiseaseDetection';

// Wrapper for components that need useNavigate
const RouterWrapper = () => {
  const [showProfile, setShowProfile] = useState(false); // State to control profile visibility
  const [lastPage] = useState('/home-screen-plants'); // Track last visited page
  const navigate = useNavigate();

  const handleShowProfile = () => {
    setShowProfile(prevState => !prevState);
  };

  const handleReturnToPreviousPage = () => {
    setShowProfile(false);
    navigate(lastPage);
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomeScreen data-testid="home-screen" />} />
      <Route path="/home" element={<HomeScreen data-testid="home-screen" />} />
      <Route path="/referentiel" element={<Reference data-testid="reference" />} />
      <Route path="/about" element={<About data-testid="about" />} />
      <Route path="/contact" element={<Contact data-testid="contact" />} />
      <Route path="*" element={<NotFound data-testid="not-found" />} />
      <Route path="/login" element={<LoginScreen data-testid="login-screen" />} />

      {/* Protected Routes with Sidebar Layout */}
      <Route 
        element={
          <MainLayout
            data-testid="main-layout"
            showProfile={showProfile}
            setShowProfile={setShowProfile}
            handleShowProfile={handleShowProfile}
            handleReturnToPreviousPage={handleReturnToPreviousPage}
          />
        }
      >
        <Route path="/history" element={<SensorDataHistory />} />
        <Route path="/current-data" element={<CurrentDataDashboard />} />
        <Route path="/home-screen-plants" element={<HomeScreenPlants />} />
        <Route path="/plant-detail-screen/:id" element={<PlantDetailScreen />} />
        <Route path="/add-plants-screen" element={<AddPlantsScreen />} />
        <Route path="/edit-plants-screen/:plantId" element={<EditPlantsScreen />} />
        <Route path="/detect" element={<DiseaseDetection />} />
      </Route>

      <Route 
        path="/user-profile" 
        element={
          <UserProfile
            setShowProfile={setShowProfile}
            handleReturnToPreviousPage={handleReturnToPreviousPage}
          />
        } 
      />
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
