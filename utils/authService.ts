import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const storeTokens = async (accessToken: string, refreshToken: string) => {
  try {
    await AsyncStorage.setItem("@access_token", accessToken);
    await AsyncStorage.setItem("@refresh_token", refreshToken);
  } catch (error) {
    console.error("Error storing tokens:", error);
  }
};

const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@access_token");
    return token;
  } catch (error) {
    console.error("Error retrieving access token:", error);
  }
};

const refreshToken = async () => {
  const refresh = await AsyncStorage.getItem("@refresh_token");

  try {
    const response = await axios.post(
      "http://192.168.112.185:8000/api/token/refresh/",
      { refresh }
    );
    await storeTokens(response.data.access, response.data.refresh);
    console.log("Tokens refreshed");
    return response.data.access;
  } catch (error: any) {
    console.error("Error refreshing token:", error.response || error.message);
  }
};

export const getUserRole = async () => {
  const token = await getAccessToken();
  const response = await axios.get("http://192.168.112.185:8000/api/token/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.role;
};

export { storeTokens, getAccessToken, refreshToken };
