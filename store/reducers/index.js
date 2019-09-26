import { combineReducers } from "redux";
import productsReducer from "./products";
import cartReducer from "./cart";
import ordersReducer from "./orders";

export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});
