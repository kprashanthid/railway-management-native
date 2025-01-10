import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const BookingConfirmationScreen = ({ route, navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Booking Successful!</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    marginTop: 8,
    fontSize: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#3b82f6", // Tailwind's blue-500
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default BookingConfirmationScreen;
