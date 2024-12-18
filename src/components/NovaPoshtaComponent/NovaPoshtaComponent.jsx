
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import BarLoader from "react-spinners/BarLoader";
import { fetchCitiesList, fetchBranchesList } from "./nova-poshta-api";
import styles from "./NovaPoshtaComponent.module.css";
import { useSelector } from "react-redux";
import { selectDeliveryAddress, selectParcel } from "../../redux/form/formSelectors.js";
import icons from "../../image/icons.svg";

const NovaPoshtaComponent = ({ setFieldValue }) => {
  const deliveryAdress = useSelector(selectDeliveryAddress);
  const maxWeight = useSelector(selectParcel);
  const [citiesList, setCitiesList] = useState([]);
  const [warehousesList, setWarehousesList] = useState([]);
  const [filteredWarehousesList, setFilteredWarehousesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [cityError, setCityError] = useState(""); // Додано стан для помилки

  const formik = useFormik({
    initialValues: {
      city: deliveryAdress.city || "",
      warehouse: deliveryAdress.warehouse || "",
      cityRef: "",
      warehouseRef: "",
    },
    onSubmit: (values) => {
      setFieldValue(values);
    },
  });

  useEffect(() => {
    setFieldValue(formik.values);
  }, [formik.values, setFieldValue]);

  const handleFormChangeCity = async (event) => {
    const value = event.target.value;
    const regex = /^[А-Яа-яЇїІіЄєҐґ\s'-]+$/;

    if (regex.test(value) || value === "") {
      setCityError(""); // Очистити повідомлення про помилку
      formik.setFieldValue("city", value);

      if (value === "") {
        setCitiesList([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetchCitiesList(value);
        setCitiesList(response.data[0]?.Addresses || []);
      } catch (error) {
        console.error("Помилка при завантаженні міст", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCityError("Дозволені тільки кирилиця"); // Встановити помилку
      setCitiesList([]);
    }
  };

  // const handleCityClick = async (cityName, cityRef) => {
  //   formik.setFieldValue("city", cityName);
  //   formik.setFieldValue("cityRef", cityRef);
  //   setCitiesList([]);
  //   setIsLoading(true);
  //   try {
  //     const response = await fetchBranchesList(cityName, "", 1, cityRef);
  //     setWarehousesList(response.data || []);
  //     setFilteredWarehousesList(response.data || []);
  //     setInputsDisabled(false);
  //   } catch (error) {
  //     console.error("Помилка при завантаженні відділень", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleCityClick = async (cityName, cityRef) => {
    formik.setFieldValue("city", cityName);  // Встановлюємо значення міста в форму
    formik.setFieldValue("cityRef", cityRef);  // Встановлюємо рефериенс міста в форму
    setCitiesList([]);  // Очищаємо список міст
    setIsLoading(true);  // Встановлюємо стан загрузки
  
    try {
      const response = await fetchBranchesList(cityName, "", 1, cityRef); // Запит на отримання відділень для вибраного міста
      
      // Фільтруємо лише ті відділення, де CategoryOfWarehouse === "Branch"
      const filteredWarehouses = response.data.filter(
        warehouse => warehouse.CategoryOfWarehouse.trim() !== "DropOff" &&
                     warehouse.CategoryOfWarehouse.trim() !== "Postomat" &&
                     warehouse.TotalMaxWeightAllowed > maxWeight.maxWeight
      );
      
      // const filteredWarehouses = response.data.filter(
      //   warehouse => warehouse.CategoryOfWarehouse.trim() !== "DropOff"
      // );
      setWarehousesList(filteredWarehouses);  // Зберігаємо відфільтровані відділення в стан
      setFilteredWarehousesList(filteredWarehouses);  // Зберігаємо відфільтровані відділення в стан
      setInputsDisabled(false);  // Дозволяємо вводити значення у форму
    } catch (error) {
      console.error("Помилка при завантаженні відділень", error);  // Логування помилки
    } finally {
      setIsLoading(false);  // Завершуємо стан загрузки
    }
  };
  const handleFormChangeWarehouse = (event) => {
    const value = event.target.value;
    if (value.length > 5) {
      alert("Не можна ввести більше 5 цифр у поле відділення");
      return;
    }
    formik.setFieldValue("warehouse", value);
    setFilteredWarehousesList(
      warehousesList.filter((wh) =>
        wh.Description.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleWarehouseClick = (warehouseName, warehouseRef, TotalMaxWeightAllowed) => {
    console.log(TotalMaxWeightAllowed);
    
    formik.setFieldValue("warehouse", warehouseName);
    formik.setFieldValue("warehouseRef", warehouseRef);
    setFilteredWarehousesList([]);
    setWarehousesList([]);
    setInputsDisabled(true);
  };

  const handleClearInput = () => {
    setCitiesList([]);
    setWarehousesList([]);
    setFilteredWarehousesList([]);
    formik.resetForm();
    formik.setFieldValue("city", "");
    formik.setFieldValue("warehouse", "");
    setInputsDisabled(false);
    setCityError(""); // Очистити помилку
  };

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <label className={styles.label}>
          Назва міста
          <input
            type="text"
            name="city"
            value={formik.values.city}
            onChange={handleFormChangeCity}
            disabled={inputsDisabled}
            className={styles.input}
            required
          />
        </label>
        {cityError && <p className={styles.error}>{cityError}</p>} {/* Повідомлення про помилку */}

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

        <label className={styles.label}>
          № Відділення
          <input
            type="text"
            name="warehouse"
            value={formik.values.warehouse}
            onChange={handleFormChangeWarehouse}
            disabled={inputsDisabled}
            className={styles.input}
          />
        </label>

        {filteredWarehousesList.length > 0 && (
          <ul className={styles.list}>
            {filteredWarehousesList.map(({ Description, Ref,TotalMaxWeightAllowed }) => (
              <li
                key={Ref}
                className={styles.listItem}
                onClick={() => handleWarehouseClick(Description, Ref, TotalMaxWeightAllowed)}
              >
                {Description}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.loader}>
          <BarLoader color="#007bff" loading={isLoading} width="100%" />
        </div>

        <button
          type="button"
          onClick={handleClearInput}
          className={styles.buttonClear}
        >
          <svg className={styles.svgRemove} width="17" height="14">
            <use
              className={styles.iconRemove}
              href={`${icons}#icon-remove`}
            ></use>
          </svg>
          Очистити
        </button>
      </form>
    </div>
  );
};

export default NovaPoshtaComponent;
