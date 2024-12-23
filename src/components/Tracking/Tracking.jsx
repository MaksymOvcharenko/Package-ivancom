// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import styles from "./Tracking.module.css";
// import { getPackageInfo } from "../../services/getPackageInfo.js";
// import { fetchInPostData } from "../../services/getTrackInpost.js";
// import { getStatusDocument } from "../../services/getNovaPoshtaStatus.js";

// const Tracking = () => {
//   const [searchParams] = useSearchParams();
//   const [trackingInfo, setTrackingInfo] = useState(null);
//   const [status, setStatus] = useState({ inpost: null, novaPoshta: "send" });
//   const [error, setError] = useState(null);
//   const [trackInpost, setTrackInpost] = useState(null);
//   const packageId = searchParams.get("id");

//   useEffect(() => {
//     if (!packageId) {
//       setError("Посилка не знайдена. Невірний ID.");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         // Получаем информацию о посылке с вашего сервера
//         const packageData = await getPackageInfo(packageId);
//         setTrackingInfo(packageData);
//         await console.log(trackingInfo);
//         const inpostCode = packageData.data.shipment.inpost_code;

//         // Запрос на InPost API
//         const inpostStatus = await fetchInPostData(inpostCode);
//         setStatus((prev) => ({ ...prev, inpost: inpostStatus.status }));
//         setTrackInpost(inpostStatus.track);
//         const npCode = packageData.data.shipment.np_tracking_number;
//         // // Запрос на Новую Почту API
//         const novaPoshtaStatus = await getStatusDocument(npCode);

//         setStatus((prev) => ({
//           ...prev,
//           novaPoshta: novaPoshtaStatus.data[0]?.Status || "Помилка",
//         }));
//       } catch (err) {
//         setError("Сталася помилка при отриманні даних. Спробуйте пізніше.");
//       }
//     };

//     fetchData();
//   }, [packageId]);

//   if (error) {
//     return <div className={styles.error}>{error}</div>;
//   }

//   if (!trackingInfo || !status.inpost || !status.novaPoshta) {
//     return <div className={styles.loading}>Завантаження...</div>;
//   }
//   const renderTrackingStatus = () => {
//     if (status.inpost === "CustomerSent") {
//       return "Посилка прямує до відділення Ivancom.";
//     } else if (status.inpost === "CustomerStored") {
//       return "Ви ще не надали посилку в Поштомат.";
//     } else if (status.inpost === "CustomerDelivering") {
//       return "Посилка прямує до відділення Ivancom.";
//     } else if (status.inpost === "NotSend") {
//       return "Ви ще не надали посилку в Поштомат.";
//     } else if (status.inpost === "Delivered") {
//       return "Посилка вже прийнята у відділенні Ivancom, та прямує Україну.";
//     } else if (
//       status.novaPoshta ===
//       "Відправник самостійно створив цю накладну, але ще не надав до відправки"
//     ) {
//       return "Посилка вже прийнята у відділенні Ivancom, та прямує Україну.";
//     } else if (status.novaPoshta) {
//       return `${status.novaPoshta}`;
//     }
//     return "Статус посилки невідомий.";
//   };
//   console.log(status);

//   return (
//     <div className={styles.trackingContainer}>
//       <h1>Трекинг посилки</h1>
//       <div className={styles.infoBlock}>
//         <p>
//           <strong>Інформація про посилку:</strong>
//         </p>
//         <p>Одержувач: {trackingInfo.recipient}</p>
//         <p>Адреса: {trackingInfo.address}</p>
//         <p>Трек номер InPost: {trackInpost}</p>
//         <p>TTN Нової Пошти: {trackingInfo.data.shipment.np_tracking_number}</p>
//       </div>

//       <div className={styles.statusBlock}>
//         <h2>Статус посилки:</h2>
//         <p>{renderTrackingStatus()}</p>
//       </div>
//     </div>
//   );
// };

// // // Эти функции будут импортированы из ваших модулей
// // async function getPackageInfo(id) {
// //   // Запрос к вашему серверу для получения данных посылки
// //   // Пример ответа: { recipient: 'Іван Іванов', address: 'Київ, вул. Хрещатик, 1', inpostCode: '123456', ttn: '2040000000001' }
// //   return fetch(`/api/package/${id}`).then((res) => res.json());
// // }

// // async function getInPostStatus(code) {
// //   // Запрос к API InPost, который возвращает XML
// //   const response = await fetch(`/api/inpost/${code}`);
// //   const text = await response.text();
// //   const parser = new DOMParser();
// //   const xml = parser.parseFromString(text, "text/xml");
// //   return xml.querySelector("status")?.textContent || "невідомий";
// // }

// // async function getNovaPoshtaStatus(ttn) {
// //   // Запрос к API Новой Почты, который возвращает JSON
// //   return fetch(`/api/novaposhta/${ttn}`)
// //     .then((res) => res.json())
// //     .then((data) => data.status || "невідомий");
// // }

// export default Tracking;
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import styles from "./Tracking.module.css";
// import { getPackageInfo } from "../../services/getPackageInfo.js";
// import { fetchInPostData } from "../../services/getTrackInpost.js";
// import { getStatusDocument } from "../../services/getNovaPoshtaStatus.js";

// // Іконки
// import { FaTruck, FaCheckCircle, FaBox, FaMapMarkerAlt } from "react-icons/fa";

// const Tracking = () => {
//   const [searchParams] = useSearchParams();
//   const [trackingInfo, setTrackingInfo] = useState(null);
//   const [status, setStatus] = useState([]);
//   const [error, setError] = useState(null);
//   const [trackInpost, setTrackInpost] = useState(null);
//   const packageId = searchParams.get("id");

//   useEffect(() => {
//     if (!packageId) {
//       setError("Посилка не знайдена. Невірний ID.");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const packageData = await getPackageInfo(packageId);
//         setTrackingInfo(packageData);
//         const inpostCode = packageData.data.shipment.inpost_code;

//         console.log("InPost Code: ", inpostCode); // Лог для перевірки

//         // Запит на InPost API
//         const inpostStatus = await fetchInPostData(inpostCode);
//         setTrackInpost(inpostStatus.track);

//         console.log("InPost Status: ", inpostStatus.status); // Лог для перевірки статусу InPost

//         // Запит на Нову Пошту API
//         const npCode = packageData.data.shipment.np_tracking_number;
//         const novaPoshtaStatus = await getStatusDocument(npCode);
//         const statusFromNP = novaPoshtaStatus.data[0]?.Status || "Помилка";

//         console.log("Nova Poshta Status: ", statusFromNP); // Лог для перевірки статусу Нової Пошти

//         // Динамічно додаємо статуси
//         let newStatuses = [];
//         if (inpostStatus.status === "NotSend") {
//           newStatuses.push({
//             text: "Очікує наддання в Поштомат",
//             icon: <FaBox />,
//           });
//         }
//         if (inpostStatus.status === "CustomerSent") {
//           // Статуси InPost
//           newStatuses.push({
//             text: "Прийнята в поштоматі",
//             icon: <FaCheckCircle />,
//           });
//         } else if (inpostStatus.status === "CustomerDelivering") {
//           newStatuses.push({
//             text: "Прийнята в поштоматі",
//             icon: <FaCheckCircle />,
//           });
//           newStatuses.push({
//             text: "В процесі доcтавки до Ivancom",
//             icon: <FaTruck />,
//           });
//         } else if (inpostStatus.status === "Delivered") {
//           newStatuses.push({
//             text: "Прийнята в поштоматі",
//             icon: <FaCheckCircle />,
//           });
//           newStatuses.push({
//             text: "В процесі дотавки до Ivancom",
//             icon: <FaCheckCircle />,
//           });
//           newStatuses.push({
//             text: "Прийнята у Відділенні Ivancom",
//             icon: <FaCheckCircle />,
//           });
//         }

//         // Статуси Нової Пошти
//         if (
//           statusFromNP ===
//             "Відправник самостійно створив цю накладну, але ще не надав до відправки" &&
//           inpostStatus.status === "Delivered"
//         ) {
//           newStatuses.push({
//             text: "Прямує в Україну",
//             icon: <FaCheckCircle />,
//           });
//         } else if (
//           statusFromNP !==
//           "Відправник самостійно створив цю накладну, але ще не надав до відправки"
//         ) {
//           newStatuses.push({
//             text: "Прямує в Україну",
//             icon: <FaCheckCircle />,
//           });
//           newStatuses.push({
//             text: statusFromNP,
//             icon: <FaTruck />,
//           });
//         } else if (statusFromNP === "Відправлення отримано") {
//           newStatuses.push({
//             text: statusFromNP,
//             icon: <FaCheckCircle />,
//           });
//         }

//         // Лог для фінального статусу InPost

//         console.log("New Statuses: ", newStatuses); // Лог для перевірки

//         // Накопичуємо статуси
//         setStatus((prevStatuses) => [...prevStatuses, ...newStatuses]);
//       } catch (err) {
//         setError("Сталася помилка при отриманні даних. Спробуйте пізніше.");
//         console.error("Error fetching data:", err); // Лог для перевірки
//       }
//     };

//     fetchData();
//   }, [packageId]);

//   if (error) {
//     return <div className={styles.error}>{error}</div>;
//   }

//   if (!trackingInfo) {
//     return <div className={styles.loading}>Завантаження...</div>;
//   }

//   const renderTrackingStatus = () => {
//     if (status.length === 0) {
//       return <div>Статуси ще не доступні.</div>;
//     }
//     return status.map((step, index) => (
//       <div className={styles.step} key={index}>
//         {step.icon} {step.text}
//       </div>
//     ));
//   };

//   return (
//     <div className={styles.trackingContainer}>
//       <h1>Відстеження посилки</h1>
//       <div className={styles.infoBlock}>
//         <p>
//           <strong>Інформація про посилку:</strong>
//         </p>
//         {/* Виведення отримувача */}
//         <p>
//           <strong>Одержувач:</strong> {trackingInfo.data.recipient.first_name}{" "}
//           {trackingInfo.data.recipient.last_name}
//         </p>
//         {/* Виведення адреси отримувача */}
//         <p>
//           <strong>Адреса:</strong> {trackingInfo.data.recipientAddress.street}{" "}
//           {trackingInfo.data.recipientAddress.building_number},{" "}
//           {trackingInfo.data.recipientAddress.city},{" "}
//           {trackingInfo.data.recipientAddress.country}
//         </p>
//         <p>Трек номер InPost: {trackInpost}</p>
//         <p>TTN Нової Пошти: {trackingInfo.data.shipment.np_tracking_number}</p>
//       </div>

//       <div className={styles.statusBlock}>
//         <h2>Статус посилки:</h2>
//         <div className={styles.statusSteps}>{renderTrackingStatus()}</div>
//       </div>
//     </div>
//   );
// };

// export default Tracking;
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Tracking.module.css";
import { getPackageInfo } from "../../services/getPackageInfo.js";
import { fetchInPostData } from "../../services/getTrackInpost.js";
import { getStatusDocument } from "../../services/getNovaPoshtaStatus.js";

// Іконки
import { FaTruck, FaCheckCircle, FaBox, FaMapMarkerAlt } from "react-icons/fa";

const Tracking = () => {
  const [searchParams] = useSearchParams();
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [status, setStatus] = useState([]);
  const [error, setError] = useState(null);
  const [trackInpost, setTrackInpost] = useState(null);
  const packageId = searchParams.get("id");

  useEffect(() => {
    if (!packageId) {
      setError("Посилка не знайдена. Невірний ID.");
      return;
    }

    const fetchData = async () => {
      try {
        const packageData = await getPackageInfo(packageId);
        setTrackingInfo(packageData);
        const inpostCode = packageData.data.shipment.inpost_code;

        console.log("InPost Code: ", inpostCode); // Лог для перевірки

        // Запит на InPost API
        const inpostStatus = await fetchInPostData(inpostCode);
        setTrackInpost(inpostStatus.track);

        console.log("InPost Status: ", inpostStatus.status); // Лог для перевірки статусу InPost

        // Запит на Нову Пошту API
        const npCode = packageData.data.shipment.np_tracking_number;
        const novaPoshtaStatus = await getStatusDocument(npCode);
        const statusFromNP = novaPoshtaStatus.data[0]?.Status || "Помилка";

        console.log("Nova Poshta Status: ", statusFromNP); // Лог для перевірки статусу Нової Пошти

        // Динамічно додаємо статуси
        let newStatuses = [];
        if (inpostStatus.status === "NotSend") {
          newStatuses.push({
            text: "Очікує наддання в Поштомат",
            icon: <FaBox />,
          });
        }
        if (inpostStatus.status === "CustomerSent") {
          // Статуси InPost
          newStatuses.push({
            text: "Прийнята в поштоматі",
            icon: <FaCheckCircle />,
          });
        } else if (inpostStatus.status === "CustomerDelivering") {
          newStatuses.push({
            text: "Прийнята в поштоматі",
            icon: <FaCheckCircle />,
          });
          newStatuses.push({
            text: "В процесі доcтавки до Ivancom",
            icon: <FaTruck />,
          });
        } else if (inpostStatus.status === "Delivered") {
          newStatuses.push({
            text: "Прийнята в поштоматі",
            icon: <FaCheckCircle />,
          });
          newStatuses.push({
            text: "В процесі дотавки до Ivancom",
            icon: <FaCheckCircle />,
          });
          newStatuses.push({
            text: "Прийнята у Відділенні Ivancom",
            icon: <FaCheckCircle />,
          });
        }

        // Статуси Нової Пошти
        if (
          statusFromNP ===
            "Відправник самостійно створив цю накладну, але ще не надав до відправки" &&
          inpostStatus.status === "Delivered"
        ) {
          newStatuses.push({
            text: "Прямує в Україну",
            icon: <FaCheckCircle />,
          });
        } else if (
          statusFromNP !==
          "Відправник самостійно створив цю накладну, але ще не надав до відправки"
        ) {
          newStatuses.push({
            text: "Прямує в Україну",
            icon: <FaCheckCircle />,
          });
          newStatuses.push({
            text: statusFromNP,
            icon: <FaTruck />,
          });
        } else if (statusFromNP === "Відправлення отримано") {
          newStatuses.push({
            text: statusFromNP,
            icon: <FaCheckCircle />,
          });
        }

        // Лог для фінального статусу InPost

        console.log("New Statuses: ", newStatuses); // Лог для перевірки

        // Накопичуємо статуси
        setStatus((prevStatuses) => [...prevStatuses, ...newStatuses]);
      } catch (err) {
        setError("Сталася помилка при отриманні даних. Спробуйте пізніше.");
        console.error("Error fetching data:", err); // Лог для перевірки
      }
    };

    fetchData();
  }, [packageId]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!trackingInfo) {
    return <div className={styles.loading}>Завантаження...</div>;
  }

  // Виведення адреси або відділення
  const getAddressOrBranch = () => {
    const recipientAddress = trackingInfo.data.recipientAddress;
    if (recipientAddress.np_branch) {
      return ` ${recipientAddress.np_branch}`;
    } else {
      return `Адреса: ${recipientAddress.street} ${recipientAddress.building_number}, ${recipientAddress.city}, ${recipientAddress.country}`;
    }
  };

  const renderTrackingStatus = () => {
    if (status.length === 0) {
      return <div>Статуси ще не доступні.</div>;
    }
    return status.map((step, index) => (
      <div className={styles.step} key={index}>
        {step.icon} {step.text}
      </div>
    ));
  };

  return (
    <div className={styles.trackingContainer}>
      <div className={styles.borderCont}>
        <h1>Відстеження посилки</h1>
        <div className={styles.infoBlock}>
          <h2>
            <strong>Інформація про посилку:</strong>
          </h2>
          <p>
            <span>Одержувач:</span> {trackingInfo.data.recipient.first_name}{" "}
            {trackingInfo.data.recipient.last_name}
          </p>
          <p>
            <span>Доставка:</span> {getAddressOrBranch()}
          </p>
          <p>
            <span>Трек № InPost:</span> {trackInpost}
          </p>
          <p>
            <span>TTН Нової Пошти:</span>{" "}
            {trackingInfo.data.shipment.np_tracking_number}
          </p>
        </div>

        <div className={styles.statusBlock}>
          <h2>Статус посилки:</h2>
          <div className={styles.statusSteps}>{renderTrackingStatus()}</div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
