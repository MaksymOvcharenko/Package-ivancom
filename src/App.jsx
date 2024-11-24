import "./App.css";
// import GoogleSheetTable from "./components/GoogleSheetTable/GoogleSheetTable.jsx";
import MultiStepForm from "./components/MultiStepForm/MultiStepForm.jsx";
import ParcelData from "./components/ParcelData/ParcelData.jsx";

function App() {
  return (
    <>
      <MultiStepForm />
      <ParcelData />
      {/* <GoogleSheetTable /> */}
    </>
  );
}

export default App;
