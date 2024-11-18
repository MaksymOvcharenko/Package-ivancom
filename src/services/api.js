import axios from "axios";
export const testUrl =
  "https://script.google.com/macros/s/AKfycbzsDotOgEINR3bfwrvTnYJLy4enScbjPEJsopkVuPvI-ctMc0ztlondtsXSfgkznuVJ/exec";
// Функция для отправки данных
export const sendData = async (formData) => {
  try {
    const response = await axios.post(testUrl, formData);
    return response.data;
  } catch (error) {
    console.error("Error in sendData:", error.message);
    throw error;
  }
};
