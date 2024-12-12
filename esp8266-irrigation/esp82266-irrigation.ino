#include <DHT.h>
#include <ESP8266WiFi.h> 
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>

#define DHT_SENSOR_PIN  D7 // The ESP8266 pin D7 connected to DHT11 sensor
#define DHT_SENSOR_TYPE DHT11

DHT dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);

const char* ssid = "Your_SSID";
const char* password = "Your_PASSWORD";
const int pumpPin = D1; // GPIO pin connected to the relay
const int humiditySensorPin = A0; // Analog pin connected to the humidity sensor
const int minSensorValue = 320; // Minimum sensor value (inside water)
const int maxSensorValue = 1024; // Maximum sensor value (outside water)
const unsigned long pumpActivationInterval = 20000; // Time interval to activate the pump (20 seconds)
const String notificationServerAddress = "http://192.168.1.4:8000/pumpActivated"; // Adjust the endpoint as needed

const int ledPin = D2; // Change to your LED pin
const int lightSensorPin = D0; // Change to your light sensor pin
unsigned long lastToggleTime = 0;
const unsigned long toggleInterval = 1200000; // 20 minutes in milliseconds

ESP8266WebServer server(80);

bool pumpState = false;
bool ledState = false;
unsigned long lastActivationTime = 0;
bool userActivated = false;
bool pumpNotificationSent = false;
bool darknessNotificationSent = false;

void setup() {
  pinMode(pumpPin, OUTPUT);
  digitalWrite(pumpPin, LOW); // Ensure the pump is off initially

  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  Serial.begin(9600);
  dht_sensor.begin(); // Initialize the DHT sensor

  Serial.println();
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected");
  Serial.print("NodeMCU IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/temperatureHumidityData", HTTP_GET, handleTemperatureHumidityData);
  server.on("/activateIrrigation", HTTP_GET, handleTogglePump);
  server.on("/pumpState", HTTP_GET, handlePumpState);
  server.on("/humiditySensorData", HTTP_GET, handleSensorData);
  server.on("/toggle", HTTP_GET, handleToggle);
  server.on("/lightSensorData", HTTP_GET, handleLightSensorData);

  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();

  int humidityValue = analogRead(humiditySensorPin); // Read humidity sensor value
  float humidityPercentage = map(humidityValue, maxSensorValue, minSensorValue, 0, 100); // Map the sensor value to percentage (0-100)
  
  Serial.print("Humidity Sensor Data: ");
  Serial.print(humidityPercentage);
  Serial.println("%");
  
  // Check humidity percentage
  if (humidityPercentage == 0) {
    // Activate water pump if user has not activated it manually
    if (!userActivated && millis() - lastActivationTime >= pumpActivationInterval) {
      activatePump();
      lastActivationTime = millis();
    }
    Serial.println("Water pump activated");
  } else {
    // Deactivate water pump
    deactivatePump();
    Serial.println("Water pump deactivated");
  }
  
  // Automatic LED activation based on darkness detection or 20-minute interval
  unsigned long currentMillis = millis();
  if (currentMillis - lastToggleTime >= toggleInterval) {
    lastToggleTime = currentMillis;
    handleAutomaticToggle();
  }
  
  delay(1000); // Delay for 1 second before reading again
}

void handleTemperatureHumidityData() {
  // Read humidity
  float humi = dht_sensor.readHumidity();
  // Read temperature in Celsius
  float temperature_C = dht_sensor.readTemperature();
  // Read temperature in Fahrenheit
  float temperature_F = dht_sensor.readTemperature(true);

  if (!isnan(temperature_C) && !isnan(temperature_F) && !isnan(humi)) {
    // Construct the response payload
    String response = "Humidity: " + String(humi) + "% | Temperature: " + String(temperature_C) + "°C ~ " + String(temperature_F) + "°F";
    server.send(200, "text/plain", response);
  } else {
    server.send(500, "text/plain", "Error reading sensor data");
  }
}

void handleTogglePump() {
  pumpState = !pumpState;
  digitalWrite(pumpPin, pumpState ? HIGH : LOW);
  server.send(200, "text/plain", pumpState ? "Pump ON" : "Pump OFF");

  if (pumpState) {
    sendPumpActivationNotification(); // Send notification when the pump is manually activated
  }
}

void handlePumpState() {
  server.send(200, "text/plain", pumpState ? "Pump ON" : "Pump OFF");
}

void handleSensorData() {
  // Read humidity sensor value
  int humidityValue = analogRead(humiditySensorPin);
  float humidityPercentage = map(humidityValue, maxSensorValue, minSensorValue, 0, 100); // Map the sensor value to percentage (0-100)

  // Send the sensor data as a JSON response
  String response = "{\"humidity\": " + String(humidityPercentage) + "}";
  server.send(200, "application/json", response);
}

void handleToggle() {
  ledState = !ledState;
  digitalWrite(ledPin, ledState ? HIGH : LOW);
  server.send(200, "text/plain", ledState ? "LED ON" : "LED OFF");
}

void handleLightSensorData() {
  int lightValue = analogRead(lightSensorPin);
  server.send(200, "text/plain", String(lightValue));
}

void handleAutomaticToggle() {
  int lightValue = analogRead(lightSensorPin);
  bool isDark = lightValue < 1000; // Adjust the threshold for darkness as per your requirement
  if (isDark && !darknessNotificationSent) {
    ledState = true;
    digitalWrite(ledPin, HIGH);
    Serial.println("Automatic LED activation");
    sendDarknessDetectedNotification();
    darknessNotificationSent = true;
  } else if (!isDark && darknessNotificationSent) {
    ledState = false;
    digitalWrite(ledPin, LOW);
    Serial.println("Automatic LED deactivation");
    darknessNotificationSent = false;
  }
}

void activatePump() {
  pumpState = true;
  digitalWrite(pumpPin, HIGH);
  if (!pumpNotificationSent) {
    sendPumpActivationNotification(); // Send notification when the pump is activated
    pumpNotificationSent = true;
  }
}

void deactivatePump() {
  pumpState = false;
  digitalWrite(pumpPin, LOW);
  pumpNotificationSent = false; // Reset notification flag when the pump is deactivated
}

void sendPumpActivationNotification() {
  WiFiClient client; // Create a WiFiClient object
  HTTPClient http;
  Serial.print("Sending HTTP request to: ");
  Serial.println(notificationServerAddress);
  http.begin(client, notificationServerAddress); // Adjust the endpoint as needed
  int httpResponseCode = http.GET();
  Serial.print("HTTP response code: ");
  Serial.println(httpResponseCode);
  http.end();
}

void sendDarknessDetectedNotification() {
  WiFiClient client; // Create a WiFiClient object
  HTTPClient http;
  Serial.print("Sending HTTP request to: ");
  Serial.println("http://192.168.1.4:8000/darknessDetected");
  http.begin(client, "http://192.168.1.4:8000/darknessDetected"); // Adjust the endpoint as needed
  int httpResponseCode = http.GET();
  Serial.print("HTTP response code: ");
  Serial.println(httpResponseCode);
  http.end();
}
