import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getLocationFromPrompt, getScheduleAndPackingList } from '../backend/services/geminiService';
import { getTravelInfo } from '../backend/services/mapsService';
import * as Location from 'expo-location';

const Secretary: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePlanTrip = async () => {
        try {
            setLoading(true);

            // 1. Get current GPS location
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required.');
                return;
            }
            const gps = await Location.getCurrentPositionAsync({});
            const originCoords = {
                latitude: gps.coords.latitude,
                longitude: gps.coords.longitude,
            };

            // 2. Get destination from Gemini
            const destination = await getLocationFromPrompt(userInput);

            // 3. Get travel info from Maps
            const travelInfo = await getTravelInfo(originCoords, destination);

            // 4. Get schedule + packing list from Gemini
            const plan = await getScheduleAndPackingList(userInput, travelInfo.duration);

            console.log('Destination:', destination);
            console.log('Travel Info:', travelInfo);
            console.log('Plan:', plan);

            Alert.alert('Plan Ready!', 'Check console for full plan.');

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong while planning.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                How can I help you today?
            </Text>
            <View style={styles.box}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your event details"
                    value={userInput}
                    onChangeText={setUserInput}
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button title="Plan My Trip" onPress={handlePlanTrip} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    box: {
        width: '100%',
        minHeight: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default Secretary;
