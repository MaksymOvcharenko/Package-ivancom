import axios from "axios";

export async function getPackageInfo(id) {
  try {
    const response = await axios.get(
      `https://ivancom-server.onrender.com/shipments/${id}`
    );
    return response.data; // Предполагается, что сервер возвращает объект с необходимыми данными
  } catch (error) {
    throw new Error("Не вдалося отримати інформацію про посилку");
  }
}
