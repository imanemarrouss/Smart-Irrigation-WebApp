# ESP8266 Smart Irrigation System

This folder contains the code for the ESP8266-based smart irrigation system, which integrates with the main React.js frontend and Flask backend project.

## Features
- Soil moisture monitoring
- Automatic and manual pump control
- Light-based LED toggling
- Temperature and humidity monitoring
- Notification integration

## Hardware Requirements
- ESP8266 microcontroller
- DHT11 sensor
- Soil moisture sensor
- Light sensor (optional)
- Relay module (to control the pump)
- Water pump
- LED (optional)

## How to Use

### 1. Setup Instructions
1. Install the necessary libraries:
   - DHT sensor library
   - ESP8266WiFi
   - ESP8266WebServer
   - ESP8266HTTPClient

2. Open the `main.ino` file in Arduino IDE.

3. Update the Wi-Fi credentials in the code:
   ```cpp
   const char* ssid = "Your_SSID";
   const char* password = "Your_PASSWORD";
