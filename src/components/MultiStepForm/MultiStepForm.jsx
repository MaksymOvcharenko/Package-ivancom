// MultiStepForm.jsx
import { useSelector, useDispatch } from "react-redux";

import styles from "./MultiStepForm.module.css";
import SenderReceiverData from "../SenderReceiverData/SenderReceiverData.jsx";
import ParcelData from "../ParcelData/ParcelData.jsx";
import SenderAddress from "../SenderAddress/SenderAddress.jsx";
import DeliveryAddress from "../DeliveryAddress/DeliveryAddress.jsx";
import {
  goBack,
  saveDeliveryAddress,
  saveParcelData,
  saveSenderAddress,
  saveSenderReceiverData,
} from "../../redux/form/formOperations.js";
import { selectStep } from "../../redux/form/formSelectors.js";
import Confirmation from "../Confirmation/Confirmation.jsx";
import { sendData } from "../../services/api.js";

const MultiStepForm = () => {
  const step = useSelector(selectStep);

  const dispatch = useDispatch();

  const handleNext = (data) => {
    switch (step) {
      case 1:
        dispatch(saveSenderReceiverData(data));
        break;
      case 2:
        dispatch(saveParcelData(data));
        break;
      case 3:
        dispatch(saveSenderAddress(data));
        break;
      case 4:
        dispatch(saveDeliveryAddress(data));
        break;

      default:
        break;
    }
  };

  const handlePrev = () => {
    dispatch(goBack());
  };
  const handleLast = (data) => {
    dispatch(saveDeliveryAddress(data));
  };

  const handleConfirm = (data) => {
    // Тут можна додати код для підтвердження та збереження всіх даних, наприклад:
    // dispatch(saveAllData());
    sendData(data);
    console.log(data);

    alert("Дані підтверджено!");
  };

  return (
    <div className={styles.formContainer}>
      {step === 1 && <SenderReceiverData onNext={handleNext} />}
      {step === 2 && <ParcelData onNext={handleNext} onPrev={handlePrev} />}
      {step === 3 && <SenderAddress onNext={handleNext} onPrev={handlePrev} />}
      {step === 4 && (
        <DeliveryAddress onNext={handleLast} onPrev={handlePrev} />
      )}
      {step === 5 && (
        <Confirmation onPrev={handlePrev} onConfirm={handleConfirm} />
      )}
    </div>
  );
};

export default MultiStepForm;
