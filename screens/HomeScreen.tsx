import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Railway Management System</Text>
      <Pressable
        onPress={() => navigation.navigate("SeatAvailability")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Check Availability</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
  },
});

export default HomeScreen;
