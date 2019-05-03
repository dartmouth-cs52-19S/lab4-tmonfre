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
    axios.post(`${ROOT_URL}/posts/${API_KEY}`, post)
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
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, post).then((response) => {
      dispatch({ type: 'FETCH_POST', payload: response.data.result });
    }).catch((error) => {
      dispatch({ type: 'API_ERROR', payload: error.message });
    });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      history.push('/');
    }).catch((error) => {
      dispatch({ type: 'API_ERROR', payload: error.message });
    });
  };
}
