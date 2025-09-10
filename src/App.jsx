import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Компоненты

import MultiStepForm from "./components/MultiStepForm/MultiStepForm.jsx";
import CompletedPayment from "./components/CompletedPayment/CompletedPayment.jsx";
import Tracking from "./components/Tracking/Tracking.jsx";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<MultiStepForm />} />

        {/* Страница с GoogleSheetTable */}
        <Route path="/confirmation" element={<CompletedPayment />} />
        <Route path="/tracking" element={<Tracking />} />
        {/* Страница 404: "Не найдено" */}
        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
