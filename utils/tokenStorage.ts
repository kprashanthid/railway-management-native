import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeTokens = async (
  accessToken: string,
  refreshToken: string
) => {
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

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@user_token");
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@user_token");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
