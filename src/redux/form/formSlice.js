// formSlice.js
import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const formSlice = createSlice({
  name: "form",
  initialState: {
    sender: {},
    receiver: {},
    parcel: {},
    senderAddress: {},
    deliveryAddress: {},
    step: 1,
  },
  reducers: {
    setSenderReceiverData: (state, action) => {
      state.sender = action.payload.sender;
      state.receiver = action.payload.receiver;
    },
    setParcelData: (state, action) => {
      state.parcel = action.payload;
    },
    setSenderAddress: (state, action) => {
      state.senderAddress = action.payload;
    },
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const {
  setSenderReceiverData,
  setParcelData,
  setSenderAddress,
  setDeliveryAddress,
  setStep,
} = formSlice.actions;

const persistConfig = {
  key: "form",
  storage,
};

export default persistReducer(persistConfig, formSlice.reducer);
