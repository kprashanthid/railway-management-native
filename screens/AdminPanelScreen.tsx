import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { getAccessToken } from "@/utils/authService";
import TrainAddedSuccessfully from "./TrainAddedSuccefully";

const AdminPanelScreen = () => {
  const navigation = useNavigation();
  const [trainName, setTrainName] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTrain = async () => {
    setLoading(true);
    setError("");

    try {
      const token = await getAccessToken();
      await axios.post(
        "http://192.168.112.185:8000/api/admin/add-train/",
        {
          name: trainName,
          train_number: trainNumber,
          source,
          destination,
          total_seats: totalSeats,
          available_seats: availableSeats,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setModalVisible(true); // Show success modal
      resetForm(); // Reset form fields after successful addition
    } catch (err: any) {
      setError("Error adding train, please try again.");
      console.error("Error:", err.response || err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTrainName("");
    setTrainNumber("");
    setSource("");
    setDestination("");
    setTotalSeats("");
    setAvailableSeats("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Train Name"
        value={trainName}
        onChangeText={setTrainName}
      />
      <TextInput
        style={styles.input}
        placeholder="Train Number"
        value={trainNumber}
        onChangeText={setTrainNumber}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Total Seats"
        keyboardType="numeric"
        value={totalSeats}
        onChangeText={setTotalSeats}
      />
      <TextInput
        style={styles.input}
        placeholder="Available Seats"
        keyboardType="numeric"
        value={availableSeats}
        onChangeText={setAvailableSeats}
      />
      <Button title="Add Train" onPress={handleAddTrain} />
      {loading && <ActivityIndicator style={styles.loading} />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TrainAddedSuccessfully
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  loading: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 20,
  },
});

export default AdminPanelScreen;
