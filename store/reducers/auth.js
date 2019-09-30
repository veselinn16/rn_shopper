import { AUTHENTICATE, LOG_OUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.payload.token,
        userId: action.payload.userId
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
