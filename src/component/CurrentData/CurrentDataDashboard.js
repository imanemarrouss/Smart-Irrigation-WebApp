import React from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentAirHumidity from './CurrentAirHumidity';
import CurrentSoilHumidity from './CurrentSoilHumidity';

const CurrentDataDashboard = () => {
    const navigate = useNavigate();

    const navigateToSensorDataHistory = () => {
        navigate('/history');
      };

  return (
    <div style={styles.container}>
      <CurrentAirHumidity />
      <CurrentSoilHumidity />
      <div style={styles.buttonContainer}>
        <button onClick={navigateToSensorDataHistory}>
          Check Sensor Data History
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: '20px',
  },
  buttonContainer: {
    margin: '20px 0',
  },
};

export default  CurrentDataDashboard;
    
