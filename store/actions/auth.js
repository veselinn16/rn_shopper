import { API_KEY } from "../../constants/auth";
import { AsyncStorage } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOG_OUT = "LOG_OUT";
let timer;

export const authenticate = (userId, token, expirationTime) => {
  return dispatch => {
    dispatch(setLogOutTimer(expirationTime));
    dispatch({
      type: AUTHENTICATE,
      payload: {
        token,
        userId
      }
    });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!res.ok) {
      const errResponseData = await res.json();
      const errId = errResponseData.error.message;
      let message = "Something went wrong!";

      if (errId === "EMAIL_EXISTS") {
        message = "This email already exists!";
      }

      throw new Error(message);
    }

    const resData = await res.json();

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );

    // store token and id to phone memory
    const expirationTime = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    ).toISOString();
    saveDataToStorage(resData.idToken, resData.localId, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationTime) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expirationTime
    })
  );
};

export const login = (email, password) => {
  return async dispatch => {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!res.ok) {
      const errResponseData = await res.json();
      const errId = errResponseData.error.message;
      let message = "Something went wrong!";

      if (errId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }

      throw new Error(message);
    }

    const resData = await res.json();

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );

    // store token and id to phone memory
    const expiryTime = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    ).toISOString();
    saveDataToStorage(resData.idToken, resData.localId, expiryTime);
  };
};

export const logout = () => {
  clearLogOutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOG_OUT };
};

const clearLogOutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogOutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
