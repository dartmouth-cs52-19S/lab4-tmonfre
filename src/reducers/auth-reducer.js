import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  userData: {},
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { ...state, authenticated: true, userData: JSON.parse(action.payload) };

    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false, userData: {} };

    case ActionTypes.AUTH_ERROR:
      console.log(action.payload);
      return {
        ...state, authenticated: false, userData: {},
      };

    default:
      return state;
  }
};

export default AuthReducer;
