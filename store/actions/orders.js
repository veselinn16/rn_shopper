export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

import Order from "../../models/order";

export const fetchOrders = () => async (dispatch, getState) => {
  try {
    const userId = getState().auth.userId;

    const res = await fetch(
      `https://rn-shopper.firebaseio.com/orders/${userId}.json`
    );

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    // returns ID created by Firebase
    const resData = await res.json();
    const ordersArr = [];

    for (const key in resData) {
      ordersArr.push(
        new Order(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date)
        )
      );
    }

    dispatch({
      type: SET_ORDERS,
      payload: ordersArr
    });
  } catch (err) {
    throw err;
  }
};

export const addOrder = (cartItems, totalAmount) => async (
  dispatch,
  getState
) => {
  try {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const date = new Date();

    const res = await fetch(
      `https://rn-shopper.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date
        })
      }
    );

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    // returns ID created by Firebase
    const resData = await res.json();

    dispatch({
      type: ADD_ORDER,
      payload: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date
      }
    });
  } catch (err) {
    console.log(err);
  }
};
