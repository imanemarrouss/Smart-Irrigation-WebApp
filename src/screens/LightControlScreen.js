import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { toggleLED, fetchLightSensorData, activateIrrigation, fetchHumiditySensorData } from '../services/NodeMCUService';
import Icon from '@material-ui/icons/ArrowBack';

const LightControlScreen = () => {
    const [ledStatus, setLedStatus] = useState('OFF');
    const [lightSensorData, setLightSensorData] = useState('N/A');
    const [humiditySensorData, setHumiditySensorData] = useState('N/A');

    useEffect(() => {
        fetchLightSensorData().then((data) => setLightSensorData(data));
        fetchHumiditySensorData().then((data) => setHumiditySensorData(data));
    }, []);

    const handleToggleLED = async () => {
        try {
            await toggleLED();
            setLedStatus(ledStatus === 'OFF' ? 'ON' : 'OFF');
        } catch (error) {
            console.error('Error toggling LED:', error);
        }
    };

    const handleActivateIrrigation = async () => {
        try {
            await activateIrrigation();
            console.log('Irrigation activated');
        } catch (error) {
            console.error('Error activating irrigation:', error);
        }
    };

    const handleAutomaticLEDActivation = async () => {
        const currentLightValue = parseInt(lightSensorData);
        const isDark = currentLightValue < 1000;

        if (isDark || ledStatus === 'OFF') {
            await handleToggleLED();
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleAutomaticLEDActivation();
        }, 1000); // Check every second

        return () => clearInterval(interval);
    }, [lightSensorData, ledStatus]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon style={styles.icon} onClick={() => {/* Implement navigation */}} />
                <Text style={styles.headerText}>Back to Home</Text>
            </View>
            <Image src={require('../utils/plant.png')} style={styles.plantImage} />
            <TouchableOpacity onClick={handleToggleLED} style={styles.activateButton}>
                <Text style={styles.activateButtonText}>Toggle LED ({ledStatus})</Text>
            </TouchableOpacity>
            <TouchableOpacity onClick={handleActivateIrrigation} style={styles.activateButton}>
                <Text style={styles.activateButtonText}>Activate Irrigation</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        padding: 10,
        width: '100%',
        position: 'absolute',
        top: 0,
    },
    headerText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#4CAF50',
    },
    plantImage: {
        width: 240,
        height: 350,
        marginBottom: 10,
    },
    activateButton: {
        width: 250,
        height: 50,
        marginTop: 20,
        backgroundColor: '#637D51',
        borderRadius: 35,
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    activateButtonText: {
        fontSize: 18,
        lineHeight: 44,
        textAlign: 'center',
        color: '#F3FFD6',
    },
});

export default LightControlScreen;
