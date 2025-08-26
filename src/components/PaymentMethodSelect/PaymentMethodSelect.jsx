"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./PaymentMethodSelect.module.css";
import { setMethodPay, setStep } from "../../redux/form/formSlice.js";
import icons from "../../image/icons.svg";
import logop24 from "./Przelewy24_logo.svg";
import logoMono from "./monobank-seeklogo.svg";
export default function PaymentMethodSelect({ onPrev, onConfirm }) {
  const dispatch = useDispatch();
  const method = useSelector((s) => s.form.value.method); // 'p24' | 'mono' | undefined

  const pick = (value) => dispatch(setMethodPay(value));

  const handleConfirm = () => {
    if (!method) return;
    dispatch(setStep(6));
    onConfirm?.(method);
  };

  return (
    <>
      <h1 className={styles.krok2H1}>Крок 5</h1>
      <div className={styles.wrap}>
        <h2 className={styles.title}>Виберіть спосіб оплати:</h2>

        <label
          className={`${styles.option} ${
            method === "p24" ? styles.optionActive : ""
          }`}
        >
          <input
            className={styles.radio}
            type="radio"
            name="payMethod"
            value="p24"
            checked={method === "p24"}
            onChange={() => pick("p24")}
          />
          <svg className={styles.btnSvg} width="100" height="45">
            <use className={styles.sparowIcon} href={logop24}></use>
          </svg>
          <span>Visa / MasterCard, BLIK рахунок у PLN</span>
        </label>

        <label
          className={`${styles.option} ${
            method === "mono" ? styles.optionActive : ""
          }`}
        >
          <input
            className={styles.radio}
            type="radio"
            name="payMethod"
            value="mono"
            checked={method === "mono"}
            onChange={() => pick("mono")}
          />
          <svg className={styles.btnSvg} width="100" height="45">
            <use className={styles.sparowIcon} href={logoMono}></use>
          </svg>
          <span>Visa / MasterCard, рахунок у UAH (через Monobank)</span>
        </label>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.buttonBack}`}
            onClick={onPrev}
          >
            Назад
          </button>

          <button
            type="button"
            className={`${styles.btn} ${styles.buttonNext}`}
            onClick={handleConfirm}
            disabled={!method}
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
      </div>
    </>
  );
}
