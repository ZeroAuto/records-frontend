import axios from 'axios';

export const fetchRecords = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/record');
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/login', {
      username,
      password,
    });
    console.table(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};
