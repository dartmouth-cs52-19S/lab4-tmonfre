import axios from 'axios';

// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://cs52-tmonfre-lab5.herokuapp.com/api';
const API_KEY = '?key=tmonfre';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  API_ERROR: 'API_ERROR',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  CLEAR_ERROR_MESSAGE: 'CLEAR_ERROR_MESSAGE',
};

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      dispatch({ type: 'FETCH_POSTS', payload: response.data });
    }).catch((error) => {
      dispatch({ type: 'API_ERROR', payload: error.message });
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      dispatch({ type: 'FETCH_POST', payload: response.data });
    }).catch((error) => {
      dispatch({ type: 'API_ERROR', payload: error.message });
    });
  };
}

export function createPost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts/${API_KEY}`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: 'API_ERROR', payload: error.message });
      });
  };
}

export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: 'FETCH_POST', payload: response.data.result });
      }).catch((error) => {
        dispatch({ type: 'API_ERROR', payload: error.message });
      });
  };
}

export function addComment(id, comment) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/addcomment/${id}${API_KEY}`, { comment }, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: 'FETCH_POST', payload: response.data.result });
    }).catch((error) => {
      dispatch({ type: 'API_ERROR', payload: error.message });
    });
  };
}

export function deleteComment(id, comment) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/deletecomment/${id}${API_KEY}`, comment, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: 'FETCH_POST', payload: response.data.result });
    }).catch((error) => {
      dispatch({ type: 'API_ERROR', payload: error.message });
    });
  };
}


export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      }).catch((error) => {
        dispatch({ type: 'API_ERROR', payload: error.message });
      });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

export function signinUser(user, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));

  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, user, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: JSON.stringify(response.data.userData) });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userData));
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: 'API_ERROR', payload: `Sign in failed: ${error.response ? error.response.data : error.message}` });
        history.push('/');
      });
  };
}

export function signupUser(user, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));

  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, user)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: JSON.stringify(response.data.userData) });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userData));
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: 'API_ERROR', payload: `Sign up failed: ${error.response ? error.response.data : error.message}` });
        history.push('/');
      });
  };
}

export function clearErrorMessage() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_ERROR_MESSAGE });
  };
}
