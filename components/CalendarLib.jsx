import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/styles-calendar';
import {
    formatDate,
    daysInMonth,
    isLeapYear,
    getMonthName,
    isDataForDay,
    nextMonth,
    prevMonth,
} from '../lib/calendarUtils';

const Calendar = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [data, setData] = useState({});
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const loadData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('waterData');
                if (storedData !== null) {
                    const parsedData = JSON.parse(storedData);
                    const formattedDate = formatDate(new Date(parsedData.date));
                    setData({ [formattedDate]: { amount: parsedData.totalWater } });
                }
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        loadData();
    }, []);

    const renderCalendar = () => {
        const daysCount = daysInMonth[currentMonth] + (currentMonth === 1 && isLeapYear(currentYear) ? 1 : 0);
        const monthCalendar = [];

        for (let day = 1; day <= daysCount; day++) {
            const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const isData = isDataForDay(data, date);
            const isToday = date === selectedDay;

            monthCalendar.push(
                <TouchableOpacity
                    key={date}
                    style={[
                        styles.calendarDay,
                        { backgroundColor: isToday ? 'blue' : isData ? 'green' : 'transparent' },
                    ]}
                    onPress={() => setSelectedDay(date)}
                >
                    <Text style={{ color: isToday ? 'white' : isData ? 'white' : 'black' }}>{day}</Text>
                </TouchableOpacity>
            );
        }

        return (
            <View style={styles.monthContainer}>
                <Text style={styles.monthTitle}>{getMonthName(currentMonth)} {currentYear}</Text>
                <View style={styles.calendarContainer}>
                    {monthCalendar}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.monthContainer}>
                <Text style={styles.title}>Calendrier</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => prevMonth(currentMonth, currentYear, setCurrentMonth, setCurrentYear)}>
                        <Text style={styles.buttonText}>Mois précédent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => nextMonth(currentMonth, currentYear, setCurrentMonth, setCurrentYear)}>
                        <Text style={styles.buttonText}>Mois suivant</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.scrollView}>
                    {renderCalendar()}
                </ScrollView>
            </View>
            <View style={styles.dayDataContainer}>
                {selectedDay && (
                    <View>
                        <Text style={styles.dayDataTitle}>Données pour le {selectedDay}</Text>
                        {isDataForDay(data, selectedDay) ? (
                            <Text>Consommation : {data[selectedDay].amount} mL</Text>
                        ) : (
                            <Text>Aucune donnée pour ce jour.</Text>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default Calendar;
