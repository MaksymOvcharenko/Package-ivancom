// import { useState, useEffect } from "react";
// import styles from "./CargoDescriptionSelector.module.css";
// import { fetchCargoDescriptionList } from "./nova-poshta-api";
// import { useSelector } from "react-redux";
// import { selectParcel } from "../../redux/form/formSelectors";
// import { BarLoader } from "react-spinners";

// const CargoDescriptionSelector = ({ onSelect }) => {
//   const parcel = useSelector(selectParcel);
//   const initialDescriptions = parcel.cargoDescription || "";

//   const [inputValue, setInputValue] = useState("");
//   const [cargoDescriptions, setCargoDescriptions] = useState([]);
//   const [filteredCargoDescriptions, setFilteredCargoDescriptions] = useState(
//     []
//   );
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedCargoList, setSelectedCargoList] =
//     useState(initialDescriptions);

//   useEffect(() => {
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
//             hasMore = response.data.length > 0;
//             page++;
//           } else {
//             setError("Помилка завантаження даних");
//             hasMore = false;
//           }
//         }

//         setCargoDescriptions(allDescriptions);
//         setFilteredCargoDescriptions(allDescriptions);
//       } catch (err) {
//         setError("Помилка виконання запиту");
//         console.error("Помилка:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCargoDescriptions();
//   }, []);

//   useEffect(() => {
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
//     if (!selectedCargoList.some((item) => item.Ref === cargoDescription.Ref)) {
//       const updatedList = [...selectedCargoList, cargoDescription];
//       setSelectedCargoList(updatedList);
//       onSelect(updatedList);
//     }
//     setInputValue("");
//   };

//   const handleClear = () => {
//     setSelectedCargoList([]);
//     onSelect([]);
//   };

//   return (
//     <div className={styles.container}>
//       {selectedCargoList.length > 0 && (
//         <div className={styles.selectedCargoList}>
//           <ul className={styles.decrList}>
//             {selectedCargoList.map((cargo) => (
//               <li key={cargo.Ref}>
//                 {cargo.Description} ({cargo.DescriptionRu})
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Введіть щонайменше 3 символи"
//         className={styles.input}
//       />

//       <div className={styles.loader}>
//         <BarLoader color="#007bff" loading={loading} width="100%" />
//       </div>
//       {error && <p className={styles.error}>{error}</p>}

//       {inputValue.length >= 3 && filteredCargoDescriptions.length > 0 && (
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

//       {inputValue.length >= 3 && !filteredCargoDescriptions.length && (
//         <p className={styles.noResults}>Нічого не знайдено</p>
//       )}
//       <button type="button" onClick={handleClear} className={styles.button}>
//         Очистити
//       </button>
//     </div>
//   );
// };

// export default CargoDescriptionSelector;
import { useState, useEffect } from "react";
import styles from "./CargoDescriptionSelector.module.css";
import { fetchCargoDescriptionList } from "./nova-poshta-api";
import { useSelector } from "react-redux";
import { selectParcel } from "../../redux/form/formSelectors";
import { BarLoader } from "react-spinners";
import icons from "../../image/icons.svg";

const CargoDescriptionSelector = ({ onSelect }) => {
  // Отримання parcel зі стейту з перевіркою
  const parcel = useSelector(selectParcel) || {};
  const initialDescriptions = parcel.cargoDescription || []; // Порожній масив, якщо даних немає

  const [inputValue, setInputValue] = useState("");
  const [cargoDescriptions, setCargoDescriptions] = useState([]);
  const [filteredCargoDescriptions, setFilteredCargoDescriptions] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCargoList, setSelectedCargoList] =
    useState(initialDescriptions);

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
            setError("Помилка завантаження даних");
            hasMore = false;
          }
        }

        setCargoDescriptions(allDescriptions);
        setFilteredCargoDescriptions(allDescriptions);
      } catch (err) {
        setError("Помилка виконання запиту");
        console.error("Помилка:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCargoDescriptions();
  }, []);

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

  const handleSelect = (cargoDescription) => {
    if (!selectedCargoList.some((item) => item.Ref === cargoDescription.Ref)) {
      const updatedList = [...selectedCargoList, cargoDescription];
      setSelectedCargoList(updatedList);
      onSelect(updatedList);
    }
    setInputValue("");
  };

  const handleClear = () => {
    setSelectedCargoList([]);
    onSelect([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.divLabel}>
        <label className={styles.label}>Опис вмісту:</label>
        <button
          type="button"
          onClick={handleClear}
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
      </div>
      {selectedCargoList.length > 0 && (
        <div className={styles.selectedCargoList}>
          <ul className={styles.decrList}>
            {selectedCargoList.map((cargo) => (
              <li key={cargo.Ref}>
                {cargo.Description} ({cargo.DescriptionRu})
              </li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введіть мін. 3 символи (наприклад: Побутові речі) та виберіть з випадаючого списку"
        className={styles.input}
      />

      <div className={styles.loader}>
        <BarLoader color="#007bff" loading={loading} width="100%" />
      </div>
      {error && <p className={styles.error}>{error}</p>}

      {inputValue.length >= 3 && filteredCargoDescriptions.length > 0 && (
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

      {inputValue.length >= 3 && !filteredCargoDescriptions.length && (
        <p className={styles.noResults}>Не знайшли свій опис? Вкажіть &quot;Інше&quot;</p>
      )}
    </div>
  );
};

export default CargoDescriptionSelector;
