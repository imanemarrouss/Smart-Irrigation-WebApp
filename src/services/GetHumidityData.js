const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const { Expo } = require("expo-server-sdk");

const BASE_URL = 'http://192.168.1.30';
const expo = new Expo();
const jsonParser = bodyParser.json();

const fetchHumidityData = async () => {
  const response = await fetch(`${BASE_URL}/humidityData`);
  if (!response.ok) {
    throw new Error('Failed to fetch humidity data');
  }
  return await response.json();
};

const sendPushNotification = async () => {
  try {
    const humidityData = await fetchHumidityData();
    const humidity = humidityData.humidity; // Assurez-vous d'adapter cette ligne selon la structure des données renvoyées par votre Arduino
    if (humidity < 30) {
      await expo.sendPushNotificationsAsync([
        {
          to: "ExponentPushToken[SPg0EMPcXY7VV5tMLxx4s_]",
          title: "soil water level too low!",
          body: "water your plant",
        },
      ]);
    }
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

sendPushNotification();