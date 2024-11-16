// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import formReducer from "./formSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export const persistor = persistStore(store);
