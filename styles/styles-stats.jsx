import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    graphWrapper: {
        marginTop: 20,
    },
    graphTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    graphContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    graphLineContainer: {
        alignItems: 'center',
        marginRight: 10,
    },
    graphLine: {
        width: 15,
        borderRadius: 5,
    },
    graphDate: {
        fontSize: 12,
        marginBottom: 5,
    },
});
