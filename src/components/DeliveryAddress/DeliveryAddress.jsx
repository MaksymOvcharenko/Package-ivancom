import { useForm } from "react-hook-form";
import styles from "./DeliveryAddress.module.css";

const DeliveryAddress = ({ onPrev }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label>Адреса доставки</label>
        <input
          {...register("deliveryAddress.address", {
            required: "Обов'язкова адреса",
          })}
        />
        {errors.deliveryAddress?.address && (
          <span className={styles.error}>
            {errors.deliveryAddress.address.message}
          </span>
        )}
      </div>

      <button type="button" className={styles.button} onClick={onPrev}>
        Назад
      </button>
      <button type="submit" className={styles.button}>
        Завершити
      </button>
    </form>
  );
};

export default DeliveryAddress;
