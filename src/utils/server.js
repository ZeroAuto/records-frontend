import axios from 'axios';

import { removeUserFromLocalStore } from './auth.js';

const API_URL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return new Promise((resolve) => {
      const originalRequest = error.config
      const refreshToken = JSON.parse(sessionStorage.getItem('user')).refresh_token;
      if (
        error.response &&
        error.response.status == 401 &&
        error.config && !error.config.__isRetryRequest &&
        refreshToken
      ) {
        originalRequest._retry = true;

        const response = fetch(`${API_URL}/refresh`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${refreshToken}`,
          },
        })
        .then((res) => res.json())
        .then((res) => {
          sessionStorage.setItem('user', res.data);
          return axios(originalRequest);
        });
        resolve(response);
      }

      return Promise.reject(error);
    });
  }
);

export const addUserRecord = async (recordId) => {
  try {
    const response = await axios.post(
      `${API_URL}/record/add/${recordId}`,
      {},
      { headers: getHeaders() },
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const fetchRecords = async (searchText = '') => {
  try {
    const response = await axios.get(
      `${API_URL}/record`,
      { params: { text: searchText } },
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const fetchUserRecords = async (searchText) => {
  try {
    const response = await axios.get(
      `${API_URL}/record/user`,
      {
        headers: getHeaders(),
        params: { text: searchText },
      },
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const findRecord = async (recordData) => {
  try {
    const response = await axios.get(
      `${API_URL}/record/find`,
      {
        headers: getHeaders(),
        params: { ...recordData },
      },
    )
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, { headers: getHeaders()});
    removeUserFromLocalStore();
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const recordPost = async (recordData) => {
  try {
    const response = await axios.post(
      `${API_URL}/record`,
      { ...recordData },
      { headers: getHeaders() },
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const signUp = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const getHeaders = () => {
  const currentUser = JSON.parse(sessionStorage.getItem('user'));
  if (currentUser && currentUser.access_token) {
    return { Authorization: `Bearer ${currentUser.access_token}`};
  } else {
    return {};
  }
};
