// import { useState, useEffect } from "react";
// import { GoogleSpreadsheet } from "google-spreadsheet";

// // Дані для підключення (замініть на ваші)
// const SHEET_ID = "1p2m70yTnaGpTT82Si45PY64e8ij8IqZAZj4joVxkSWw"; // ID вашої таблиці
// // const CLIENT_EMAIL = "testform@coral-pipe-428209-d0.iam.gserviceaccount.com"; // З JSON
// // const PRIVATE_KEY =
// //   "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCnejQDAejSAEf1\nttLLsLXPNrw+9s2k2M+iQVfh/4xrklH+PCov6fj/jXm53Zje05Ti0hjN+LMLvJC2\nUPcj79f5V6+bEwjybQHOF6RvxtEKGU3+gF86Q+ciMZVrLW95jnvx6uahiLBTiJKf\n9HQZYzsWC37rWjVH8c5TcJ94Y2l9CsnbbniIEJFPF269sm+bJ7e9a3GTadsf1Alm\n0mp4KILJi3MrULNaYlFo2wdSHak23XdJG0luNg0YJHGcHDoH0R38rifKDN/R8ynB\nc8vW+9Yq30iiIOwRlPe1Slk5vz+RzCsirrerFPMpU4fD2TmlJXttTzdtOXvj6uRY\nPu5fE4YrAgMBAAECggEAA+9zNJ5o5DMjie2iTePn5roZm0yt+P9DtoZ1KyH5V4OR\nXvMzyGKu6vWa+M7k9GSbqyO7IjIuIATJRym8skbvfHouBjTCUrRgyu6/htSVXwr5\nUi22SQmRe2sXkW5gMl8N9gRHNC9p2zASG6t8lg3xg7SMu9GPVM+ewbTw2foJ8crC\nk9DXnG3cJV9UVw7ZGgy+rfn2GV8Ostcye1NhW0O4tkE+npGxJu/nd2i9pF8IwPs5\n1JByJ/uRIK2zAG3mFMEbhlo09w+DlwqzisapmB6TrdC7K7oBFBFIKsS0npxtcpT+\nhlqFC/QUKDLpPhOdg08pVYWoSS9NJFaIQ4BYb8ijlQKBgQDZwQpL/X44DeqqeVtm\nIaUKoyUdXs5ARnHkEpF+/iCGELw0gllxw70xR91Cim8VqcX9+nn59DPlrTUf4Gvh\nUtjYrgcuKKu0+S9ned4+mbh3PH+Thr36efm5XZDKlf9/gd0DnzkGRZTRYt3NxjaO\nNKQjILg67NYUZ2Cke3VA8nSGTwKBgQDE5I1QVgCVH9c06y+uApwUgymJpo16n8m2\nf0OzIVG7lb6vgY9CJhj+D8l4jcxmImYnnPXugF4SfpVeCXrygmsfEE+LnNfb2/9Y\nOoMzQS9QQMNLES1ql6lLh8K3AJKDKKZWQlbSPJDUB4i2AdCije6Hy+J8T+Jdyjn/\n8WUUQnOnZQKBgDnjzyf6oWanlH5zuu/A/A6C5ugS/0QpNjgLE7EuQFlD87UF/l93\nSUHjuBfrk7Kvqtplj6361R03Wgs6b5O8obehNHl6CIQZRxf8VzBPT7IrXENNLA5+\nBPzZuheRnxY34RkIaHGZaAHuhcch7fkKV6SbGz9XHWbZQOEZjUeR7ZaTAoGAPBtl\nxJusq9m/kikmMiIb0etEt///euri4nKxkTLfx7tsLhoISPJmeNEK+WGYf6mKtBcn\nwPqxPUYlhUKxpO0JlL8e+YkVIMplhmK+gNwqfH544CbLTZolFajJWaK0F5RGS1kP\nNjlFIWV3Z9DgB2/63LvyVW7xtR4yXJ8t82Rh+D0CgYApiF/QAnAc28oHh2gXsHyu\naTu4LyvQtT2juvp59uSH5ONxW/fNNxBGUBtsX0PXCdnqzzq2abmP2QrPvvUMSSDs\nDQ2nR3iNvKb9kk+oqjVLv4oqnfEGoj94gUMiHsNlA8re3hN2nezBkIkaKiUlYmby\niH9M/NtLIyZhPKgVkkExyA==\n-----END PRIVATE KEY-----\n";

// const GoogleSheetTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Функція для завантаження даних із Google Sheets
//   const fetchSheetData = async () => {
//     try {
//       setLoading(true);

//       // Ініціалізація Google Spreadsheet
//       //   const doc = new GoogleSpreadsheet(SHEET_ID);
//       const doc = new GoogleSpreadsheet(SHEET_ID, {
//         apiKey: "AIzaSyA8O2ZUFLnKacj29gMEusdjcPm1NuDMwrQ",
//       });
//       // Аутентифікація через новий метод для Google Sheets API v4

//       // Завантаження інформації про таблицю
//       await doc.loadInfo();

//       // Вибір першого листа (Worksheet)
//       const sheet = doc.sheetsByIndex[0];

//       // Завантаження рядків
//       const rows = await sheet.getRows();

//       // Збереження даних у стейт
//       setData(rows.map((row) => row._rawData));
//     } catch (err) {
//       setError("Не вдалося завантажити дані");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSheetData();
//   }, []);

//   if (loading) return <p>Завантаження...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>Дані з Google Sheets</h2>
//       <table border="1">
//         <thead>
//           <tr>
//             {/* Динамічне створення заголовків */}
//             {data.length > 0 &&
//               data[0].map((_, index) => (
//                 <th key={index}>Колонка {index + 1}</th>
//               ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {row.map((cell, cellIndex) => (
//                 <td key={cellIndex}>{cell || "—"}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GoogleSheetTable;
