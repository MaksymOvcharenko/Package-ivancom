import axios from "axios";

const API_URL = "https://api.novaposhta.ua/v2.0/json/";
const apiKey = "058ede2709b4821bc076351701926af7";
const phone = "380958010474";
export async function getStatusDocument(trackingNumber) {
  const requestData = {
    apiKey: apiKey,
    modelName: "TrackingDocumentGeneral",
    calledMethod: "getStatusDocuments",
    methodProperties: {
      Documents: [
        {
          DocumentNumber: trackingNumber,
          Phone: phone,
        },
      ],
    },
  };

  try {
    const response = await axios.post(API_URL, requestData);
    return response.data; // Возвращаем данные от API
  } catch (error) {
    console.error("Ошибка при запросе к Новой Почте:", error.message);
    return null; // Возвращаем null в случае ошибки
  }
}
