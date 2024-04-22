// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Easing } from 'react-native';
import './styles.css';

const App = () => {
    const [totalWater, setTotalWater] = useState(0);
    const [goal, setGoal] = useState(2000);
    const [inputValue, setInputValue] = useState('');
    const [fillAnimation] = useState(new Animated.Value(0));

    const addWater = () => {
        const newValue = totalWater + parseInt(inputValue, 10);
        setTotalWater(newValue);
        setInputValue('');
    };

    useEffect(() => {
        Animated.timing(fillAnimation, {
            toValue: percentage,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [totalWater]);

    const percentage = (totalWater / goal) * 100;
    const circleFill = `${percentage * 3.6}deg`;

    return (
        <View className="container">
            <Text className="title">Suivi de consommation d'eau</Text>
            <View className="circleContainer">
                <View className="circle" style={{ transform: `rotate(${circleFill})` }}></View>
                <Animated.View
                    className="circle fillCircle"
                    style={{
                        transform: `rotate(${circleFill})`,
                        backgroundColor: 'blue',
                        height: fillAnimation.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%'],
                        }),
                    }}
                ></Animated.View>
                <Text className="percentage">{`${percentage.toFixed(1)}%`}</Text>
            </View>
            <Text className="info">Consommation totale: {totalWater} mL</Text>
            <Text className="info">Objectif: {goal} mL</Text>
            <TextInput
                className="input"
                placeholder="Entrez le montant en mL"
                keyboardType="numeric"
                value={inputValue}
                onChangeText={setInputValue}
            />
            <TouchableOpacity className="button" onPress={addWater}>
                <Text className="buttonText">Ajouter</Text>
            </TouchableOpacity>
        </View>
    );
};

export default App;
