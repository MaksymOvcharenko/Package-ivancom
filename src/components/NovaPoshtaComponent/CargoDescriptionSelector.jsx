// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// // Импорт функции из вашего файла с API
// import styles from "./CargoDescriptionSelector.module.css"; // Импорт CSS-модуля
// import { fetchCargoDescriptionList } from "./nova-poshta-api";

// const CargoDescriptionSelector = ({ onSelect }) => {
//   const [inputValue, setInputValue] = useState("");
//   const [cargoDescriptions, setCargoDescriptions] = useState([]);
//   const [filteredCargoDescriptions, setFilteredCargoDescriptions] = useState(
//     []
//   );
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedCargoList, setSelectedCargoList] = useState([]); // Состояние для списка выбранных описаний

//   useEffect(() => {
//     // Загрузка всех страниц данных при первом рендере
//     const loadCargoDescriptions = async () => {
//       setLoading(true);
//       try {
//         let allDescriptions = [];
//         let page = 1;
//         let hasMore = true;

//         while (hasMore) {
//           const response = await fetchCargoDescriptionList("", page.toString());
//           if (response.success) {
//             allDescriptions = [...allDescriptions, ...response.data];
//             hasMore = response.data.length > 0; // Если на странице есть данные, продолжаем
//             page++;
//           } else {
//             setError("Ошибка при получении данных");
//             hasMore = false;
//           }
//         }

//         setCargoDescriptions(allDescriptions);
//         setFilteredCargoDescriptions(allDescriptions);
//       } catch (error) {
//         setError("Ошибка при выполнении запроса");
//         console.error("Ошибка:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCargoDescriptions();
//   }, []);

//   useEffect(() => {
//     // Фильтрация данных при изменении ввода
//     if (inputValue.length >= 3) {
//       const filtered = cargoDescriptions.filter(
//         (cargoDescription) =>
//           cargoDescription.Description.toLowerCase().includes(
//             inputValue.toLowerCase()
//           ) ||
//           cargoDescription.DescriptionRu.toLowerCase().includes(
//             inputValue.toLowerCase()
//           )
//       );
//       setFilteredCargoDescriptions(filtered);
//     } else {
//       setFilteredCargoDescriptions([]);
//     }
//   }, [inputValue, cargoDescriptions]);

//   const handleSelect = (cargoDescription) => {
//     setSelectedCargoList((prevList) => {
//       // Добавляем новый элемент в список выбранных
//       const isAlreadySelected = prevList.some(
//         (item) => item.Ref === cargoDescription.Ref
//       );
//       if (isAlreadySelected) {
//         return prevList; // Если уже выбран, не добавляем снова
//       } else {
//         return [...prevList, cargoDescription];
//       }
//     });
//     // console.log(selectedCargoList);
//     // const cargotypes = selectedCargoList.map((e) => e.Ref);
//     // console.log(cargotypes);
//     onSelect(selectedCargoList);
//     console.log(selectedCargoList);
//     // Передаем данные в родительский компонент
//     setInputValue(""); // Очищаем поле ввода после выбора
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.selectedCargoList}>
//         {selectedCargoList.length > 0 ? (
//           <ul>
//             {selectedCargoList.map((cargo) => (
//               <li key={cargo.Ref}>
//                 {cargo.Description} ({cargo.DescriptionRu})
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Введіть опис відправлення</p>
//         )}
//       </div>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Введите минимум 3 символа"
//         className={styles.input}
//       />
//       {loading && <p className={styles.loading}>Загрузка...</p>}
//       {error && <p className={styles.error}>{error}</p>}
//       {inputValue.length >= 3 && (
//         <ul className={styles.list}>
//           {filteredCargoDescriptions.map((cargoDescription) => (
//             <li
//               key={cargoDescription.Ref}
//               onClick={() => handleSelect(cargoDescription)}
//               className={styles.listItem}
//             >
//               {cargoDescription.Description} ({cargoDescription.DescriptionRu})
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CargoDescriptionSelector;
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./CargoDescriptionSelector.module.css"; // Импорт CSS-модуля
import { fetchCargoDescriptionList } from "./nova-poshta-api";

const CargoDescriptionSelector = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [cargoDescriptions, setCargoDescriptions] = useState([]);
  const [filteredCargoDescriptions, setFilteredCargoDescriptions] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCargoList, setSelectedCargoList] = useState([]);

  // Загружаем данные с API
  useEffect(() => {
    const loadCargoDescriptions = async () => {
      setLoading(true);
      try {
        let allDescriptions = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetchCargoDescriptionList("", page.toString());
          if (response.success) {
            allDescriptions = [...allDescriptions, ...response.data];
            hasMore = response.data.length > 0;
            page++;
          } else {
            setError("Ошибка при получении данных");
            hasMore = false;
          }
        }

        setCargoDescriptions(allDescriptions);
        setFilteredCargoDescriptions(allDescriptions);
      } catch (err) {
        setError("Ошибка при выполнении запроса");
        console.error("Ошибка:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCargoDescriptions();
  }, []);

  // Фильтрация по введенному значению
  useEffect(() => {
    if (inputValue.length >= 3) {
      const filtered = cargoDescriptions.filter(
        (cargoDescription) =>
          cargoDescription.Description.toLowerCase().includes(
            inputValue.toLowerCase()
          ) ||
          cargoDescription.DescriptionRu.toLowerCase().includes(
            inputValue.toLowerCase()
          )
      );
      setFilteredCargoDescriptions(filtered);
    } else {
      setFilteredCargoDescriptions([]);
    }
  }, [inputValue, cargoDescriptions]);

  // Обработчик выбора элемента
  const handleSelect = (cargoDescription) => {
    const isAlreadySelected = selectedCargoList.some(
      (item) => item.Ref === cargoDescription.Ref
    );

    if (!isAlreadySelected) {
      const updatedList = [...selectedCargoList, cargoDescription];
      setSelectedCargoList(updatedList);
      onSelect(updatedList); // Передаем обновленный список в родительский компонент
    }

    setInputValue(""); // Очищаем поле ввода после выбора
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectedCargoList}>
        {selectedCargoList.length > 0 ? (
          <ul>
            {selectedCargoList.map((cargo) => (
              <li key={cargo.Ref}>
                {cargo.Description} ({cargo.DescriptionRu})
              </li>
            ))}
          </ul>
        ) : (
          <p>Введіть опис відправлення</p>
        )}
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите минимум 3 символа"
        className={styles.input}
      />

      {loading && <p className={styles.loading}>Загрузка...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {inputValue.length >= 3 && (
        <ul className={styles.list}>
          {filteredCargoDescriptions.map((cargoDescription) => (
            <li
              key={cargoDescription.Ref}
              onClick={() => handleSelect(cargoDescription)}
              className={styles.listItem}
            >
              {cargoDescription.Description} ({cargoDescription.DescriptionRu})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CargoDescriptionSelector;
