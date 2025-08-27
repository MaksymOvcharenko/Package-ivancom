// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import styles from "./CompletedPayment.module.css";
// import  '../../fonts/Roboto-Light-normal.js';  // Тут шрифт має бути у форматі base64 або шлях до JS файлу, який його підключає

// const CompletedPayment = () => {
//   const [searchParams] = useSearchParams();
//   const shipmentId = searchParams.get("id");
//   const [shipmentData, setShipmentData] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!shipmentId) {
//       setError("ID відправлення не знайдено у параметрах запиту.");
//       return;
//     }

//     const fetchShipmentData = async () => {
//       try {
//         const response = await fetch(
//           `https://ivancom-server.onrender.com/shipments/${shipmentId}`
//         );
//         const data = await response.json();
//         if (data.success) {
//           setShipmentData(data.data);
//         } else {
//           setError("Виникла помилка при завантаженні даних.");
//         }
//       } catch (err) {
//         setError("Не вдалося завантажити дані. Спробуйте пізніше.");
//       }
//     };

//     fetchShipmentData();
//   }, [shipmentId]);

//   const downloadPDF = () => {
//     if (!shipmentData) return;

//     const { shipment, sender, recipient } = shipmentData;
//     const doc = new jsPDF();

//     // Додавання шрифта у віртуальну файлову систему
//     doc.setFont("Roboto-Light");  // Вказуємо шрифт, який ми додали через файл

//     // Заголовок
//     doc.setFontSize(18);
//     doc.text("Підтвердження відправлення", 10, 10);

//     // Текст повідомлення
//     doc.setFontSize(12);
//     doc.text("Дякуємо, що скористалися нашими послугами!", 10, 20);

//     // Інформація про відправлення
//     doc.setFontSize(14);
//     doc.text("Деталі відправлення:", 10, 30);
//     doc.setFontSize(12);
//     doc.text(`Код InPost: ${shipment.inpost_code || "Немає даних"}`, 10, 40);
//     doc.text(
//       `ТТН Нова Пошта: ${shipment.np_tracking_number || "Немає даних"}`,
//       10,
//       50
//     );

//     // Відправник
//     doc.setFontSize(14);
//     doc.text("Відправник:", 10, 60);
//     doc.setFontSize(12);
//     doc.text(`${sender.last_name} ${sender.first_name}`, 10, 70);
//     doc.text(`Телефон: ${sender.phone}`, 10, 80);
//     doc.text(`Email: ${sender.email}`, 10, 90);

//     // Отримувач
//     doc.setFontSize(14);
//     doc.text("Отримувач:", 10, 100);
//     doc.setFontSize(12);
//     doc.text(`${recipient.last_name} ${recipient.first_name}`, 10, 110);
//     doc.text(`Телефон: ${recipient.phone}`, 10, 120);
//     doc.text(`Email: ${recipient.email}`, 10, 130);

//     // Завантаження PDF
//     doc.save(`confirmation-${shipmentId}.pdf`);
//   };

//   if (error) {
//     return <div className={styles.error}>{error}</div>;
//   }

//   if (!shipmentData) {
//     return <div className={styles.loading}>Завантаження...</div>;
//   }

//   const { shipment, recipient, sender } = shipmentData;

//   return (
//     <div className={styles.confirmation}>
//       <h1>Підтвердження відправлення</h1>
//       <p>Дякуємо, що скористалися нашими послугами!</p>
//       <div className={styles.shipmentDetails}>
//         <h2>Деталі відправлення:</h2>
//         <p><strong>Код InPost:</strong> {shipment.inpost_code || "Немає даних"}</p>
//         <p><strong>ТТН Нова Пошта:</strong> {shipment.np_tracking_number || "Немає даних"}</p>
//         <h2>Відправник:</h2>
//         <p>
//           {sender.last_name} {sender.first_name} <br />
//           Телефон: {sender.phone} <br />
//           Email: {sender.email}
//         </p>
//         <h2>Отримувач:</h2>
//         <p>
//           {recipient.last_name} {recipient.first_name} <br />
//           Телефон: {recipient.phone} <br />
//           Email: {recipient.email}
//         </p>
//       </div>
//       <button className={styles.downloadButton} onClick={downloadPDF}>
//         Завантажити PDF
//       </button>
//     </div>
//   );
// };

// export default CompletedPayment;
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import styles from "./CompletedPayment.module.css";
import "../../fonts/Roboto-Light-normal.js";

const CompletedPayment = () => {
  const [searchParams] = useSearchParams();
  const shipmentId = searchParams.get("id");
  const [shipmentData, setShipmentData] = useState(null);
  const [error, setError] = useState("");
  const [paymentFailed, setPaymentFailed] = useState(false);

  useEffect(() => {
    if (!shipmentId) {
      setError("ID відправлення не знайдено у параметрах запиту.");
      return;
    }

    const fetchShipmentData = async () => {
      try {
        const response = await fetch(
          `https://ivancom-server.onrender.com/shipments/${shipmentId}`
        );
        const data = await response.json();
        if (data) {
          console.log(data);
          // тут перевіряємо payment.status
          if (data.data.payment && data.data.payment.status === "false") {
            console.log("ok");

            setPaymentFailed(true);
          }
          setShipmentData(data.data);
        } else {
          setError("Виникла помилка при завантаженні даних.");
        }
      } catch (err) {
        setError("Не вдалося завантажити дані. Спробуйте пізніше.");
      }
    };

    fetchShipmentData();
  }, [shipmentId]);

  const downloadPDF = () => {
    if (!shipmentData) return;

    const { shipment, sender, recipient } = shipmentData;
    const doc = new jsPDF();
    doc.setFont("Roboto-Light");

    doc.setFontSize(18);
    doc.text("Підтвердження відправлення", 10, 10);

    doc.setFontSize(12);
    doc.text("Дякуємо, що скористалися нашими послугами!", 10, 20);

    doc.setFontSize(14);
    doc.text("Деталі відправлення:", 10, 30);
    doc.setFontSize(12);
    doc.text(`Код InPost: ${shipment.inpost_code || "Немає даних"}`, 10, 40);
    doc.text(
      `ТТН Нова Пошта: ${shipment.np_tracking_number || "Немає даних"}`,
      10,
      50
    );

    doc.setFontSize(14);
    doc.text("Відправник:", 10, 60);
    doc.setFontSize(12);
    doc.text(`${sender.last_name} ${sender.first_name}`, 10, 70);
    doc.text(`Телефон: ${sender.phone}`, 10, 80);
    doc.text(`Email: ${sender.email}`, 10, 90);

    doc.setFontSize(14);
    doc.text("Отримувач:", 10, 100);
    doc.setFontSize(12);
    doc.text(`${recipient.last_name} ${recipient.first_name}`, 10, 110);
    doc.text(`Телефон: ${recipient.phone}`, 10, 120);
    doc.text(`Email: ${recipient.email}`, 10, 130);

    doc.save(`confirmation-${shipmentId}.pdf`);
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!shipmentData) {
    return <div className={styles.loading}>Завантаження...</div>;
  }

  if (paymentFailed) {
    return (
      <div className={styles.confirmation}>
        <div className={styles.error}>
          Вибачте, але оплата не пройшла успішно. Спробуйте ще раз.
        </div>
      </div>
    );
  }

  const { shipment, recipient, sender } = shipmentData;

  return (
    <div className={styles.confirmation}>
      <h1>Підтвердження відправлення</h1>
      <p>Дякуємо, що скористалися нашими послугами!</p>
      <div className={styles.shipmentDetails}>
        <h2>Деталі відправлення:</h2>
        <p>
          <strong>Код InPost:</strong> {shipment.inpost_code || "Немає даних"}
        </p>
        <p>
          <strong>ТТН Нова Пошта:</strong>{" "}
          {shipment.np_tracking_number || "Немає даних"}
        </p>
        <h2>Відправник:</h2>
        <p>
          {sender.last_name} {sender.first_name} <br />
          Телефон: {sender.phone} <br />
          Email: {sender.email}
        </p>
        <h2>Отримувач:</h2>
        <p>
          {recipient.last_name} {recipient.first_name} <br />
          Телефон: {recipient.phone} <br />
          Email: {recipient.email}
        </p>
      </div>
      <button className={styles.downloadButton} onClick={downloadPDF}>
        Завантажити PDF
      </button>
    </div>
  );
};

export default CompletedPayment;
