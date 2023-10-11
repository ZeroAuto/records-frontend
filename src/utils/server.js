import axios from 'axios';

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
    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    if (response.status === '200') {
      localStorage.removeItem('user');
    }
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

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
