import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { getAccessToken } from "../utils/authService";

const SeatAvailabilityScreen = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [availability, setAvailability] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const checkAvailability = async () => {
    setLoading(true);
    setError("");

    try {
      const token = await getAccessToken(); // Fetch token from auth service
      const response = await axios.get(
        "http://192.168.112.185:8000/api/trains/availability/",
        {
          params: { source, destination },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAvailability(response.data);
    } catch (err: any) {
      setError("Error fetching seat availability.");
      console.error(err.response || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (train: any) => {
    navigation.navigate("Booking", { train });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Check Seat Availability</Text>

      <TextInput
        style={styles.input}
        placeholder="Source"
        value={source}
        onChangeText={setSource}
      />

      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />

      <Button title="Check Availability" onPress={checkAvailability} />

      {loading && <ActivityIndicator style={styles.loading} />}
      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.trainList}>
        <ScrollView style={{ flex: 1 }}>
          {availability.length > 0 ? (
            availability.map((train, index) => (
              <View key={index} style={styles.trainCard}>
                <Text style={styles.trainName}>{train.name}</Text>
                <Text>Source: {train.source}</Text>
                <Text>Destination: {train.destination}</Text>
                <Text>Total Seats: {train.total_seats}</Text>
                <Text>Available Seats: {train.available_seats}</Text>
                <Text>
                  Departure: {new Date(train.departure).toLocaleString()}
                </Text>
                <Text>Arrival: {new Date(train.arrival).toLocaleString()}</Text>

                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => handleBookNow(train)}
                >
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>No trains available.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  loading: {
    marginTop: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  trainList: {
    marginTop: 20,
    display: "flex",
    flex: 1,
  },
  trainCard: {
    padding: 20,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  trainName: {
    fontSize: 18,
    fontWeight: "600",
  },
  bookButton: {
    marginTop: 15,
    backgroundColor: "#3b82f6", // Tailwind's blue-500
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default SeatAvailabilityScreen;
