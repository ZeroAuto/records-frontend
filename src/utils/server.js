import axios from 'axios';

import { removeUserFromLocalStore } from './auth.js';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}/record`);
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

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
