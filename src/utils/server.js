import axios from 'axios';

import { removeUserFromLocalStore } from './auth.js';

const API_URL = process.env.REACT_APP_API_URL;

export const addUserRecord = async (currentUser, recordId) => {
  try {
    const response = await axios.post(
      `${API_URL}/record/add/${recordId}`,
      {},
      { headers: getHeaders(currentUser) },
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

export const fetchUserRecords = async (currentUser, searchText) => {
  try {
    const response = await axios.get(
      `${API_URL}/record/user`,
      {
        headers: getHeaders(currentUser),
        params: { text: searchText },
      },
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const findRecord = async (currentUser, recordData) => {
  try {
    const response = await axios.get(
      `${API_URL}/record/find`,
      {
        headers: currentUser,
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

export const logout = async (currentUser) => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, { headers: getHeaders(currentUser)});
    removeUserFromLocalStore();
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const recordPost = async (currentUser, recordData) => {
  try {
    const response = await axios.post(
      `${API_URL}/record`,
      { ...recordData },
      { headers: getHeaders(currentUser) },
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

const getHeaders = (currentUser) => {
  if (currentUser && currentUser.access_token) {
    return { Authorization: `Bearer ${currentUser.access_token}`};
  } else {
    return {};
  }
};
