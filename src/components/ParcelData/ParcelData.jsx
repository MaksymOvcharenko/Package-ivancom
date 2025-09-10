import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ParcelData.module.css";
import CargoDescriptionSelector from "../NovaPoshtaComponent/CargoDescriptionSelector.jsx";
import {
  setParcelData,
  calculateValues,
  applyPromoCode,
  clearPromoCheck,
} from "../../redux/form/formSlice";
import { selectParcel } from "../../redux/form/formSelectors";
import AllSumm from "../AllSumm/AllSumm.jsx";
import icons from "../../image/icons.svg";
import { useEffect } from "react";

import { validatePromoByPhone } from "../../redux/form/formSlice"; // 👈 додай validatePromoByPhone
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  valuation: Yup.number()
    .required("Вартість обов'язкова")
    .min(35, "Мінімальна вартість 35 PLN")
    .max(10000, "Максимальна вартість 10000 PLN"),
  size: Yup.string().required("Оберіть розмір скритки"),
  cargoDescription: Yup.array()
    .min(1, "Вкажіть опис посилки") // Перевіряємо, щоб був хоча б один елемент
    .required("Вкажіть опис посилки"),
});

const ParcelData = ({ onNext, onPrev }) => {
  const dispatch = useDispatch();
  const parcel = useSelector(selectParcel) || {};
  const senderPhone = useSelector((s) => s.form?.sender?.phone);
  const receiverPhone = useSelector((s) => s.form?.receiver?.phone);
  const promoCheck = useSelector((s) => s.form?.promoCheck);

  const isChecking = promoCheck?.status === "loading";
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка до самого верху
  }, []);
  return (
    <Formik
      initialValues={{
        valuation: parcel.valuation || "",
        size: parcel.size || "",
        cargoDescription: parcel.cargoDescription || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (promoCheck?.alreadyUsed) {
          toast.error("❌ Цей промокод недійсний");
          return;
        }
        dispatch(setParcelData(values)); // Збереження даних у стейті
        onNext(); // Перехід на наступний крок
      }}
      validateOnChange={true} // Вмикаємо перевірку на кожній зміні
    >
      {({ setFieldValue, values }) => {
        const promoCodeEntered = values?.promocode?.trim();
        const isPromoUsed =
          !!promoCodeEntered &&
          promoCheck?.status === "success" &&
          promoCheck?.alreadyUsed === true;
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
            <h1 className={styles.krok2H1}>Крок 2</h1>
            {/* Вибір скритки */}
            <div className={styles.divField}>
              <label className={styles.label}>Скринька:</label>
              <div className={styles.divRadio}>
                <label className={styles.labelRadio}>
                  <input
                    className={styles.radio}
                    type="radio"
                    name="size"
                    value="A"
                    onChange={() => handleFieldChange("size", "A")}
                    id="sizeA"
                  />
                  <div className={styles.divRadioLabel}>
                    <span className={styles.customRadio}></span>
                    <span className={styles.radioText}>Скринька A</span>
                  </div>
                  <span className={styles.boxSize}>
                    <svg className={styles.svgSize} width="15" height="15">
                      <use href={`${icons}#icon-box-size`}></use>
                    </svg>
                    До 5 кг | 8*38*60 см
                  </span>
                </label>

                <label className={styles.labelRadio}>
                  <input
                    className={styles.radio}
                    type="radio"
                    name="size"
                    value="B"
                    onChange={() => handleFieldChange("size", "B")}
                    id="sizeB"
                  />
                  <div className={styles.divRadioLabel}>
                    <span className={styles.customRadio}></span>
                    <span className={styles.radioText}>Скринька B</span>
                  </div>
                  <span className={styles.boxSize}>
                    <svg className={styles.svgSize} width="15" height="15">
                      <use href={`${icons}#icon-box-size`}></use>
                    </svg>
                    До 10 кг | 19*38*60 см
                  </span>
                </label>

                <label className={styles.labelRadio}>
                  <input
                    className={styles.radio}
                    type="radio"
                    name="size"
                    value="C"
                    onChange={() => handleFieldChange("size", "C")}
                    id="sizeC"
                  />
                  <div className={styles.divRadioLabel}>
                    <span className={styles.customRadio}></span>
                    <span className={styles.radioText}>Скринька C</span>
                  </div>
                  <span className={styles.boxSize}>
                    <svg className={styles.svgSize} width="15" height="15">
                      <use href={`${icons}#icon-box-size`}></use>
                    </svg>
                    До 25 кг | 41*38*60 см
                  </span>
                </label>
              </div>
              <ErrorMessage
                name="size"
                component="p"
                className={styles.error}
              />
            </div>

            {/* Оціночна вартість */}
            <div className={styles.divField}>
              <label className={styles.label}>Оголошена вартість:</label>
              <Field
                className={styles.valuation}
                type="number"
                name="valuation"
                placeholder="(PLN)"
                value={values.valuation}
                onChange={(e) => {
                  const value = e.target.value.replace(/^0+/, ""); // Видаляє всі початкові нулі
                  handleFieldChange("valuation", value ? Number(value) : ""); // Оновлює стейт
                }}
              />
              <ErrorMessage
                name="valuation"
                component="p"
                className={styles.error}
              />
            </div>

            {/* Опис вмісту */}
            <div className={styles.divField}>
              <CargoDescriptionSelector
                onSelect={(value) =>
                  handleFieldChange("cargoDescription", value)
                }
              />
              <ErrorMessage
                name="cargoDescription"
                component="p"
                className={styles.error}
              />
            </div>
            {/* <div className={styles.divField}>
              <label className={styles.label}>Промокод:</label>
              <Field
                className={styles.valuation}
                type="text"
                name="promocode"
                placeholder="Промокод"
                value={values.promocode}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase(); // Видаляє всі початкові нулі
                  handleFieldChange("promocode", value ? value : ""); // Оновлює стейт
                  dispatch(applyPromoCode({ promoCode: value }));
                }}
              />
            </div> */}
            <div className={styles.divField}>
              <label className={styles.label}>Промокод:</label>
              <Field
                className={styles.valuation}
                type="text"
                name="promocode"
                placeholder="Промокод"
                value={values.promocode}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  handleFieldChange("promocode", value || "");
                  dispatch(clearPromoCheck());
                  // ❌ не викликаємо applyPromoCode тут, щоб не знижувати до перевірки
                }}
                onBlur={async (e) => {
                  const code = e.target.value.trim().toUpperCase();
                  if (!code) return;
                  const phone = senderPhone || receiverPhone || "";

                  // бек-перевірка
                  const res = await dispatch(
                    validatePromoByPhone({ phone, code })
                  );

                  // якщо доступний — тоді застосовуємо знижку
                  if (res?.payload?.available) {
                    dispatch(applyPromoCode({ promoCode: code }));
                    toast.success("✅ Промокод застосовано!");
                  } else if (res?.payload?.alreadyUsed) {
                    toast.error("❌ Ви вже використовували цей промокод");
                  } else if (res?.payload && res?.payload.available === false) {
                    toast.warning("⚠️ Цей промокод недоступний");
                  }
                }}
              />

              {/* короткі повідомлення під інпутом */}
              {promoCheck?.status === "loading" && (
                <p className={styles.promoInfo}>Перевірка промокоду…</p>
              )}
              {promoCheck?.status === "success" && promoCheck?.available && (
                <p className={styles.promoSuccess}>Промокод застосовано ✅</p>
              )}
              {promoCheck?.status === "success" && promoCheck?.alreadyUsed && (
                <p className={styles.promoError}>
                  ❌ Ви вже використовували цей промокод
                </p>
              )}
              {promoCheck?.status === "fail" && (
                <p className={styles.promoError}>Помилка перевірки промокоду</p>
              )}
            </div>

            <div>
              <AllSumm />
            </div>

            {/* Кнопки */}
            <div className={styles.divButtons}>
              <button
                type="button"
                className={styles.buttonBack}
                onClick={onPrev}
              >
                Назад
              </button>
              {/* <button type="submit" className={styles.buttonNext}>
                Далі
                <svg className={styles.btnSvg} width="23" height="12">
                  <use
                    className={styles.sparowIcon}
                    href={`${icons}#icon-sparow`}
                  ></use>
                </svg>
              </button> */}
              <button
                type="submit"
                className={styles.buttonNext}
                disabled={isPromoUsed || isChecking}
                title={
                  isPromoUsed
                    ? "Цей промокод ви вже використовували"
                    : isChecking
                    ? "Йде перевірка промокоду…"
                    : undefined
                }
              >
                Далі
                <svg className={styles.btnSvg} width="23" height="12">
                  <use
                    className={styles.sparowIcon}
                    href={`${icons}#icon-sparow`}
                  ></use>
                </svg>
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ParcelData;
