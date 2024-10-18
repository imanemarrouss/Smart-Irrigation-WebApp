const SensorDataService = {
    // Fonction pour récupérer les données des capteurs (simulé pour l'exemple)
    getSensorData: async () => {
      // Simuler une requête à un serveur ou à l'Arduino
      // Dans cet exemple, nous générons des valeurs aléatoires
      const randomValue = () => Math.floor(Math.random() * 100) + 1;
  
      return {
        soilMoisture: randomValue(),
        temperature: randomValue(),
        humidity: randomValue(),
        lightIntensity: randomValue(),
      };
    },
  };
  
  export { SensorDataService };
  