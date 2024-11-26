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
import { selectCompleted, selectStep } from "../../redux/form/formSelectors.js";
import Confirmation from "../Confirmation/Confirmation.jsx";
import {  updateCompleted } from "../../redux/form/formSlice.js";
import Completed from "../Completed/Completed.jsx";
import { useEffect } from "react";

const MultiStepForm = () => {
  const step = useSelector(selectStep);
  const completed = useSelector(selectCompleted);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка до самого верху
  }, []); 
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
    // writeToGoogleSheet(data);
    console.log(data);
    // URL вашего Google Apps Script (замените на свой URL)
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbxy49UctxqgYor7S2MfaFiJcBUKgd3VlrbAIxsJ8h6pVzQaem6OpOhTSlSJqYBSnJ8HGw/exec";

    // Данные, которые вы хотите отправить
    const dataS = {
      senderFirstName: data.sender.firstName,
      senderLastName: data.sender.lastName,
      senderPhone: data.sender.phone,
      senderEmail: data.sender.email,
      receiverFirstName: data.receiver.firstName,
      receiverLastName: data.receiver.lastName,
      receiverPhone: data.receiver.phone,
      receiverEmail: data.receiver.email,
      parcelValuation: data.parcel.valuation,
      parcelSize: data.parcel.size,
      // Слияние всех описаний из cargoDescription в одну строку
      cargoDescription: data.parcel.cargoDescription
        .map((item) => item.Description)
        .join(", "),
      senderAddress: data.senderAddress.senderAddress.senderAddress.postamat,
      senderAddressCity: data.senderAddressPostomat.city,//new
      senderAddressStreet: data.senderAddressPostomat.street,//new
      allSumm:data.value.allSumm,//new
      cargoSumm:data.value.priceCargo,//new
      npSumm:data.value.npPrice,//new
      valuaitonSumm:data.value.valuation,//new
      deliveryCity: data.deliveryAddress.city,
      deliveryWarehouse: data.deliveryAddress.warehouse,
      deliveryStreet: data.deliveryAddress.street,
      deliveryHouse: data.deliveryAddress.house,
      deliveryApartment: data.deliveryAddress.apartment,
      deliveryFloor: data.deliveryAddress.floor,
    };

    async function sendDataToGoogleSheet() {
      try {
        console.log(dataS);
        
        const response = await fetch(scriptUrl, {
          method: "POST", // Метод POST
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Вірний Content-Type
          },
          body: new URLSearchParams(dataS), // Перетворюємо об'єкт у строку параметрів запиту
        });

        const result = await response.json(); // Відповідь від Google Apps Script
        console.log(result);

        if (result.result === "ZBS") {
          console.log(`Дані успішно записані в строку ${result.row}`);
        } else {
          console.error("Сталася помилка: ", result.error);
        }
      } catch (error) {
        console.error("Помилка при відправці даних: ", error);
      }
    }

    // Виклик функції для відправки даних
    sendDataToGoogleSheet();
    // dispatch(resetForm());
    dispatch(updateCompleted(true));
    
  };

  return (
    <>{completed?(<Completed/>):(<div className={styles.formContainer}>
      {step === 2 && <ParcelData onNext={handleNext} onPrev={handlePrev} />}
      {step === 1 && <SenderReceiverData onNext={handleNext} />}
      
      {step === 3 && <SenderAddress onNext={handleNext} onPrev={handlePrev} />}
      {step === 4 && (
        <DeliveryAddress onNext={handleLast} onPrev={handlePrev} />
      )}
      {step === 5 && (
        <Confirmation onPrev={handlePrev} onConfirm={handleConfirm} />
      )}
       {/* <Confirmation/> */}
    </div>) }</>
  );
};

export default MultiStepForm;
