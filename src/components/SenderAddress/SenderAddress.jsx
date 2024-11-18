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

const SenderAddress = ({ onNext, onPrev }) => {
  const {
    register,
    handleSubmit,
    setValue, // Для встановлення значень у форму
    formState: { errors },
  } = useForm();
  const [selectedPoint, setSelectedPoint] = useState("");

  const onPointCallback = (point) => {
    console.log("Вибраний поштомат:", point);
    setSelectedPoint(point.name); // Зберігаємо вибраний поштомат у стані
    setValue("senderAddress.postamat", point.name); // Задаємо значення у форму
  };

  const onSubmit = (data) => {
    onNext({ senderAddress: data });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label>Поштомат InPost</label>
        <div className={styles.geoWidgetContainer}>
          <InpostGeowidget
            token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwNDcyOTk0MjAsImlhdCI6MTczMTkzOTQyMCwianRpIjoiMmQ5ZjY3MzMtMDhiMi00MDMwLTk5MGEtMTgyM2ViZTVhOWQ1IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpnV05US05EV1pqRDBUZGxCNUNDS2NDeGVOSmRPRmFTRmhkSUM5ZG8zTHBJIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiYjk0ODI5MjItM2U3OC00MjkwLTkxNTMtMzk4NGQ3NThjYzE2Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6ImI5NDgyOTIyLTNlNzgtNDI5MC05MTUzLTM5ODRkNzU4Y2MxNiIsImFsbG93ZWRfcmVmZXJyZXJzIjoicGFja2FnZS1pdmFuY29tLnZlcmNlbC5hcHAiLCJ1dWlkIjoiMjYyMzAwODktZjJmNC00MjFlLWE2MDctNGJhZDJjNDk3NmIyIn0.ZUC2HVgxkD60q76gWT0-pFmDdEfOO7m7v62qQBoDoPUm7WklX7-I-6OT8qUMkmJ0KxgeCHz_l7D4_PaGSyjZEeaHdzKx0ou8ZyPUXFoqAm5yZq8BwJWNQlemoyq9VRExMDCciZ44f4uAWlTPOmS3gIYHNv5bEV5F9oQGAEAKZMS60fCi_Jl1WyuyZCgklrUjY4eMrS8uw2YHRB99Odt1LVo1BqC-2SnvsQ1rEAloW3nHYiLEhbeF8AclniwO8DM-Fl6vLNUcuFoeHAiBZm1xgh-3wsFAa2ezAVzMhD8U2jE2XPifapJciyH8fk8Oh01uIfckQTq0dJbeQrhSzpbHzw" // Замініть на ваш реальний токен
            language="en"
            config="parcelCollect"
            onPoint={onPointCallback} // Callback при виборі поштомату
          />
        </div>
        <input
          {...register("senderAddress.postamat", {
            required: "Обов'язкове поле",
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
