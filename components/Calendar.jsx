import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/styles-calendar';

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
                    const formattedData = {};

                    parsedData.forEach((entry) => {
                        const formattedDate = formatDate(new Date(entry.date));
                        formattedData[formattedDate] = { amount: entry.totalWater };
                    });

                    setData(formattedData);
                }
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };


        loadData();
    }, []);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const daysInMonth = [
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const renderCalendar = () => {
        const daysCount = daysInMonth[currentMonth] + (currentMonth === 1 && isLeapYear(currentYear) ? 1 : 0);
        const monthCalendar = [];

        for (let day = 1; day <= daysCount; day++) {
            const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const isToday = date === selectedDay;
            const color = getColorForDay(date);

            monthCalendar.push(
                <TouchableOpacity
                    key={date}
                    style={[
                        styles.calendarDay,
                        { backgroundColor: isToday ? 'blue' : color },
                    ]}
                    onPress={() => setSelectedDay(date)}
                >
                    <Text style={{ color: isToday ? 'white' : 'black' }}>{day}</Text>
                </TouchableOpacity>
            );
        }

        return (
            <View style={styles.monthContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={prevMonth}>
                        <Text style={styles.buttonText}>{'<—'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.monthTitle}>{getMonthName(currentMonth)} {currentYear}</Text>
                    <TouchableOpacity style={styles.button} onPress={nextMonth}>
                        <Text style={styles.buttonText}>{'—>'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.calendarContainer}>
                    {monthCalendar}
                </View>
            </View>
        );
    };

    const getColorForDay = (date) => {
        if (isDataForDay(date)) {
            const amount = data[date].amount;
            if (amount < 1000) {
                return 'red';
            } else if (amount >= 1000 && amount < 1500) {
                return 'yellow';
            } else if (amount >= 1500 && amount < 2000) {
                return 'lightgreen';
            } else {
                return 'green';
            }
        }
        return 'transparent';
    };

    const getMonthName = (monthIndex) => {
        const months = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        return months[monthIndex];
    };

    const isDataForDay = (date) => {
        return data[date] !== undefined;
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Calendrier</Text> */}
            <View style={styles.calendarContainer}>
                <ScrollView style={styles.scrollView}>
                    {renderCalendar()}
                </ScrollView>
            </View>
            <View style={styles.dayDataContainer}>
                {selectedDay && (
                    <View>
                        <Text style={styles.dayDataTitle}>Données pour le {selectedDay}</Text>
                        {isDataForDay(selectedDay) ? (
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
