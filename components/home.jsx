
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/styles-home';

const HomePage = () => {
    const [totalWater, setTotalWater] = useState(0);
    const [goal, setGoal] = useState(2000);
    const [inputValue, setInputValue] = useState('');

    // Fonction pour charger les données de consommation d'eau depuis AsyncStorage lors du montage du composant
    useEffect(() => {
        const loadWaterData = async () => {
            try {
                const waterData = await AsyncStorage.getItem('waterData');

                if (waterData !== null) {
                    const parsedData = JSON.parse(waterData);

                    const todayEntry = parsedData.find(entry => entry.date === new Date().toDateString());

                    if (todayEntry) {
                        setTotalWater(todayEntry.totalWater);
                    } else {
                        setTotalWater(0);
                    }
                }
            } catch (error) {
                console.log('Error loading water data:', error);
            }
        };

        loadWaterData();
    }, []);

    const saveWaterData = async (value) => {
        try {
            const newEntry = {
                date: new Date().toDateString(),
                totalWater: value,
            };

            let storedData = await AsyncStorage.getItem('waterData');
            if (storedData) {
                storedData = JSON.parse(storedData);
                const todayIndex = storedData.findIndex(entry => entry.date === newEntry.date);

                if (todayIndex !== -1) {
                    storedData[todayIndex] = newEntry;
                } else {
                    storedData.push(newEntry);
                }
            } else {
                storedData = [newEntry];
            }

            await AsyncStorage.setItem('waterData', JSON.stringify(storedData));
        } catch (error) {
            console.error('Error saving water data', error);
        }
    };

    const addWater = () => {
        if (!inputValue || !/^[0-9]+$/.test(inputValue)) {
            return;
        }

        const numericValue = inputValue.replace(/[^0-9]/g, '');

        const newValue = totalWater + parseInt(numericValue, 10);
        setTotalWater(newValue);
        saveWaterData(newValue);
        setInputValue('');
    };


    const waterHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(waterHeight, {
            toValue: (percentage / 100) * 233,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [totalWater]);

    const percentage = (totalWater / goal) * 100;

    const handleInputChange = (text) => {
        // Remplace tout caractère qui n'est pas un chiffre par une chaîne vide
        setInputValue(text.replace(/[^0-9]/g, ''));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Suivi de consommation d'eau</Text>
            <View style={styles.circleContainer}>
                <View style={styles.circleCotent}>
                    <Animated.View style={[styles.water, { height: waterHeight }]} />
                    <Text style={styles.percentage}>{`${percentage.toFixed(1)}%`}</Text>
                </View>
            </View>
            <Text style={styles.info}>Consommation totale: {totalWater} mL</Text>
            <Text style={styles.info}>Objectif: {goal} mL</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez le montant en mL"
                keyboardType="numeric"
                value={inputValue}
                onChangeText={handleInputChange}
            />
            <TouchableOpacity style={styles.button} onPress={addWater}>
                <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomePage;