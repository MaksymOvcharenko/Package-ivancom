import { useSelector } from "react-redux";
import styles from "./Confirmation.module.css"; // Імпорт стилів з модуля CSS
import {
  selectSender,
  selectReceiver,
  selectParcel,
  selectSenderAddress,
  selectDeliveryAddress,
  selectState,
} from "../../redux/form/formSelectors";

const Confirmation = ({ onPrev, onConfirm }) => {
  const sender = useSelector(selectSender);
  const receiver = useSelector(selectReceiver);
  const parcel = useSelector(selectParcel);
  const senderAddress = useSelector(selectSenderAddress);
  const deliveryAddress = useSelector(selectDeliveryAddress);
  const state = useSelector(selectState);

  return (
    <div className={styles.confirmationContainer}>
      <h2>Підтвердження даних</h2>

      {/* Відправник */}
      <div className={styles.section}>
        <h3>Відправник</h3>
        <p>
          Ім&apos;я: {sender.firstName} {sender.lastName}
        </p>
        <p>Телефон: {sender.phone}</p>
        <p>Електронна пошта: {sender.email}</p>
      </div>

      {/* Одержувач */}
      <div className={styles.section}>
        <h3>Одержувач</h3>
        <p>
          Ім&apos;я: {receiver.firstName} {receiver.lastName}
        </p>
        <p>Телефон: {receiver.phone}</p>
        <p>Електронна пошта: {receiver.email}</p>
      </div>

      {/* Посилка */}
      <div className={styles.section}>
        <h3>Посилка</h3>
        <p>Оцінка: {parcel.valuation} zl</p>
        <p>Розмір: {parcel.size}</p>
        <p>
          Опис:{" "}
          {parcel.cargoDescription?.length > 0
            ? parcel.cargoDescription.map((item, index) => (
                <span key={index}>
                  {item.Description} ({item.DescriptionRu})
                  {index < parcel.cargoDescription.length - 1 ? ", " : ""}
                </span>
              ))
            : "Опис відсутній"}
        </p>
      </div>

      {/* Адреса відправника */}
      <div className={styles.section}>
        <h3>Адреса відправника</h3>
        <p>Поштомат: {senderAddress.senderAddress.senderAddress.postamat}</p>
      </div>

      {/* Адреса одержувача */}
      <div className={styles.section}>
        <h3>Адреса одержувача</h3>
        {deliveryAddress.warehouse && <p> {deliveryAddress.warehouse}</p>}
        {deliveryAddress.street && <p>Вулиця: {deliveryAddress.street}</p>}
        {deliveryAddress.house && <p>Будинок: {deliveryAddress.house}</p>}
        {deliveryAddress.apartment && (
          <p>Квартира: {deliveryAddress.apartment}</p>
        )}
        {deliveryAddress.floor && <p>Поверх: {deliveryAddress.floor}</p>}
        {deliveryAddress.city && <p>Місто: {deliveryAddress.city}</p>}
      </div>
      {/* Кнопки */}
      <div className={styles.buttons}>
        <button type="button" onClick={onPrev}>
          Назад
        </button>
        <button type="button" onClick={() => onConfirm(state)}>
          Підтвердити
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
