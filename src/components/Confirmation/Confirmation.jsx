// Confirmation.jsx
import React from "react";
import { useSelector } from "react-redux";
import styles from "./Confirmation.module.css"; // Імпорт стилів з модуля CSS
import {
  selectSender,
  selectReceiver,
  selectParcel,
  selectSenderAddress,
  selectDeliveryAddress,
} from "../../redux/form/formSelectors";

const Confirmation = ({ onPrev, onConfirm }) => {
  const sender = useSelector(selectSender);
  const receiver = useSelector(selectReceiver);
  const parcel = useSelector(selectParcel);
  const senderAddress = useSelector(selectSenderAddress);
  const deliveryAddress = useSelector(selectDeliveryAddress);

  return (
    <div className={styles.confirmationContainer}>
      <h2>Підтвердження даних</h2>
      <div className={styles.section}>
        <h3>Відправник</h3>
        <p>Ім'я: {sender.name}</p>
        <p>Телефон: {sender.phone}</p>
        <p>Електронна пошта: {sender.email}</p>
      </div>
      <div className={styles.section}>
        <h3>Одержувач</h3>
        <p>Ім'я: {receiver.name}</p>
        <p>Телефон: {receiver.phone}</p>
        <p>Електронна пошта: {receiver.email}</p>
      </div>
      <div className={styles.section}>
        <h3>Посилка</h3>
        <p>Тип: {parcel.type}</p>
        <p>Вага: {parcel.weight} кг</p>
        <p>Опис: {parcel.description}</p>
      </div>
      <div className={styles.section}>
        <h3>Адреса відправника</h3>
        <p>Вулиця: {senderAddress.street}</p>
        <p>Місто: {senderAddress.city}</p>
        <p>Код: {senderAddress.postalCode}</p>
      </div>
      <div className={styles.section}>
        <h3>Адреса одержувача</h3>
        <p>Вулиця: {deliveryAddress.street}</p>
        <p>Місто: {deliveryAddress.city}</p>
        <p>Код: {deliveryAddress.postalCode}</p>
      </div>
      <div className={styles.buttons}>
        <button type="button" onClick={onPrev}>
          Назад
        </button>
        <button type="button" onClick={onConfirm}>
          Підтвердити
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
