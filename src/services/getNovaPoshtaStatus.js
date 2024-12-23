import axios from "axios";

const API_URL = "https://api.novaposhta.ua/v2.0/json/";
const apiKey = "a13a950b799ed7cbe09727463f044465";
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
