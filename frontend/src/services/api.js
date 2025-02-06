import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const sendDataToBackend = async (data) => {
  console.log('Sending data to backend:', data);  // ดูข้อมูลที่กำลังจะส่ง
  try {
    const response = await axios.post(`${API_URL}/users`, data);
    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};
