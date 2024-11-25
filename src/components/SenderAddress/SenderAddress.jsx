// import { useForm } from "react-hook-form";
// import styles from "./SenderAddress.module.css";

// const SenderAddress = ({ onNext, onPrev }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     onNext({ senderAddress: data });
//   };

//   return (
//     <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//       <div className={styles.field}>
//         <label>Поштомат InPost</label>
//         <input
//           {...register("senderAddress.postamat", {
//             required: "Обов'язкове поле",
//           })}
//         />
//         {errors.senderAddress?.postamat && (
//           <span className={styles.error}>
//             {errors.senderAddress.postamat.message}
//           </span>
//         )}
//       </div>

//       <div className={styles.field}>
//         <label>Інша адреса</label>
//         <input type="checkbox" {...register("senderAddress.otherAddress")} />
//       </div>

//       <button type="button" className={styles.button} onClick={onPrev}>
//         Назад
//       </button>
//       <button type="submit" className={styles.button}>
//         Далі
//       </button>
//     </form>
//   );
// };

// export default SenderAddress;
import { useForm } from "react-hook-form";
import { InpostGeowidget } from "react-inpost-geowidget";
import { useState } from "react";
import styles from "./SenderAddress.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSenderAddress } from "../../redux/form/formSelectors.js";
import { setSenderAddressPostomat } from "../../redux/form/formSlice.js";
import icons from "../../image/icons.svg";

const SenderAddress = ({ onNext, onPrev }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue, // Для встановлення значень у форму
    formState: { errors },
  } = useForm();
    const postamat = useSelector(selectSenderAddress)?.senderAddress?.senderAddress?.postamat || null
  console.log(postamat);
  
  
  const [selectedPoint, setSelectedPoint] = useState(postamat);
  console.log(selectedPoint + "selectedpostomat");
  
  const onPointCallback = (point) => {
    console.log("Вибраний поштомат:", point);
    dispatch(setSenderAddressPostomat({city: point.address.line2,street: point.address.line1,}));
    setSelectedPoint(point.name); // Зберігаємо вибраний поштомат у стані
    setValue("senderAddress.postamat", point.name); // Задаємо значення у форму
  };

  const onSubmit = (data) => {
    
    onNext({ senderAddress: data });
  };
  const inpostToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwNDczMDEwODAsImlhdCI6MTczMTk0MTA4MCwianRpIjoiZGM4OWJkMzktMjlmZS00YmI2LWIwNjUtYjgzMDg0YWU5YzAzIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpnV05US05EV1pqRDBUZGxCNUNDS2NDeGVOSmRPRmFTRmhkSUM5ZG8zTHBJIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiMmI5OTRmYmItZDhiNy00Nzk5LTgyM2QtMmNmOTU4NWM3NjgzIiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjJiOTk0ZmJiLWQ4YjctNDc5OS04MjNkLTJjZjk1ODVjNzY4MyIsImFsbG93ZWRfcmVmZXJyZXJzIjoicGFja2FnZS1pdmFuY29tLnZlcmNlbC5hcHAiLCJ1dWlkIjoiMjYyMzAwODktZjJmNC00MjFlLWE2MDctNGJhZDJjNDk3NmIyIn0.P6UXMhjqE1qoJsWYVVWR8YZYj6SB9JHuswh660drGBjAeyMFe1v2gwmJE4MmXxH8dikAtIqgIX1hK4VNqBV5LhWJo2PD1wz17HR8b8xqUIGaPtKHsVOpWtkyp6B3nt_UQnm58stI0Z_0eEq0ePfoBXLinw8cMHNMrjW0HzfKX-yTpcPV6PmsMoJEhIg-e-jRzQZNcJFy85f6wmsqeV3G34HtLonCEb2sr5FOVUUeoUwbNZivgfbAUjtvPXvPuUVVzf6vB0WDxKGaAIJaqOmz6-EHqU2gf8kZ_DdA6BLD-imi9HzVJ_h2zKZ-A8qRyE-6_d1NdmYCTudkqszVhf0ZtA";
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
       <h1 className={styles.krok2H1}>Крок 3</h1>
      <div className={styles.senderCont}>
        <div className={styles.field}>
          <h3 className={styles.senderTitle}>Поштомат InPost</h3>
          <div className={styles.geoWidgetContainer}>
            <InpostGeowidget
              token={inpostToken}
              config="parcelCollect"
              onPoint={onPointCallback} // Callback при виборі поштомату
            />
          </div>
          {selectedPoint && (
  <div>
    <h3 className={styles.senderTitle}>Оберіть поштомат:</h3>
    <input
      {...register("senderAddress.postamat", {
        required: "Вкажіть поштомат",
      })}
      value={selectedPoint}
      readOnly
      className={styles.hiddenInput}
    />
  </div>
)}
          {errors.senderAddress?.postamat && (
            <span className={styles.error}>
              {errors.senderAddress.postamat.message}
            </span>
          )}
        </div>
  
        <div className={styles.fieldChecked}>
         
          <input type="checkbox" {...register("senderAddress.otherAddress")} className={styles.checkAddress} />
          <p className={styles.checkedTittle}>Інша адреса</p>
        </div>
  
       
      </div>
      <div className={styles.divButtons}>
                <button
                  type="button"
                  className={styles.buttonBack}
                  onClick={onPrev}
                >
                  Назад
                </button>
                <button type="submit" className={styles.buttonNext}>
                  Далі
                  <svg className={styles.btnSvg} width="23" height="12">
                    <use
                      className={styles.sparowIcon}
                      href={`${icons}#icon-sparow`}
                    ></use>
                  </svg>
                </button>
              </div>
    </form>
  );
};

export default SenderAddress;
