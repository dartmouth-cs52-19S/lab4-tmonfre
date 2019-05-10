import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  email: null,
  errorMessage: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { ...state, authenticated: true, email: action.payload };

    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false, email: null };

    case ActionTypes.AUTH_ERROR:
      console.log(action.payload);
      return {
        ...state, authenticated: false, email: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
