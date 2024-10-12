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
import UserProfile from '../components/Login/UserProfile';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />

      {/* <Stack.Screen name="AddPlants" component={AddPlants} /> */}
{/* <Stack.Screen name="Home" component={Home} /> */}
{/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      {/* <Stack.Screen name="AddPlant" component={AddPlants} options={{ title: 'add Plant' }} />

         <Stack.Screen name="AllPlants" component={AllPlants} options={{ title: 'My PLANTS' }} />
      <Stack.Screen name="Camera" component={CameraView} options={{ title: 'camera' }} />
     
      <Stack.Screen name="LightControl" component={LightControlScreen} options={{ title: 'Tableau de Bord' }} />
      <Stack.Screen name="PlantDetails" component={PlantDetails} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Tableau de Bord' }} />
        
      
<Stack.Screen name="AddPlants" component={AddPlants} />
      {/* <Stack.Screen name="IrrigationHistoryScreen" component={IrrigationHistoryScreen} options={{ title: 'Tableau de Bord' }} /> */}

{/* <Stack.Screen name="RagChain" component={RagChainScreen} options={{ title: 'RAG Chain' }} /> */}

{/* <Stack.Screen name="SensorDataHistory" component={SensorDataHistory} options={{ title: 'Tableau de Bord' }} />  */}

                {/* <Stack.Screen name="LightControl" component={LightControlScreen} options={{ title: 'Tableau de Bord' }} /> */}
                {/* <Stack.Screen name="Notification" component={Notification} /> */}
        {/* <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Tableau de Bord' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
