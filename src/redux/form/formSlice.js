// // formSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";

// const formSlice = createSlice({
//   name: "form",
//   initialState: {
//     sender: {},
//     receiver: {},
//     parcel: {},
//     senderAddress: {},
//     deliveryAddress: {},
//     step: 1,
//     value: {
//       valutation : null,
//       npadress: null,
//       priceCargo: null,
//       allSumm: null,
//     }

//   },
//   reducers: {
//     setSenderReceiverData: (state, action) => {
//       state.sender = action.payload.sender;
//       state.receiver = action.payload.receiver;
//     },
//     setParcelData: (state, action) => {
//       state.parcel = action.payload;
//     },
//     setSenderAddress: (state, action) => {
//       state.senderAddress = action.payload;
//     },
//     setDeliveryAddress: (state, action) => {
//       state.deliveryAddress = action.payload;
//     },
//     setStep: (state, action) => {
//       state.step = action.payload;
//     },
//   },
// });

// export const {
//   setSenderReceiverData,
//   setParcelData,
//   setSenderAddress,
//   setDeliveryAddress,
//   setStep,
// } = formSlice.actions;

// const persistConfig = {
//   key: "form",
//   storage,
// };

// export default persistReducer(persistConfig, formSlice.reducer);
import { createSlice } from "@reduxjs/toolkit";
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
  },
  isLoadingSendData: false,
  paymentLink: null,
};
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
      const sizePriceMap = { A: 50, B: 80, C: 100 };
      const sizeMaxWeightMap = { A: 5, B: 12, C: 25 };
      const size = state.parcel.size;
      state.parcel.maxWeight = sizeMaxWeightMap[size] || null;
      state.value.priceCargo = sizePriceMap[size] || null;

      const valuation = state.parcel.valuation;
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
        state.value.allSumm = total + state.value.priceCargo;
      } else {
        state.value.allSumm = null;
      }
    },
    applyPromoCode: (state, action) => {
      const { promoCode } = action.payload;
      const validPromoCode = "PACZKOMAT25"; // Валидация промокода
      const expirationDate = "2025-06-31"; // Дата окончания промокода

      const currentDate = new Date();

      // Проверяем, совпадает ли введённый промокод и не истёк ли он
      if (
        promoCode === validPromoCode &&
        currentDate <= new Date(expirationDate)
      ) {
        // Сохраняем оригинальную цену, если ещё не сохранили
        if (!state.value.originalAllSumm) {
          state.value.originalAllSumm = state.value.allSumm;
        }
        // Уменьшаем цену на 25%
        if (state.value.allSumm) {
          state.value.allSumm = Math.round(state.value.allSumm * 0.75);
        }
      } else {
        // Если промокод неверный или истёк, сбрасываем цену до исходной
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
} = formSlice.actions;

const persistConfig = {
  key: "form",
  storage,
};

export default persistReducer(persistConfig, formSlice.reducer);
