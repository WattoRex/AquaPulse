import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        position: 'relative',
        top: 30,
    },
    title: {
        fontSize: 24,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        width: '30%',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    monthContainer: {
        marginBottom: 20,
    },
    monthTitle: {
        fontSize: 20,
        marginBottom: 10,
        alignSelf: 'center',
    },
    calendarContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    calendarDay: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
    },
    dayDataContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    dayDataTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
});
