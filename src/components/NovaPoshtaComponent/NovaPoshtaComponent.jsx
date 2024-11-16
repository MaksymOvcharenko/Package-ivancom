// src/NovaPoshtaComponent.js

import { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import { fetchCitiesList, fetchBranchesList } from "./nova-poshta-api";
import styles from "./NovaPoshtaComponent.module.css"; // Импорт CSS-модуля

const NovaPoshtaComponent = ({
  setFieldValue,
  setCityRef,
  setWarehouseRef,
}) => {
  const [form, setForm] = useState({
    city: "",
    warehouse: "",
    cityRef: "",
    warehouseRef: "",
  });
  const [citiesList, setCitiesList] = useState([]);
  const [warehousesList, setWarehousesList] = useState([]);
  const [filteredWarehousesList, setFilteredWarehousesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#D9291C");
  const [inputsDisabled, setInputsDisabled] = useState(false);

  useEffect(() => {
    // Update parent state when cityRef or warehouseRef changes
    setCityRef(form.cityRef);
    setWarehouseRef(form.warehouseRef);
  }, [form.cityRef, form.warehouseRef, setCityRef, setWarehouseRef]);

  // Handle city input change
  const handleFormChangeCity = async (event) => {
    const value = event.target.value;
    setForm((prevForm) => ({ ...prevForm, city: value }));

    if (value === "") {
      setCitiesList([]);
      return;
    }

    const gerex =
      /^[А-Яа-яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ(\-)(\ )\u0027\u0060\u0022\u201C\u201D\u2018\u2019\u02BC]+$/;
    if (value.match(gerex)) {
      setIsLoading(true);
      try {
        const response = await fetchCitiesList(value);
        console.log("Cities response:", response);
        setCitiesList(response.data[0]?.Addresses || []);
      } catch (error) {
        console.error("Ошибка при загрузке списка городов", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCitiesList([]);
    }
  };

  // Handle city selection
  const handleCityClick = async (cityName, cityRef) => {
    setForm((prevForm) => ({ ...prevForm, city: cityName, cityRef }));
    setCitiesList([]);
    setIsLoading(true);
    try {
      const response = await fetchBranchesList(cityName, "", 1, cityRef);
      console.log("Warehouses response:", response);
      const warehouses = response.data || [];
      setWarehousesList(warehouses);
      setFilteredWarehousesList(warehouses); // Initialize filtered list
      setInputsDisabled(false); // Enable warehouse input
    } catch (error) {
      console.error("Ошибка при загрузке списка отделений", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle warehouse input change
  const handleFormChangeWarehouse = (event) => {
    const value = event.target.value;
    if (value.length > 5) {
      alert("В поле вводу номеру відділення не можливо ввести більше 5 цифр");
      return;
    }
    setForm((prevForm) => ({ ...prevForm, warehouse: value }));

    // Filter warehouses list based on input
    const filtered = warehousesList.filter((wh) =>
      wh.Description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredWarehousesList(filtered);
  };

  // Handle warehouse selection
  const handleWarehouseClick = (warehouseName, warehouseRef) => {
    setForm((prevForm) => ({
      ...prevForm,
      warehouse: warehouseName,
      warehouseRef,
    }));
    setFilteredWarehousesList([]);
    setWarehousesList([]);
    setInputsDisabled(true);
  };

  // Handle input clear
  const handleClearInput = () => {
    setCitiesList([]);
    setWarehousesList([]);
    setFilteredWarehousesList([]);
    setForm({ city: "", warehouse: "", cityRef: "", warehouseRef: "" });
    setInputsDisabled(false);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.city || !form.warehouse) {
      alert("Необходимо выбрать город и отделение");
      return;
    }
    console.log("Selected city:", form.city);
    console.log("Selected city ref:", form.cityRef);
    console.log("Selected warehouse:", form.warehouse);
    console.log("Selected warehouse ref:", form.warehouseRef);
  };

  // Determine if the submit button should be enabled
  const isSubmitButtonEnabled = form.city && form.warehouse;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="city"
            placeholder="Назва міста"
            value={form.city}
            onChange={handleFormChangeCity}
            disabled={inputsDisabled}
            className={styles.input}
          />
        </div>
        <div>
          <input
            type="text"
            name="warehouse"
            placeholder="№ Відділення"
            value={form.warehouse}
            onChange={handleFormChangeWarehouse}
            disabled={inputsDisabled}
            className={styles.input}
          />
        </div>
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
          Обрати
        </button> */}
      </form>
      <div className={styles.loader}>
        <BarLoader color={color} loading={isLoading} width={"100%"} />
      </div>
      {citiesList.length > 0 && (
        <ul className={styles.list}>
          {citiesList.map(({ Present, MainDescription, DeliveryCity }) => (
            <li
              key={DeliveryCity}
              className={styles.listItem}
              onClick={() => handleCityClick(MainDescription, DeliveryCity)}
            >
              {Present}
            </li>
          ))}
        </ul>
      )}
      {filteredWarehousesList.length > 0 && (
        <ul className={styles.list}>
          {filteredWarehousesList.map(({ Description, Ref }) => (
            <li
              key={Ref}
              className={styles.listItem}
              onClick={() => handleWarehouseClick(Description, Ref)}
            >
              {Description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NovaPoshtaComponent;
