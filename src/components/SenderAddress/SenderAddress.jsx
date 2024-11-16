import { useForm } from "react-hook-form";
import styles from "./SenderAddress.module.css";

const SenderAddress = ({ onNext, onPrev }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onNext({ senderAddress: data });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label>Поштомат InPost</label>
        <input
          {...register("senderAddress.postamat", {
            required: "Обов'язкове поле",
          })}
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
