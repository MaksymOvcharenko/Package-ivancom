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
import styles from "./DeliveryAddress.module.css";
import NovaPoshtaComponent from "../NovaPoshtaComponent/NovaPoshtaComponent.jsx";
import NovaPoshtaAddressComponent from "../NovaPoshtaComponent/NovaPoshtaAddressComponent.jsx";
import { useState } from "react";

const DeliveryAddress = ({ onNext, onPrev }) => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState("branch"); // "branch" або "address"

  const handleDeliveryTypeChange = (type) => {
    setDeliveryType(type);
    setDeliveryAddress(""); // Скидаємо адресу при зміні типу
  };

  const sendData = () => {
    onNext(deliveryAddress);
    console.log(deliveryAddress);
  };
  console.log(deliveryType);

  return (
    <div className={styles.container}>
      {/* Перемикач для вибору типу доставки */}
      <h2 className={styles.title}>Виберіть тип доставки:</h2>
      <div className={styles.switch}>
        <button
          type="button"
          className={`${styles.switchButton} ${
            deliveryType === "branch" ? styles.active : ""
          }`}
          onClick={() => handleDeliveryTypeChange("branch")}
        >
          Відділення
        </button>
        <button
          type="button"
          className={`${styles.switchButton} ${
            deliveryType === "address" ? styles.active : ""
          }`}
          onClick={() => handleDeliveryTypeChange("address")}
        >
          Адреса
        </button>
      </div>

      {/* Рендеримо компонент залежно від вибору */}
      {deliveryType === "branch" ? (
        <NovaPoshtaComponent setFieldValue={setDeliveryAddress} />
      ) : (
        <NovaPoshtaAddressComponent setFieldValue={setDeliveryAddress} />
      )}

      {/* Кнопки для навігації */}
      <div className={styles.buttons}>
        <button type="button" className={styles.button} onClick={onPrev}>
          Назад
        </button>
        <button type="submit" className={styles.button} onClick={sendData}>
          Далі
        </button>
      </div>
    </div>
  );
};

export default DeliveryAddress;
