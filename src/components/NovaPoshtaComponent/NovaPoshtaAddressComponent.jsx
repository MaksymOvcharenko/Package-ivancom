/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/NovaPoshtaAddressComponent.js

import { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import { fetchCitiesList, fetchStreetsList } from "./nova-poshta-api";
import styles from "./NovaPoshtaAddressComponent.module.css";

const NovaPoshtaAddressComponent = ({ setFieldValue }) => {
  const [form, setForm] = useState({
    city: "",
    cityRef: "",
    street: "",
    streetRef: "",
    house: "",
    apartment: "",
    floor: "",
  });
  const [citiesList, setCitiesList] = useState([]);
  const [streetsList, setStreetsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#D9291C");
  const [inputsDisabled, setInputsDisabled] = useState(false);

  useEffect(() => {
    // Обновляем родительское состояние, когда cityRef или streetRef изменяются
    setFieldValue(form);
  }, [form]);

  // Обработка ввода города
  const handleCityChange = async (event) => {
    const value = event.target.value;
    setForm((prevForm) => ({ ...prevForm, city: value }));

    if (value === "") {
      setCitiesList([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchCitiesList(value);
      setCitiesList(response.data[0]?.Addresses || []);
    } catch (error) {
      console.error("Ошибка при загрузке списка городов", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Обработка выбора города
  const handleCityClick = async (cityName, cityRef) => {
    setForm((prevForm) => ({ ...prevForm, city: cityName, cityRef }));
    setCitiesList([]);
    setInputsDisabled(false);
  };

  // Обработка ввода улицы
  const handleStreetChange = async (event) => {
    const value = event.target.value;
    setForm((prevForm) => ({ ...prevForm, street: value }));

    if (value === "" || !form.cityRef) {
      setStreetsList([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchStreetsList(value, form.cityRef);
      const streets = response.data[0]?.Addresses || [];
      setStreetsList(streets);
    } catch (error) {
      console.error("Ошибка при загрузке списка улиц", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Обработка выбора улицы
  const handleStreetClick = (streetName, streetRef) => {
    setForm((prevForm) => ({
      ...prevForm,
      street: streetName,
      streetRef,
    }));
    setStreetsList([]);
  };

  // Обработка очистки ввода
  const handleClearInput = () => {
    setCitiesList([]);
    setStreetsList([]);
    setForm({
      city: "",
      cityRef: "",
      street: "",
      streetRef: "",
      house: "",
      apartment: "",
      floor: "",
    });
    setInputsDisabled(false);
  };

  // Обработка отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.city || !form.street) {
      alert("Необходимо выбрать город и улицу");
      return;
    }
    console.log("Выбран город:", form.city);
    console.log("Выбран город Ref:", form.cityRef);
    console.log("Выбрана улица:", form.street);
    console.log("Выбран улица Ref:", form.streetRef);
    console.log("Номер дома:", form.house);
    console.log("Квартира:", form.apartment);
    console.log("Этаж:", form.floor);
  };

  const isSubmitButtonEnabled = form.city && form.street;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="city"
            placeholder="Название города"
            value={form.city}
            onChange={handleCityChange}
            disabled={inputsDisabled}
            className={styles.input}
          />
        </div>
        {form.cityRef && (
          <div>
            <input
              type="text"
              name="street"
              placeholder="Название улицы"
              value={form.street}
              onChange={handleStreetChange}
              disabled={inputsDisabled}
              className={styles.input}
            />
          </div>
        )}
        {form.streetRef && (
          <div>
            <input
              type="text"
              name="house"
              placeholder="Номер дома"
              value={form.house}
              onChange={(e) => setForm({ ...form, house: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              name="apartment"
              placeholder="Квартира"
              value={form.apartment}
              onChange={(e) => setForm({ ...form, apartment: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              name="floor"
              placeholder="Этаж"
              value={form.floor}
              onChange={(e) => setForm({ ...form, floor: e.target.value })}
              className={styles.input}
            />
          </div>
        )}
        <button
          type="button"
          onClick={handleClearInput}
          className={styles.button}
        >
          Очистити
        </button>
        {/* <button
          type="submit"
          disabled={!isSubmitButtonEnabled}
          className={styles.button}
        >
          Выбрать
        </button> */}
      </form>
      <div className={styles.loader}>
        <BarLoader color={color} loading={isLoading} width={"100%"} />
      </div>
      {citiesList.length > 0 && (
        <ul className={styles.list}>
          {citiesList.map(({ Present, MainDescription, Ref }) => (
            <li
              key={Ref}
              className={styles.listItem}
              onClick={() => handleCityClick(MainDescription, Ref)}
            >
              {Present}
            </li>
          ))}
        </ul>
      )}
      {streetsList.length > 0 && (
        <ul className={styles.list}>
          {streetsList.map(
            ({ SettlementStreetDescription, SettlementStreetRef }) => (
              <li
                key={SettlementStreetRef}
                className={styles.listItem}
                onClick={() =>
                  handleStreetClick(
                    SettlementStreetDescription,
                    SettlementStreetRef
                  )
                }
              >
                {SettlementStreetDescription}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default NovaPoshtaAddressComponent;
