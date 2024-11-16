import { useState, useEffect } from "react";
import { fetchCargoTypes } from "./nova-poshta-api";

const CargoTypeSelector = () => {
  const [inputValue, setInputValue] = useState("");
  const [cargoTypes, setCargoTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Если введено 3 и более символов, выполняем запрос
    if (inputValue.length >= 3) {
      setLoading(true);
      fetchCargoTypes()
        .then((data) => {
          if (data.success) {
            setCargoTypes(data.data);
          } else {
            setError("Ошибка при получении данных");
          }
        })
        .catch((error) => {
          setError("Ошибка при выполнении запроса");
          console.error("Ошибка:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Очищаем список, если введено менее 3 символов
      setCargoTypes([]);
    }
  }, [inputValue]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите минимум 3 символа"
      />
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      <ul>
        {cargoTypes.map((cargoType) => (
          <li key={cargoType.Ref}>{cargoType.Description}</li>
        ))}
      </ul>
    </div>
  );
};

export default CargoTypeSelector;
