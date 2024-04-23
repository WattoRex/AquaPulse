import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Home from './components/home';
import Calendar from './components/Calendar';
// import Stats from './components/Stats';

const MainApp = () => {
  const [showHome, setShowHome] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  // const [showStats, setShowStats] = useState(false); 

  return (
    <View style={styles.container}>
      {/* Boutons pour basculer entre les composants */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.switchButton, showHome ? styles.activeButton : null]}
          onPress={() => { setShowHome(true); setShowCalendar(false); setShowStats(false) }}
        >
          <Text style={styles.switchButtonText}>
            Afficher l'application
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.switchButton, showCalendar ? styles.activeButton : null]}
          onPress={() => { setShowCalendar(true); setShowHome(false); setShowStats(false) }}
        >
          <Text style={styles.switchButtonText}>
            Afficher le calendrier
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.switchButton, showStats ? styles.activeButton : null]}
          onPress={() => { setShowStats(true); setShowHome(false); setShowCalendar(false) }}
        >
          <Text style={styles.switchButtonText}>
            Afficher les stats
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* Affiche le composant approprié en fonction de l'état */}
      {showHome && <Home />}
      {showCalendar && <Calendar />}
      {/* {showStats && <Stats />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  switchButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: 'darkblue',
  },
  switchButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MainApp;
