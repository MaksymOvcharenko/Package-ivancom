import { useSelector } from "react-redux";
import styles from "./Confirmation.module.css"; // Імпорт стилів з модуля CSS
import {
  selectSender,
  selectReceiver,
  selectParcel,
  selectSenderAddress,
  selectDeliveryAddress,
  selectState,
  selectValue,
} from "../../redux/form/formSelectors";
import { useEffect } from "react";




const Confirmation = ({ onPrev, onConfirm }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка до самого верху
  }, []); 
  const sender = useSelector(selectSender);
  const receiver = useSelector(selectReceiver);
  const parcel = useSelector(selectParcel);
  const senderAddress = useSelector(selectSenderAddress);
  const deliveryAddress = useSelector(selectDeliveryAddress);
  const state = useSelector(selectState);
  const value = useSelector(selectValue) || {};
 
 
  return (
    <div className={styles.confirmationContainer}>
      <h2 className={styles.title} >Підтвердження даних</h2>

      {/* Відправник */}
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.titleAdd}>Відправник</h3>
          <p>
            <span className={styles.titlespan}>Ім&apos;я:</span> {sender.firstName} {sender.lastName}
          </p>
          <p><span className={styles.titlespan}>Телефон:</span> {sender.phone}</p>
          <p><span className={styles.titlespan}>Email:</span> {sender.email}</p>
        </div>
  
        {/* Одержувач */}
        <div className={styles.section}>
          <h3 className={styles.titleAdd}>Одержувач</h3>
          <p>
            <span className={styles.titlespan}>Ім&apos;я:</span> {receiver.firstName} {receiver.lastName}
          </p>
          <p><span className={styles.titlespan}>Телефон:</span> {receiver.phone}</p>
          <p><span className={styles.titlespan}>Email:</span> {receiver.email}</p>
        </div>
  
        {/* Посилка */}
        <div className={styles.section}>
          <h3 className={styles.titleAdd}>Посилка</h3>
          <p><span className={styles.titlespan}>Оцінка:</span> {parcel.valuation} zl</p>
          <p><span className={styles.titlespan}>Розмір:</span> {parcel.size}</p>
          <p>
            <span className={styles.titlespan}>Опис:</span>{" "}
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
          <h3 className={styles.titleAdd}>Адреса відправника</h3>
          <p><span className={styles.titlespan}>Поштомат:</span> {senderAddress.senderAddress.senderAddress.postamat}</p>
        </div>
  
        {/* Адреса одержувача */}
        <div className={styles.section}>
          <h3 className={styles.titleAdd}>Адреса одержувача</h3>
          {deliveryAddress.warehouse && <p> {deliveryAddress.warehouse}</p>}
          {deliveryAddress.street && <p><span className={styles.titlespan}>Вулиця:</span> {deliveryAddress.street}</p>}
          {deliveryAddress.house && <p><span className={styles.titlespan}>Будинок:</span> {deliveryAddress.house}</p>}
          {deliveryAddress.apartment && (
            <p><span className={styles.titlespan}>Квартира:</span> {deliveryAddress.apartment}</p>
          )}
          {deliveryAddress.floor && <p><span className={styles.titlespan}>Поверх:</span> {deliveryAddress.floor}</p>}
          {deliveryAddress.city && <p><span className={styles.titlespan}>Місто:</span> {deliveryAddress.city}</p>}
        </div>
        <div className={styles.section}>
        <h3 className={styles.titleAdd}>Вартість</h3>
                <p>
                  <span className={styles.titlespan}>Ціна за посилку :</span>{" "}
                  {value.priceCargo ? `${value.priceCargo} PLN` : ""}
                </p>
                <p>
                  <span className={styles.titlespan}>Сума страхування :</span>{" "}
                  {value.valuation? `${value.valuation} PLN` : ""}
                </p>
                <p>
                  <span className={styles.titlespan}>Адресна доставка:</span>{" "}
                  {value.npPrice ? `${value.npPrice} PLN` : ""}
                </p>
                <p>
                  <span className={styles.titlespan}>Загальна сума:</span>{" "}
                  {value.allSumm ? `${value.allSumm.toFixed(2)} PLN` : ""}
                </p>
              </div>
        {/* Кнопки */}
        <div className={styles.buttons}>
        <button type="button" onClick={onPrev} className={styles.buttonBack}>
          Назад
        </button>
        <button type="button" onClick={() => 
          onConfirm(state)} className={styles.buttonNext}>
          Підтвердити
        </button>
      </div>
      </div>
      
    
      
    </div>
  );
};

export default Confirmation;
