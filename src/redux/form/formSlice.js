import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
const initialState = {
  sender: {},
  receiver: {},
  parcel: {
    size: null,
    valuation: "",
    cargoDescription: null,
    promocode: "",
  },
  senderAddress: {
    senderAddress: {
      senderAddress: {
        postamat: "",
      },
    },
  },
  senderAddressPostomat: {},
  deliveryAddress: {},
  deliveryType: "branch",
  step: 1,
  completed: false,
  value: {
    valuation: 0,
    npPrice: 0,
    priceCargo: null,
    allSumm: null,
    method: null,
  },
  isLoadingSendData: false,
  paymentLink: null,
  promoCheck: { status: "idle", available: null, userId: null, error: null },
};
export const validatePromoByPhone = createAsyncThunk(
  "form/validatePromoByPhone",
  async ({ phone, code }) => {
    const res = await fetch(
      "https://ivancom-server.onrender.com/api/promo/validate-by-phone",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      }
    );
    if (!res.ok) throw new Error("server_error");
    return await res.json(); // { userFound, userId, available, alreadyUsed }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setSenderReceiverData: (state, action) => {
      state.sender = action.payload.sender;
      state.receiver = action.payload.receiver;
    },
    setParcelData: (state, action) => {
      state.parcel = { ...state.parcel, ...action.payload };
    },
    setSenderAddress: (state, action) => {
      state.senderAddress = action.payload;
    },
    setSenderAddressPostomat: (state, action) => {
      state.senderAddressPostomat = action.payload;
    },
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },

    calculateValues: (state) => {
      const sizePriceMap = { A: 60, B: 80, C: 145 };
      const sizeMaxWeightMap = { A: 5, B: 12, C: 25 };
      const size = state.parcel.size;
      const promoCode = state.parcel.promocode;

      // Установка цены и максимального веса на основе размера
      state.parcel.maxWeight = sizeMaxWeightMap[size] || null;
      state.value.priceCargo = sizePriceMap[size] || null;

      // Расчёт стоимости страховки
      const valuation = state.parcel.valuation;
      if (promoCode === "GDANSK") {
        state.value.priceCargo = state.value.priceCargo * 0.8;
        if (valuation) {
          let total = 0;
          if (valuation <= 2000) {
            total = Math.round(valuation * 0.01);
          } else {
            const firstThousand = 2000 * 0.01;
            console.log(firstThousand);

            const remaining = (valuation - 2000) * 0.06;
            console.log(remaining);

            total = Math.round(firstThousand + remaining);
          }
          state.value.valuation = total;
        } else {
          state.value.valuation = null;
        }
      } else {
        if (valuation) {
          let total = 0;
          if (valuation <= 1000) {
            total = Math.round(valuation * 0.01);
          } else {
            const firstThousand = 1000 * 0.01;
            const remaining = (valuation - 1000) * 0.11;
            total = Math.round(firstThousand + remaining);
          }
          state.value.valuation = total;
        } else {
          state.value.valuation = null;
        }
      }

      // Убедимся, что доплата за курьера существует в state.value
      if (state.value.courierCharge === undefined) {
        state.value.courierCharge = 0; // Начальное значение доплаты за курьера
      }

      // Обновляем npPrice, если он еще не был задан
      if (state.value.npPrice === undefined) {
        state.value.npPrice = 0; // Начальное значение для npPrice, если оно не задано
      }

      // Итоговая сумма: стоимость страховки + цена за габариты + курьерская доплата + npPrice
      state.value.allSumm =
        (state.value.priceCargo || 0) +
        (state.value.valuation || 0) +
        state.value.courierCharge +
        state.value.npPrice;
    },

    applyPromoCode: (state, action) => {
      const { promoCode } = action.payload;
      const promoCodes = {
        PACZKOMAT25: { discount: 0.25, expirationDate: "2025-07-31" },
        VESNA10: { discount: 0.1, expirationDate: "2025-07-31" },
        SUSHI10: { discount: 0.1, expirationDate: "2025-07-31" },
        SURPRISE10: { discount: 0.1, expirationDate: "2025-07-31" },
        SURPRISE20: { discount: 0.2, expirationDate: "2025-07-31" },
        SURPRISE30: { discount: 0.3, expirationDate: "2025-07-31" },
        SURPRISE40: { discount: 0.4, expirationDate: "2025-07-31" },
        SURPRISE50: { discount: 0.5, expirationDate: "2025-07-31" },
        SURPRISE100: { discount: 1.0, expirationDate: "2025-07-31" },
        EURO10: { discount: 0.1, expirationDate: "2025-07-12" },
        LOYAL10: { discount: 0.1, expirationDate: "2025-12-12" },
        LOYAL20: { discount: 0.2, expirationDate: "2025-12-12" },
        POST25: { discount: 0.25, expirationDate: "2025-10-15" },
        MAT25: { discount: 0.25, expirationDate: "2025-12-31" },
        PACZKA25: { discount: 0.25, expirationDate: "2025-12-31" },
      };

      const currentDate = new Date();
      const promo = promoCodes[promoCode];

      if (promo && currentDate <= new Date(promo.expirationDate)) {
        if (!state.value.originalAllSumm) {
          state.value.originalAllSumm = state.value.allSumm;
        }
        if (state.value.allSumm) {
          state.value.allSumm = Math.round(
            state.value.allSumm * (1 - promo.discount)
          );
        }
      } else {
        state.value.allSumm =
          state.value.originalAllSumm || state.value.allSumm;
      }
    },
    addExtraCharge: (state, action) => {
      const extraCharge = action.payload; // Сума додаткової оплати
      state.value.allSumm = (state.value.allSumm || 0) + extraCharge;
    },
    setDeliveryType: (state, action) => {
      state.deliveryType = action.payload;
    },
    updateNPrice: (state, action) => {
      state.value.npPrice += action.payload; // Оновлюємо НП адресу
    },
    setMethodPay: (state, action) => {
      state.value.method = action.payload; // Оновлюємо метод оплати
    },
    updateCompleted: (state, action) => {
      state.completed = action.payload;
    },
    updateTotalSum: (state, action) => {
      state.value.allSumm += action.payload; // Оновлюємо загальну суму
    },
    setLoadingData: (state, action) => {
      state.isLoadingSendData = action.payload; // true или false
    },
    setPaymentLink: (state, action) => {
      console.log(action);

      state.paymentLink = action.payload; // true или false
    },
    resetForm: () => initialState,
    clearPromoCheck: (state) => {
      state.promoCheck = {
        status: "idle",
        available: null,
        userId: null,
        error: null,
        alreadyUsed: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validatePromoByPhone.pending, (state) => {
        state.promoCheck = {
          status: "loading",
          available: null,
          userId: null,
          error: null,
        };
      })
      .addCase(validatePromoByPhone.fulfilled, (state, action) => {
        const { available, userId, alreadyUsed } = action.payload || {};
        state.promoCheck = {
          status: "success",
          available: !!available,
          userId: userId ?? null,
          error: null,
          alreadyUsed: !!alreadyUsed, // 🆕 щоб ти міг показати "вже використовували"
        };

        if (available === false) {
          // відкочуємо суму, якщо код недоступний
          state.value.allSumm =
            state.value.originalAllSumm ?? state.value.allSumm;
        }
      })
      .addCase(validatePromoByPhone.rejected, (state) => {
        state.promoCheck = {
          status: "fail",
          available: null,
          userId: null,
          error: "network",
        };
        state.value.allSumm =
          state.value.originalAllSumm ?? state.value.allSumm;
      });
  },
});

export const {
  setSenderReceiverData,
  setParcelData,
  setSenderAddress,
  setSenderAddressPostomat,
  setDeliveryAddress,
  setStep,
  calculateValues,
  applyPromoCode,
  addExtraCharge,
  setDeliveryType,
  updateNPrice,
  updateTotalSum,
  updateCompleted,
  setLoadingData,
  resetForm,
  setPaymentLink,
  setMethodPay,
  clearPromoCheck,
} = formSlice.actions;

const persistConfig = {
  key: "form",
  storage,
};

export default persistReducer(persistConfig, formSlice.reducer);
