import { useForm } from "react-hook-form";
import styles from "./ParcelData.module.css";
import CargoTypeSelector from "../NovaPoshtaComponent/CargoTypeSelector.jsx";
import CargoDescriptionSelector from "../NovaPoshtaComponent/CargoDescriptionSelector.jsx";

const ParcelData = ({ onNext, onPrev }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onNext({ parcel: data });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label>Оціночна вартість (PLN)</label>
        <input
          type="number"
          {...register("parcel.valuation", {
            required: "Вартість обов'язкова",
            min: 35,
            max: 10000,
          })}
        />
        {errors.parcel?.valuation && (
          <span className={styles.error}>
            {errors.parcel.valuation.message}
          </span>
        )}
      </div>
      <div className={styles.field}>
        <label>Скритка</label>
        <input
          type="radio"
          {...register("parcel.size", { required: "Обов'язкове поле" })}
          value="A"
        />{" "}
        Скритка A
        <input
          type="radio"
          {...register("parcel.size", { required: "Обов'язкове поле" })}
          value="B"
        />{" "}
        Скритка B
        <input
          type="radio"
          {...register("parcel.size", { required: "Обов'язкове поле" })}
          value="C"
        />{" "}
        Скритка C
        {errors.parcel?.size && (
          <span className={styles.error}>{errors.parcel.size.message}</span>
        )}
      </div>
      <div className={styles.field}>
        <label>Вміст посилки</label>
        <input
          {...register("parcel.contents", { required: "Вміст обов'язковий" })}
        />
        {errors.parcel?.contents && (
          <span className={styles.error}>{errors.parcel.contents.message}</span>
        )}
      </div>
      <CargoDescriptionSelector />
      <button type="button" className={styles.button} onClick={onPrev}>
        Назад
      </button>
      <button type="submit" className={styles.button}>
        Далі
      </button>
    </form>
  );
};

export default ParcelData;
