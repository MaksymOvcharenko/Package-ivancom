import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./SenderReceiverData.module.css";
import { useSelector } from "react-redux";
import {
  selectReceiver,
  selectSender,
} from "../../redux/form/formSelectors.js";
import iconSparow from "../../image/icons.svg#icon-sparow"
const SenderReceiverData = ({ onNext }) => {
  const validationSchema = yup.object({
    sender: yup.object({
      firstName: yup
        .string()
        .matches(/^[a-zA-Z\s]*$/, "Ім'я має бути тільки латиницею")
        .required("Ім'я обов'язкове"),
      lastName: yup
        .string()
        .matches(/^[a-zA-Z\s]*$/, "Прізвище має бути тільки латиницею")
        .required("Прізвище обов'язкове"),
      phone: yup.string().required("Телефон обов'язковий"),
      email: yup
        .string()
        .email("Некоректний формат email")
        .required("Емейл обов'язковий"),
    }),
    receiver: yup.object({
      firstName: yup
        .string()
        .matches(/^[а-яА-ЯёЁЇїІіЄєҐґ\s]*$/, "Ім'я має бути тільки кирилицею")
        .required("Ім'я обов'язкове"),
      lastName: yup
        .string()
        .matches(
          /^[а-яА-ЯёЁЇїІіЄєҐґ\s]*$/,
          "Прізвище має бути тільки кирилицею"
        )
        .required("Прізвище обов'язкове"),
      phone: yup.string().required("Телефон обов'язковий"),
      email: yup
        .string()
        .email("Некоректний формат email")
        .required("Емейл обов'язковий"),
    }),
  });

  const handleSubmit = (values) => {
    onNext({ sender: values.sender, receiver: values.receiver });
  };
  const sender = useSelector(selectSender);
  const receiver = useSelector(selectReceiver);
  return (
    <Formik
      initialValues={{
        sender: sender,
        receiver: receiver,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className={styles.form}>
          <h2 className={styles.title}>Крок 1</h2>
          <div className={styles.senderField}>
            <h3 className={styles.senderTitle}>Дані відправника</h3>
            <div className={styles.inputCont}>
              <div className={styles.senderCont}>
                <div className={styles.field}>
                  <label htmlFor="sender.firstName" className={styles.label}>Ім&apos;я: </label>
                  <Field
                    name="sender.firstName"
                    type="text"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="sender.firstName"
                    component="span"
                    className={styles.error}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="sender.lastName">Прізвище: </label>
                  <Field
                    name="sender.lastName"
                    type="text"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="sender.lastName"
                    component="span"
                    className={styles.error}
                  />
                </div>
              </div>
              <div className={styles.senderCont}>
                <div className={styles.field}>
                  <label>Телефон: </label>
                  <PhoneInput
                    containerClass={styles.phoneInputContainer}
                    inputClass={styles.phoneInput}
                    onlyCountries={["pl"]}
                    country={"pl"}
                    value={values.sender.phone}
                    onChange={(phone) => setFieldValue("sender.phone", phone)}
                    buttonClass= {styles.buttonPhone}
                    
              dropdownClass= {styles.dropdownPhone}
                    searchClass= {styles.searchPhone}
                  />
                  <ErrorMessage
                    name="sender.phone"
                    component="span"
                    className={styles.error}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="sender.email">Email: </label>
                  <Field
                    name="sender.email"
                    type="email"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="sender.email"
                    component="span"
                    className={styles.error}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.receiverField}>
            <h3 className={styles.senderTitle}>Дані отримувача</h3>
            <div className={styles.senderCont}>
              <div className={styles.field}>
                <label htmlFor="receiver.firstName">Ім&apos;я: </label>
                <Field
                  name="receiver.firstName"
                  type="text"
                  className={styles.input}
                />
                <ErrorMessage
                  name="receiver.firstName"
                  component="span"
                  className={styles.error}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="receiver.lastName">Прізвище: </label>
                <Field
                  name="receiver.lastName"
                  type="text"
                  className={styles.input}
                />
                <ErrorMessage
                  name="receiver.lastName"
                  component="span"
                  className={styles.error}
                />
              </div>
            </div>
            <div className={styles.senderCont}>
              <div className={styles.field}>
                <label>Телефон: </label>
                <PhoneInput
                  containerClass={styles.phoneInputContainer}
                  inputClass={styles.phoneInput}
                  country={"ua"}
                  onlyCountries={["ua"]}
                  value={values.receiver.phone}
                  onChange={(phone) => setFieldValue("receiver.phone", phone)}
                  buttonClass= {styles.buttonPhone}
                    
              dropdownClass= {styles.dropdownPhone}
                    searchClass= {styles.searchPhone}
                />
                <ErrorMessage
                  name="receiver.phone"
                  component="span"
                  className={styles.error}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="receiver.email">Email: </label>
                <Field
                  name="receiver.email"
                  type="email"
                  className={styles.input}
                />
                <ErrorMessage
                  name="receiver.email"
                  component="span"
                  className={styles.error}
                />
              </div>
            </div>
          </div>
          <div className={styles.buttonCont}>
            <button type="submit" className={styles.button}>
              Далі
              <svg className={styles.nextIcon} width="17" height="17">
          <use className={styles.nextIconUse} href={iconSparow}></use></svg>
          <svg className={styles.nextIcon} width="17" height="17">
  <use href={iconSparow}></use>
</svg>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SenderReceiverData;
