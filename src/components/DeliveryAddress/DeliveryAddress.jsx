// import styles from "./DeliveryAddress.module.css";
// import NovaPoshtaComponent from "../NovaPoshtaComponent/NovaPoshtaComponent.jsx";
// import NovaPoshtaAddressComponent from "../NovaPoshtaComponent/NovaPoshtaAddressComponent.jsx";
// import { useState } from "react";

// const DeliveryAddress = ({ onNext, onPrev }) => {
//   const [deliveryAddress, setDeliveryAddress] = useState("");

//   const sendData = () => {
//     onNext(deliveryAddress);
//     console.log(deliveryAddress);
//   };

//   return (
//     <>
//       <NovaPoshtaComponent setFieldValue={setDeliveryAddress} />
//       <NovaPoshtaAddressComponent setFieldValue={setDeliveryAddress} />

//       <button type="button" className={styles.button} onClick={onPrev}>
//         Назад
//       </button>
//       <button type="submit" className={styles.button} onClick={sendData}>
//         Далі
//       </button>
//     </>
//   );
// };

// export default DeliveryAddress;
// import styles from "./DeliveryAddress.module.css";
// import NovaPoshtaComponent from "../NovaPoshtaComponent/NovaPoshtaComponent.jsx";
// import NovaPoshtaAddressComponent from "../NovaPoshtaComponent/NovaPoshtaAddressComponent.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setDeliveryType,
//   setDeliveryAddress,
//   updateNPrice,
//   updateTotalSum,
// } from "../../redux/form/formSlice.js";
// import AllSumm from "../AllSumm/AllSumm.jsx";

// const DeliveryAddress = ({ onNext, onPrev }) => {
//   const dispatch = useDispatch();

//   // Отримуємо дані з Redux
//   const deliveryType = useSelector((state) => state.form.deliveryType);
//   const deliveryAddress = useSelector((state) => state.form.deliveryAddress);

//   const handleDeliveryTypeChange = (type) => {
//     console.log(type);

//     dispatch(setDeliveryType(type)); // Зберігаємо тип доставки в Redux
//     // dispatch(setDeliveryAddress("")); // Скидаємо адресу в Redux

//     if (type === "address") {
//       dispatch(updateNPrice(10)); // Додати 10 до НП-адреси
//       dispatch(updateTotalSum(10)); // Додати 10 до загальної суми
//     } else {
//       dispatch(updateNPrice(-10)); // Забрати 10, якщо повертаємося на "branch"
//       dispatch(updateTotalSum(-10)); // Забрати 10 із загальної суми
//     }
//   };

//   const sendData = () => {
//     onNext(deliveryAddress); // Передаємо адресу
//   };

//   return (
//     <div className={styles.container}>
//       {/* Перемикач для вибору типу доставки */}
//       <h2 className={styles.title}>Виберіть тип доставки:</h2>
//       <div className={styles.switch}>
//         <button
//           type="button"
//           className={`${styles.switchButton} ${
//             deliveryType === "branch" ? styles.active : ""
//           }`}
//           onClick={() => handleDeliveryTypeChange("branch")}
//         >
//           Відділення
//         </button>
//         <button
//           type="button"
//           className={`${styles.switchButton} ${
//             deliveryType === "address" ? styles.active : ""
//           }`}
//           onClick={() => handleDeliveryTypeChange("address")}
//         >
//           Адреса
//         </button>
//       </div>

//       {/* Рендеримо компонент залежно від вибору */}
//       {deliveryType === "branch" ? (
//         <NovaPoshtaComponent
//           setFieldValue={(value) => dispatch(setDeliveryAddress(value))}
//         />
//       ) : (
//         <NovaPoshtaAddressComponent
//           setFieldValue={(value) => dispatch(setDeliveryAddress(value))}
//         />
//       )}

//       {/* Кнопки для навігації */}
//       <div className={styles.buttons}>
//         <button type="button" className={styles.button} onClick={onPrev}>
//           Назад
//         </button>
//         <button type="submit" className={styles.button} onClick={sendData}>
//           Далі
//         </button>
//       </div>
//       <AllSumm/>
//     </div>
//   );
// };

// export default DeliveryAddress;
import styles from "./DeliveryAddress.module.css";
import NovaPoshtaComponent from "../NovaPoshtaComponent/NovaPoshtaComponent.jsx";
import NovaPoshtaAddressComponent from "../NovaPoshtaComponent/NovaPoshtaAddressComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeliveryType,
  setDeliveryAddress,
  updateNPrice,
  updateTotalSum,
} from "../../redux/form/formSlice.js";
// import AllSumm from "../AllSumm/AllSumm.jsx";
import { useEffect, useState } from "react";
import icons from "../../image/icons.svg";

const DeliveryAddress = ({ onNext, onPrev }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка до самого верху
  }, []); 
  const dispatch = useDispatch();

  // Отримуємо дані з Redux
  const deliveryType = useSelector((state) => state.form.deliveryType);
  const deliveryAddress = useSelector((state) => state.form.deliveryAddress);

  const [error, setError] = useState(""); // Стейт для збереження помилки

  const handleDeliveryTypeChange = (type) => {
    dispatch(setDeliveryType(type)); // Зберігаємо тип доставки в Redux
    setError(""); // Скидаємо помилку при зміні типу доставки

    if (type === "address") {
      dispatch(updateNPrice(10)); // Додати 10 до НП-адреси
      dispatch(updateTotalSum(10)); // Додати 10 до загальної суми
    } else {
      dispatch(updateNPrice(-10)); // Забрати 10, якщо повертаємося на "branch"
      dispatch(updateTotalSum(-10)); // Забрати 10 із загальної суми
    }
  };

  const sendData = () => {
    if (deliveryAddress.city === "") {
      setError("Вкажіть адресу або відділення для доставки");
      return; // Зупиняємо перехід на наступний етап
    }

    onNext(deliveryAddress); // Передаємо адресу
  };

  return (
    <div className={styles.container}>
      {/* Перемикач для вибору типу доставки */}
      <h2 className={styles.title}>Крок 4</h2>
      <div className={styles.divField}>
        <h2 className={styles.fieldTitle}>Виберіть тип доставки:</h2>
        <div className={styles.switch}>
          <button
            type="button"
            className={`${styles.switchButton} ${
              deliveryType === "branch" ? styles.active : ""
            }`}
            onClick={() => handleDeliveryTypeChange("branch")}
          ></button>
          <span className={styles.spanBtn}>Віділення</span>
          <button
            type="button"
            className={`${styles.switchButton} ${
              deliveryType === "address" ? styles.active : ""
            }`}
            onClick={() => handleDeliveryTypeChange("address")}
          ></button>
          <span className={styles.spanBtn}>Адреса</span>
        </div>

        {/* Рендеримо компонент залежно від вибору */}
        {deliveryType === "branch" ? (
          <NovaPoshtaComponent
            setFieldValue={(value) => dispatch(setDeliveryAddress(value))}
          />
        ) : (
          <NovaPoshtaAddressComponent
            setFieldValue={(value) => dispatch(setDeliveryAddress(value))}
          />
        )}

        {/* Виведення повідомлення про помилку */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Кнопки для навігації */}
      </div>
      <div className={styles.divButtons}>
        <button type="button" className={styles.buttonBack} onClick={onPrev}>
          Назад
        </button>
        <button type="submit" className={styles.buttonNext} onClick={sendData}>
          Далі
          <svg className={styles.btnSvg} width="23" height="12">
            <use
              className={styles.sparowIcon}
              href={`${icons}#icon-sparow`}
            ></use>
          </svg>
        </button>
      </div>
      {/* <AllSumm /> */}
    </div>
  );
};

export default DeliveryAddress;
