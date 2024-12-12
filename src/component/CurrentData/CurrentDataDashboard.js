import React from 'react';
import CurrentAirHumidity from './CurrentAirHumidity';
import CurrentSoilHumidity from './CurrentSoilHumidity';

const CurrentDataDashboard = () => {
    

  return (
    <div style={styles.container}>
      <CurrentAirHumidity />
      <CurrentSoilHumidity />
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
    
