import { useState, useEffect } from "react";
import { useFormik } from "formik";
import BarLoader from "react-spinners/BarLoader";
import { fetchCitiesList, fetchBranchesList } from "./nova-poshta-api";
import styles from "./NovaPoshtaComponent.module.css";
import { useSelector } from "react-redux";
import { selectDeliveryAddress } from "../../redux/form/formSelectors.js";

const NovaPoshtaComponent = ({ setFieldValue }) => {
  const deliveryAdress = useSelector(selectDeliveryAddress);

  const [citiesList, setCitiesList] = useState([]);
  const [warehousesList, setWarehousesList] = useState([]);
  const [filteredWarehousesList, setFilteredWarehousesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);

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
    formik.setFieldValue("city", value);

    if (value === "") {
      setCitiesList([]);
      return;
    }

    const regex =
      // eslint-disable-next-line no-useless-escape
      /^[А-Яа-яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ(\-)(\ )\u0027\u0060\u0022\u201C\u201D\u2018\u2019\u02BC]+$/;
    if (regex.test(value)) {
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
      setCitiesList([]);
    }
  };

  const handleCityClick = async (cityName, cityRef) => {
    formik.setFieldValue("city", cityName);
    formik.setFieldValue("cityRef", cityRef);
    setCitiesList([]);
    setIsLoading(true);
    try {
      console.log(cityName);
      console.log(cityRef);

      const response = await fetchBranchesList(cityName, "", 1, cityRef);
      await console.log(response);

      setWarehousesList(response.data || []);
      setFilteredWarehousesList(response.data || []);
      setInputsDisabled(false);
    } catch (error) {
      console.error("Помилка при завантаженні відділень", error);
    } finally {
      setIsLoading(false);
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

  const handleWarehouseClick = (warehouseName, warehouseRef) => {
    formik.setFieldValue("warehouse", warehouseName);
    formik.setFieldValue("warehouseRef", warehouseRef);
    setFilteredWarehousesList([]);
    setWarehousesList([]);
    setInputsDisabled(true);
  };

  const handleClearInput = () => {
    // Очищаємо всі списки та скидаємо значення форми

    setCitiesList([]);
    setWarehousesList([]);
    setFilteredWarehousesList([]);
    formik.resetForm();
    formik.setFieldValue("city", "");
    formik.setFieldValue("warehouse", "");
    setInputsDisabled(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="city"
            placeholder="Назва міста"
            value={formik.values.city}
            onChange={handleFormChangeCity}
            disabled={inputsDisabled}
            className={styles.input}
          />
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

        <div>
          <input
            type="text"
            name="warehouse"
            placeholder="№ Відділення"
            value={formik.values.warehouse}
            onChange={handleFormChangeWarehouse}
            disabled={inputsDisabled}
            className={styles.input}
          />
        </div>

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
        <div className={styles.loader}>
          <BarLoader color="#007bff" loading={isLoading} width="100%" />
        </div>

        <button
          type="button"
          onClick={handleClearInput}
          className={styles.button}
        >
          Очистити
        </button>
      </form>
    </div>
  );
};

export default NovaPoshtaComponent;
