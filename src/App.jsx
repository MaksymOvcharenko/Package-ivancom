import "./App.css";
// import GoogleSheetTable from "./components/GoogleSheetTable/GoogleSheetTable.jsx";
import MultiStepForm from "./components/MultiStepForm/MultiStepForm.jsx";
import ParcelData from "./components/ParcelData/ParcelData.jsx";
import DeliveryAddress from "./components/DeliveryAddress/DeliveryAddress.jsx";

function App() {
  return (
    <>
      <MultiStepForm />
      <ParcelData />
      <DeliveryAddress />
      {/* <GoogleSheetTable /> */}
    </>
  );
}

export default App;
