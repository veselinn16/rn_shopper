import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  StyleSheet
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
const FORM_UPDATE = "FORM_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }

  return state;
};

const AuthScreen = props => {
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const dispatch = useDispatch();

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Shop");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (input, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input
      });
    },
    [dispatchFormState]
  );

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
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
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
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </ScrollView>
          {isLoading ? (
            <View style={styles.spinnerContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <React.Fragment>
              <View style={styles.btnContainer}>
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              </View>
              <View style={styles.btnContainer}>
                <Button
                  title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                  color={Colors.secondary}
                  onPress={() => {
                    setIsSignup(prevState => !prevState);
                  }}
                />
              </View>
            </React.Fragment>
          )}
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
  spinnerContainer: {
    marginTop: 15,
    height: 100,
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
