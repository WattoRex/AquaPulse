import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const waterData = [
    { date: "Mon Apr 16 2024", totalWater: 1200 },
    { date: "Tue Apr 17 2024", totalWater: 1400 },
    { date: "Wed Apr 18 2024", totalWater: 1300 },
    { date: "Thu Apr 19 2024", totalWater: 1500 },
    { date: "Fri Apr 20 2024", totalWater: 1600 },
    { date: "Sat Apr 21 2024", totalWater: 1450 },
    { date: "Sun Apr 22 2024", totalWater: 1550 }
];

const WaterChart = () => {
    const maxWater = Math.max(...waterData.map(data => data.totalWater));
    const chartData = waterData.slice(-7).map(data => data.totalWater);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Consommation en eau des 7 derniers jours</Text>
            <View style={styles.chart}>
                {chartData.map((value, index) => (
                    <View key={index} style={[styles.bar, { height: (value / maxWater) * 200 }]}></View>
                ))}
            </View>
            <View style={styles.labels}>
                {waterData.slice(-7).map((data, index) => (
                    <Text key={index} style={styles.label}>{data.date.split(' ')[1]} {data.date.split(' ')[2]}</Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    chart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        height: 200,
        marginBottom: 20
    },
    bar: {
        width: 20,
        backgroundColor: 'blue',
        borderRadius: 5
    },
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    label: {
        fontSize: 12
    }
});

export default WaterChart;
