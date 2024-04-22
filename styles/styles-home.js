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
  circleContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: "blue",
    borderWidth: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderTopColor: "blue",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderWidth: 10,
    position: "absolute",
    transform: [{ rotate: "0deg" }],
  },
  percentage: {
    fontSize: 20,
  },
  info: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  water: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "cyan",
    zIndex: -1,
  },
});