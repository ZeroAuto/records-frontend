import axios from 'axios';

export const fetchRecords = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/record');
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}
