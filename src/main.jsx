import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { persistor, store } from "./redux/form/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GtmInit } from "./components/GTMinit/GtmInit.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GtmInit />
      <App />
    </PersistGate>
  </Provider>
);
