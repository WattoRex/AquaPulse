import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles/styles-home';

const App = () => {
  const [totalWater, setTotalWater] = useState(0);
  const [goal, setGoal] = useState(2000);
  const [inputValue, setInputValue] = useState('');

  // Fonction pour charger les données de consommation d'eau depuis AsyncStorage lors du montage du composant
  useEffect(() => {
    const loadWaterData = async () => {
      try {
        // Récupère les données de consommation d'eau depuis AsyncStorage
        const waterData = await AsyncStorage.getItem('waterData');

        // Vérifie si des données existent
        if (waterData !== null) {
          const parsedData = JSON.parse(waterData);

          // Vérifie si les données sont du jour actuel
          if (parsedData.date === new Date().toDateString()) {
            setTotalWater(parsedData.totalWater); // Met à jour la consommation totale d'eau avec la valeur stockée
          } else {
            setTotalWater(0); // Réinitialise la consommation totale d'eau si les données ne sont pas du jour actuel
          }
        }
      } catch (error) {
        console.log('Error loading water data:', error); // Affiche une erreur en cas de problème lors du chargement des données
      }
    };

    loadWaterData(); // Appelle la fonction pour charger les données de consommation d'eau
  }, []); // Le tableau vide signifie que ce useEffect s'exécute une seule fois lors du montage du composant

  // Fonction pour sauvegarder les données de consommation d'eau dans AsyncStorage
  const saveWaterData = async (value) => {
    try {
      // Crée un objet avec la date actuelle et la consommation d'eau actuelle
      const waterData = {
        date: new Date().toDateString(),
        totalWater: value,
      };

      // Stocke les données de consommation d'eau dans AsyncStorage
      await AsyncStorage.setItem('waterData', JSON.stringify(waterData));
    } catch (error) {
      console.error('Error saving water data', error); // Affiche une erreur en cas de problème lors de la sauvegarde des données
    }
  };
  const addWater = () => {
    // Vérifie si l'entrée de l'utilisateur est vide ou contient uniquement des chiffres
    if (!inputValue || !/^[0-9]+$/.test(inputValue)) {
      return; // Retourne sans rien faire si l'entrée n'est pas valide
    }

    // Utilise une expression régulière pour filtrer les caractères non numériques
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    const newValue = totalWater + parseInt(inputValue, 10);
    setTotalWater(newValue);
    saveWaterData(newValue);
    setInputValue('');
  };


  const waterHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(waterHeight, {
      toValue: (percentage / 100) * 180,
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
        <Animated.View style={[styles.water, { height: waterHeight }]} />
        <Text style={styles.percentage}>{`${percentage.toFixed(1)}%`}</Text>
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

export default App;