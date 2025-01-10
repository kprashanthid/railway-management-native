import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { getAccessToken } from "../utils/authService"; // Function to get token from authService

const BookingScreen = ({ route, navigation }: any) => {
  const { train } = route.params; // train object passed from SeatAvailabilityScreen
  const [seats, setSeats] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle the booking request
  const handleBooking = async () => {
    if (!seats || isNaN(Number(seats)) || Number(seats) <= 0) {
      setError("Please enter a valid number of seats.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      navigation.navigate("BookingConfirm");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Error booking seats. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Booking for: {train.name}</Text>
      <Text>Source: {train.source}</Text>
      <Text>Destination: {train.destination}</Text>
      <Text>Available Seats: {train.available_seats}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter number of seats"
        value={seats}
        onChangeText={setSeats}
        keyboardType="numeric"
      />
      {error && <Text style={styles.error}>{error}</Text>}

      <Button title="Book Now" onPress={handleBooking} />
      {loading && <ActivityIndicator style={styles.loading} size="large" />}
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
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginTop: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginTop: 8,
  },
  loading: {
    marginTop: 16,
  },
});

export default BookingScreen;
