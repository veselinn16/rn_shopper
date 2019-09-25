import { createStore } from "redux";
import rootReducer from "../store/reducers";
// import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(rootReducer);
