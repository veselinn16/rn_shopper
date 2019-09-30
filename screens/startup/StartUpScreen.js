import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

const StartUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogIn = async () => {
      const data = await AsyncStorage.getItem("userData");
      if (!data) {
        navigation.navigate("AuthScreen");
        return;
      }

      const userData = JSON.parse(data);
      const { token, userId, expirationTime } = userData;
      const expirationDate = new Date(expirationTime);

      if (expirationDate <= new Date() || !token || !userId) {
        navigation.navigate("AuthScreen");
        return;
      }

      const expiryTime = expirationDate.getTime() - new Date().getTime();

      navigation.navigate("Shop");
      dispatch(authActions.authenticate(userId, token, expiryTime));
    };
    tryLogIn();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StartUpScreen;
