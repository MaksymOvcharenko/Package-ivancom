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
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import styles from "./ParcelData.module.css";
// import CargoDescriptionSelector from "../NovaPoshtaComponent/CargoDescriptionSelector.jsx";
// import { useSelector } from "react-redux";
// import { selectParcel } from "../../redux/form/formSelectors.js";

// const validationSchema = Yup.object().shape({
//   valuation: Yup.number()
//     .required("Вартість обов'язкова")
//     .min(35, "Мінімальна вартість 35 PLN")
//     .max(10000, "Максимальна вартість 10000 PLN"),
//   size: Yup.string().required("Обов'язкове поле"),
// });

// const ParcelData = ({ onNext, onPrev }) => {
//   const parcel = useSelector(selectParcel) || {}; // Забезпечити дефолтний об'єкт


//   return (
//     <Formik
//       initialValues={{
//         valuation: parcel.valuation || "", // Якщо значення відсутнє, буде порожній рядок
//         size: parcel.size || "",
//         cargoDescription: parcel.cargoDescription || "", // Дефолтне значення
//       }}
//       validationSchema={validationSchema}
//       onSubmit={(values) => {
//         onNext({ values });
//       }}
//     >
//       {({ setFieldValue }) => (
//         <Form className={styles.form}>
//           <div className={styles.field}>
//             <label>Скритка</label>
//             <label >
//               <Field type="radio" name="size" value="A" /> Скритка A
//             </label>
//             <label>
//               <Field type="radio" name="size" value="B" /> Скритка B
//             </label>
//             <label>
//               <Field type="radio" name="size" value="C" /> Скритка C
//             </label>
//             <ErrorMessage
//               name="size"
//               component="span"
//               className={styles.error}
//             />
//           </div>
//           <div className={styles.field}>
//             <label>Оціночна вартість (PLN)</label>
//             <Field type="number" name="valuation" />
//             <ErrorMessage
//               name="valuation"
//               component="span"
//               className={styles.error}
//             />
//           </div>

//           <div className={styles.field}>
//             <label>Опис вмісту</label>
//             <CargoDescriptionSelector
//               onSelect={(value) => setFieldValue("cargoDescription", value)}
//             />
//             <ErrorMessage
//               name="cargoDescription"
//               component="span"
//               className={styles.error}
//             />
//           </div>
//           <div className={styles.buttons}>
//             <button type="button" className={styles.button} onClick={onPrev}>
//               Назад
//             </button>
//             <button type="submit" className={styles.button}>
//               Далі
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default ParcelData;
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import styles from "./ParcelData.module.css";
// import CargoDescriptionSelector from "../NovaPoshtaComponent/CargoDescriptionSelector.jsx";
// import { useDispatch } from "react-redux";
// import { updateParcelData } from "../../redux/form/formSlice.js";

// const validationSchema = Yup.object().shape({
//   valuation: Yup.number()
//     .required("Вартість обов'язкова")
//     .min(35, "Мінімальна вартість 35 PLN")
//     .max(10000, "Максимальна вартість 10000 PLN"),
//   size: Yup.string().required("Обов'язкове поле"),
// });

// const ParcelData = ({ onNext, onPrev }) => {
//   const dispatch = useDispatch();

//   return (
//     <Formik
//       initialValues={{
//         valuation: "",
//         size: "",
//         cargoDescription: "",
//       }}
//       validationSchema={validationSchema}
//       onSubmit={(values) => {
//         // Диспатч оновлення в Redux
//         dispatch(updateParcelData(values));
//         onNext({ values });
//       }}
//     >
//       {({ setFieldValue, values }) => (
//         <Form className={styles.form}>
//           <div className={styles.field}>
//             <label>Скритка</label>
//             <label>
//               <Field
//                 type="radio"
//                 name="size"
//                 value="A"
//                 onChange={(e) => {
//                   setFieldValue("size", e.target.value);
//                   dispatch(updateParcelData({ size: e.target.value }));
//                 }}
//               />{" "}
//               Скритка A
//             </label>
//             <label>
//               <Field
//                 type="radio"
//                 name="size"
//                 value="B"
//                 onChange={(e) => {
//                   setFieldValue("size", e.target.value);
//                   dispatch(updateParcelData({ size: e.target.value }));
//                 }}
//               />{" "}
//               Скритка B
//             </label>
//             <label>
//               <Field
//                 type="radio"
//                 name="size"
//                 value="C"
//                 onChange={(e) => {
//                   setFieldValue("size", e.target.value);
//                   dispatch(updateParcelData({ size: e.target.value }));
//                 }}
//               />{" "}
//               Скритка C
//             </label>
//             <ErrorMessage
//               name="size"
//               component="span"
//               className={styles.error}
//             />
//           </div>

//           <div className={styles.field}>
//             <label>Оціночна вартість (PLN)</label>
//             <Field
//               type="number"
//               name="valuation"
//               onChange={(e) => {
//                 setFieldValue("valuation", e.target.value);
//                 dispatch(updateParcelData({ valuation: e.target.value }));
//               }}
//             />
//             <ErrorMessage
//               name="valuation"
//               component="span"
//               className={styles.error}
//             />
//           </div>

//           <div className={styles.field}>
//             <label>Опис вмісту</label>
//             <CargoDescriptionSelector
//               onSelect={(value) => {
//                 setFieldValue("cargoDescription", value);
//                 dispatch(updateParcelData({ cargoDescription: value }));
//               }}
//             />
//             <ErrorMessage
//               name="cargoDescription"
//               component="span"
//               className={styles.error}
//             />
//           </div>

//           <div className={styles.buttons}>
//             <button type="button" className={styles.button} onClick={onPrev}>
//               Назад
//             </button>
//             <button type="submit" className={styles.button}>
//               Далі
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default ParcelData;
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ParcelData.module.css";
import CargoDescriptionSelector from "../NovaPoshtaComponent/CargoDescriptionSelector.jsx";
import { setParcelData, calculateValues } from "../../redux/form/formSlice";
import { selectParcel} from "../../redux/form/formSelectors";
import AllSumm from "../AllSumm/AllSumm.jsx";

const validationSchema = Yup.object().shape({
  valuation: Yup.number()
    .required("Вартість обов'язкова")
    .min(35, "Мінімальна вартість 35 PLN")
    .max(100000, "Максимальна вартість 10000 PLN"),
  size: Yup.string().required("Оберіть розмір скритки"),
  cargoDescription: Yup.array().required("Вкажіть опис посилки")
});

const ParcelData = ({ onNext, onPrev }) => {
  const dispatch = useDispatch();
  const parcel = useSelector(selectParcel) || {};
  

  return (
    <Formik
      initialValues={{
        valuation: parcel.valuation || "",
        size: parcel.size || "",
        cargoDescription: parcel.cargoDescription || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(setParcelData(values)); // Збереження даних у стейті
        onNext(); // Перехід на наступний крок
      }}
      validateOnChange={true} // Вмикаємо перевірку на кожній зміні
    >
      {({ setFieldValue, values }) => {
        // Функція для оновлення значень і виклику розрахунків
        const handleFieldChange = (field, value) => {
          setFieldValue(field, value);
          dispatch(
            setParcelData({
              ...values,
              [field]: value,
            })
          );
          dispatch(calculateValues());
        };

        return (
          <Form className={styles.form}>
            {/* Вибір скритки */}
            <div className={styles.field}>
              <label>Скритка</label>
              <label>
                <Field
                  type="radio"
                  name="size"
                  value="A"
                  onChange={() => handleFieldChange("size", "A")}
                />{" "}
                Скритка A
              </label>
              <label>
                <Field
                  type="radio"
                  name="size"
                  value="B"
                  onChange={() => handleFieldChange("size", "B")}
                />{" "}
                Скритка B
              </label>
              <label>
                <Field
                  type="radio"
                  name="size"
                  value="C"
                  onChange={() => handleFieldChange("size", "C")}
                />{" "}
                Скритка C
              </label>
              <ErrorMessage
                name="size"
                component="span"
                className={styles.error}
              />
            </div>

            {/* Оціночна вартість */}
            <div className={styles.field}>
              <label>Оціночна вартість (PLN)</label>
              <Field
  type="number"
  name="valuation"
  value={values.valuation}
  onChange={(e) => {
    const value = e.target.value.replace(/^0+/, ""); // Видаляє всі початкові нулі
    handleFieldChange("valuation", value ? Number(value) : ""); // Оновлює стейт
  }}
/>
              <ErrorMessage
                name="valuation"
                component="span"
                className={styles.error}
              />
            </div>

            {/* Опис вмісту */}
            <div className={styles.field}>
              <label>Опис вмісту</label>
              <CargoDescriptionSelector
                onSelect={(value) => handleFieldChange("cargoDescription", value)}
              />
              <ErrorMessage
                name="cargoDescription"
                component="span"
                className={styles.error}
              />
            </div>
            <div>
            <AllSumm/>
            </div>
            
            {/* Кнопки */}
            <div className={styles.buttons}>
              <button type="button" className={styles.button} onClick={onPrev}>
                Назад
              </button>
              <button type="submit" className={styles.button}>
                Далі
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ParcelData;

