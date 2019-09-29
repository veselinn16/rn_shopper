import React from "react";
import {
  ScrollView,
  View,
  Button,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

const AuthScreen = props => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              inputType="E-mail"
              keyboardType="email-address"
              required
              autoCapitalize="none"
              errorMessage="Please enter a valid email address."
              onValueChange={() => {}}
              initialValue=""
            />
            <Input
              id="password"
              inputType="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid password."
              onValueChange={() => {}}
              initialValue=""
            />
          </ScrollView>
          <View style={styles.btnContainer}>
            <Button title="Login" color={Colors.primary} onPress={() => {}} />
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="Switch to Sign Up"
              color={Colors.secondary}
              onPress={() => {}}
            />
          </View>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Sign In"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    marginTop: 10
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 500,
    padding: 20
  }
});

export default AuthScreen;
