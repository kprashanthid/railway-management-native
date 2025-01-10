import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { storeTokens } from "../utils/authService"; // Import the function
import { RootStackParamList } from "../app/(tabs)/index"; // Ensure correct import path

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Tabs">;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://192.168.112.185:8000/api/token/",
        {
          username,
          password,
        }
      );

      await storeTokens(response.data.access, response.data.refresh);

      if (username === "Prashanth") {
        navigation.replace("AdminPanel");
      } else {
        navigation.replace("Home");
      }
    } catch (err: any) {
      setError("Login failed, please try again.");
      console.error("Login error:", err.response || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Admin credentials: username: Prashanth password: Mysql2001
      </Text>
      <Text style={styles.infoText}>
        User credentials: username: Prashanthk password: prashanthk
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#B0B0B0"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B0B0B0"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} color="#007BFF" />

      {loading && (
        <ActivityIndicator
          size="large"
          color="#007BFF"
          style={styles.loading}
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F7F7F7",
  },
  infoText: {
    color: "#333",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Roboto",
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Android shadow
  },
  loading: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default LoginScreen;
