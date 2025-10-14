const BASE_URL = "https://api.novaposhta.ua/v2.0/json/";

async function fetchWithErrorHandling(url = "", config = {}) {
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при выполнении запроса", error);
    throw error;
  }
}

export function fetchTtnStatus(ttnQuery) {
  const searchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey: "058ede2709b4821bc076351701926af7",
      modelName: "TrackingDocument",
      calledMethod: "getStatusDocuments",
      methodProperties: {
        Documents: [
          {
            DocumentNumber: ttnQuery,
          },
        ],
      },
    }),
  };

  return fetchWithErrorHandling(BASE_URL, searchConfig);
}

export function fetchBranchesList(
  cityName,
  warehouseId = "",
  page = 1,
  cityRef
) {
  const searchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey: "058ede2709b4821bc076351701926af7",
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        // CityName: cityName,
        CityRef: cityRef,
        Page: page,
        Limit: "10000",
        WarehouseId: warehouseId,
      },
    }),
  };

  return fetchWithErrorHandling(BASE_URL, searchConfig);
}

export function fetchCitiesList(cityName) {
  const searchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey: "058ede2709b4821bc076351701926af7",
      modelName: "AddressGeneral",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: cityName,
        Limit: "20",
        Page: "1",
      },
    }),
  };

  return fetchWithErrorHandling(BASE_URL, searchConfig);
}
export function fetchCargoTypes() {
  const searchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey: "058ede2709b4821bc076351701926af7",
      modelName: "CommonGeneral",
      calledMethod: "getCargoTypes",
      methodProperties: {},
    }),
  };

  return fetchWithErrorHandling(BASE_URL, searchConfig);
}
export function fetchCargoDescriptionList(query, page = 1) {
  const searchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey: "058ede2709b4821bc076351701926af7",
      modelName: "CommonGeneral",
      calledMethod: "getCargoDescriptionList",
      methodProperties: {
        FindByString: query,
        Page: page,
      },
    }),
  };

  return fetchWithErrorHandling(BASE_URL, searchConfig);
}
// src/nova-poshta-api.js

export function fetchStreetsList(streetName, settlementRef) {
  const searchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey: "058ede2709b4821bc076351701926af7",
      modelName: "AddressGeneral",
      calledMethod: "searchSettlementStreets",
      methodProperties: {
        StreetName: streetName,
        SettlementRef: settlementRef,
        Limit: "50",
      },
    }),
  };

  return fetchWithErrorHandling(BASE_URL, searchConfig);
}
