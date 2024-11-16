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
import {
  selectDeliveryAddress,
  selectParcel,
  selectReceiver,
  selectSender,
  selectSenderAddress,
  selectStep,
} from "../../redux/form/formSelectors.js";

const MultiStepForm = () => {
  const step = useSelector(selectStep);
  const sender = useSelector(selectSender);
  const receiver = useSelector(selectReceiver);
  const parcel = useSelector(selectParcel);
  const senderAddress = useSelector(selectSenderAddress);
  const deliveryAddress = useSelector(selectDeliveryAddress);

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

  return (
    <div className={styles.formContainer}>
      {step === 1 && <SenderReceiverData onNext={handleNext} />}
      {/* {step === 2 && <ParcelData onNext={handleNext} onPrev={handlePrev} />}
      {step === 3 && <SenderAddress onNext={handleNext} onPrev={handlePrev} />}
      {step === 4 && <DeliveryAddress onPrev={handlePrev} />} */}
    </div>
  );
};

export default MultiStepForm;
