import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
  errorMessage: '',
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload };

    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload };

    case ActionTypes.API_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};

export default PostReducer;
