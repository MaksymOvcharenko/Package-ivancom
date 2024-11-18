// import { useForm } from "react-hook-form";
// import styles from "./ParcelData.module.css";
// import CargoTypeSelector from "../NovaPoshtaComponent/CargoTypeSelector.jsx";
// import CargoDescriptionSelector from "../NovaPoshtaComponent/CargoDescriptionSelector.jsx";

// const ParcelData = ({ onNext, onPrev }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     onNext({ parcel: data });
//   };

//   return (
//     <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//       <div className={styles.field}>
//         <label>Оціночна вартість (PLN)</label>
//         <input
//           type="number"
//           {...register("parcel.valuation", {
//             required: "Вартість обов'язкова",
//             min: 35,
//             max: 10000,
//           })}
//         />
//         {errors.parcel?.valuation && (
//           <span className={styles.error}>
//             {errors.parcel.valuation.message}
//           </span>
//         )}
//       </div>
//       <div className={styles.field}>
//         <label>Скритка</label>
//         <input
//           type="radio"
//           {...register("parcel.size", { required: "Обов'язкове поле" })}
//           value="A"
//         />{" "}
//         Скритка A
//         <input
//           type="radio"
//           {...register("parcel.size", { required: "Обов'язкове поле" })}
//           value="B"
//         />{" "}
//         Скритка B
//         <input
//           type="radio"
//           {...register("parcel.size", { required: "Обов'язкове поле" })}
//           value="C"
//         />{" "}
//         Скритка C
//         {errors.parcel?.size && (
//           <span className={styles.error}>{errors.parcel.size.message}</span>
//         )}
//       </div>
//       <div className={styles.field}>
//         <label>Вміст посилки</label>
//         <input
//           {...register("parcel.contents", { required: "Вміст обов'язковий" })}
//         />
//         {errors.parcel?.contents && (
//           <span className={styles.error}>{errors.parcel.contents.message}</span>
//         )}
//       </div>
//       <CargoDescriptionSelector />
//       <button type="button" className={styles.button} onClick={onPrev}>
//         Назад
//       </button>
//       <button type="submit" className={styles.button}>
//         Далі
//       </button>
//     </form>
//   );
// };

// export default ParcelData;
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ParcelData.module.css";
import CargoDescriptionSelector from "../NovaPoshtaComponent/CargoDescriptionSelector.jsx";

const validationSchema = Yup.object().shape({
  valuation: Yup.number()
    .required("Вартість обов'язкова")
    .min(35, "Мінімальна вартість 35 PLN")
    .max(10000, "Максимальна вартість 10000 PLN"),
  size: Yup.string().required("Обов'язкове поле"),
});

const ParcelData = ({ onNext, onPrev }) => {
  return (
    <Formik
      initialValues={{
        valuation: "",
        size: "",

        cargoDescription: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onNext({ values });
      }}
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label>Оціночна вартість (PLN)</label>
            <Field type="number" name="valuation" />
            <ErrorMessage
              name="valuation"
              component="span"
              className={styles.error}
            />
          </div>
          <div className={styles.field}>
            <label>Скритка</label>
            <label>
              <Field type="radio" name="size" value="A" /> Скритка A
            </label>
            <label>
              <Field type="radio" name="size" value="B" /> Скритка B
            </label>
            <label>
              <Field type="radio" name="size" value="C" /> Скритка C
            </label>
            <ErrorMessage
              name="size"
              component="span"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <label>Опис вмісту</label>
            <CargoDescriptionSelector
              onSelect={(value) => setFieldValue("cargoDescription", value)}
            />
            <ErrorMessage
              name="cargoDescription"
              component="span"
              className={styles.error}
            />
          </div>
          <button type="button" className={styles.button} onClick={onPrev}>
            Назад
          </button>
          <button type="submit" className={styles.button}>
            Далі
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ParcelData;
