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
import { useSelector } from "react-redux";
import { selectSenderAddress } from "../../redux/form/formSelectors.js";
import { setSenderAddressPostomat } from "../../redux/form/formSlice.js";

const SenderAddress = ({ onNext, onPrev }) => {
  const {
    register,
    handleSubmit,
    setValue, // Для встановлення значень у форму
    formState: { errors },
  } = useForm();
    const postamat = useSelector(selectSenderAddress)?.senderAddress?.postamat || "Оберіть поштомат"
  
  
  const [selectedPoint, setSelectedPoint] = useState(postamat);
  
  const onPointCallback = (point) => {
    console.log("Вибраний поштомат:", point);
    setSenderAddressPostomat(point);
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
      <div className={styles.field}>
        <label>Поштомат InPost</label>
        <div className={styles.geoWidgetContainer}>
          <InpostGeowidget
            token={inpostToken}
            config="parcelCollect"
            onPoint={onPointCallback} // Callback при виборі поштомату
          />
        </div>
        <input
          {...register("senderAddress.postamat", {
            required: "Вкажіть воштомат",
          })}
          value={selectedPoint}
          readOnly
          className={styles.hiddenInput}
        />
        {errors.senderAddress?.postamat && (
          <span className={styles.error}>
            {errors.senderAddress.postamat.message}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label>Інша адреса</label>
        <input type="checkbox" {...register("senderAddress.otherAddress")} />
      </div>

      <button type="button" className={styles.button} onClick={onPrev}>
        Назад
      </button>
      <button type="submit" className={styles.button}>
        Далі
      </button>
    </form>
  );
};

export default SenderAddress;
