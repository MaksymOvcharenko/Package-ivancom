
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Компоненты

import MultiStepForm from "./components/MultiStepForm/MultiStepForm.jsx";
import CompletedPayment from "./components/CompletedPayment/CompletedPayment.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<MultiStepForm />} />

        {/* Страница с GoogleSheetTable */}
        <Route path="/confirmation" element={<CompletedPayment/>} />

        {/* Страница 404: "Не найдено" */}
        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
    </Router>
  );
}

export default App;
