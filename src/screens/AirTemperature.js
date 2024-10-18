import React, { useState, useEffect } from 'react';
import { Line, ProgressBar } from 'react-chartjs-2';
import SoilScreenData from './SoilScreenData';  // Assuming this is also adapted for the web
import {
  fetchHumidityTemperatureData,
  fetchLightSensorData,
  fetchHumiditySensorData
} from '../services/NodeMCUService';

const AirTemperature = () => {
  const [temperatureData, setTemperatureData] = useState({ humidity: 0, temperature_C: 0, temperature_F: 0 });
  const [soilHumidityData, setSoilHumidityData] = useState({ labels: ["Soil Humidity"], data: [0] });
  const [humidityTempData, setHumidityTempData] = useState({ labels: ["Humidity", "Temperature (C)", "Temperature (F)"], data: [0, 0, 0] });
  const [lightData, setLightData] = useState({ labels: ["Light Intensity"], data: [0] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawHumidityTempData = await fetchHumidityTemperatureData();
        setHumidityTempData(parseSensorData(rawHumidityTempData));

        const rawLightData = await fetchLightSensorData();
        setLightData(parseLightSensorData(rawLightData));

        const rawSoilHumidityData = await fetchHumiditySensorData();
        setSoilHumidityData(parseSoilHumidityData(rawSoilHumidityData));

        const data = await fetchHumidityTemperatureData();
        setTemperatureData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const parseSensorData = (rawData) => {
    const humidityMatch = rawData.match(/Humidity: (\d+\.\d+)%/);
    const tempCMatch = rawData.match(/Temperature: (\d+\.\d+)°C/);
    const tempFMatch = rawData.match(/~ (\d+\.\d+)°F/);

    const humidity = humidityMatch ? parseFloat(humidityMatch[1]) : 0;
    const tempC = tempCMatch ? parseFloat(tempCMatch[1]) : 0;
    const tempF = tempFMatch ? parseFloat(tempFMatch[1]) : 0;

    return {
      labels: ["Humidity", "Temperature (C)", "Temperature (F)"],
      data: [humidity, tempC, tempF]
    };
  };

  const parseLightSensorData = (rawData) => {
    const lightIntensity = parseFloat(rawData);
    return { labels: ["Light Intensity"], data: [lightIntensity / 1024] };
  };

  const parseSoilHumidityData = (rawData) => {
    const soilHumidity = parseFloat(rawData);
    return { labels: ["Soil Humidity"], data: [soilHumidity / 1024] };
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Current Light Data</h2>
          <ProgressBar
            data={{
              labels: lightData.labels,
              datasets: [{
                data: lightData.data,
                backgroundColor: 'rgba(26, 255, 146, 0.2)',
                borderColor: 'rgba(26, 255, 146, 1)',
                borderWidth: 1,
              }]
            }}
            options={{ maintainAspectRatio: false }}
          />

          <h2>Current Air Temperature and Humidity</h2>
          <Line
            data={{
              labels: ['Temperature', 'Humidity'],
              datasets: [{
                label: 'Air Data',
                data: [temperatureData.temperature_C, temperatureData.humidity],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
              }]
            }}
            options={{ responsive: true, maintainAspectRatio: false }}
          />

          <SoilScreenData /> {/* Assuming this is also adapted for the web */}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  }
};

export default AirTemperature;
