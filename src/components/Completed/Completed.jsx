// import { useDispatch, useSelector } from 'react-redux';
// import s  from './Completed.module.css'
// import { MdDone } from "react-icons/md";
// import { resetForm } from '../../redux/form/formSlice.js';
// import { useEffect } from 'react';
// import { selectLoading, selectPaymentLink } from '../../redux/form/formSelectors.js';
// import { ClockLoader } from 'react-spinners';
// const Completed = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0); // Прокрутка до самого верху
//   }, []); 
//     const dispatch = useDispatch();
//     const loading = useSelector(selectLoading)
//     const paymentLink = useSelector(selectPaymentLink)
//   console.log(loading);
  
//   return (
//   <>
//       {loading?(<div className={s.loader}><p className={s.loaderTitle}>Зачекайте формується посилання</p><ClockLoader
//   color="#0184d6"
//   loading
//   size={80}
//   speedMultiplier={1}
// /></div>
//     ):(<div className={s.mainCont}>
//           <div className={s.cont}>
//               <div className={s.iconcont}><MdDone size={52} color='#04E628'/></div>
//              <div className={s.textCont}>
//                   <h2 className={s.title}>Дякуємо!</h2>
//                   <div className={s.payment}>
//                     {paymentLink?(<a href={paymentLink}  type="button"  className={s.buttonNext} target='blank'>
//                 Сплатити
//               </a>):(<p className={s.description}>Ваша заявка прийнята в обробку, ми надішлемо посилання для оплати послуг та інструкцію з подальшими діями на електрону пошту.</p>)}</div>
//              </div>
//               <div className={s.buttons}>
//               <button type="button" onClick={()=>dispatch(resetForm())} className={s.buttonBack}>
//                 Оформити ще
//               </button>
//               <a href="https://ivancom.eu/" onClick={()=>dispatch(resetForm())} type="button"  className={s.buttonNext}>
//                 На головну
//               </a>
//             </div>
//           </div>
//       </div>)}
//   </>
//   )
// }

// export default Completed
import { useDispatch, useSelector } from 'react-redux';
import s from './Completed.module.css';
import { MdDone } from "react-icons/md";
import { resetForm, setLoadingData, setPaymentLink } from '../../redux/form/formSlice.js';
import { useEffect, useState } from 'react';
import { selectLoading, selectPaymentLink } from '../../redux/form/formSelectors.js';

import sendShipmentData from '../../services/sendToServer.js';
import { CircularProgressbar } from 'react-circular-progressbar';


const Completed = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const paymentLink = useSelector(selectPaymentLink);
  const [error, setError] = useState(false); // Стан для помилки
  const state = useSelector((state) => state);
  const handleRetry = async () => {
    try {
      dispatch(setLoadingData(true));
      setError(false); // Скидаємо помилку перед новою спробою
      const response = await sendShipmentData(state);
      console.log("zbs");
      
      await dispatch(setPaymentLink(response.data.paymentLink));
    } catch (err) {
      console.error("Помилка при повторному запиті посилання:", err);
      setError(true); // Встановлюємо помилку
    }
    finally {
      // Выключаем индикатор загрузки
      dispatch(setLoadingData(false));
    }
  };
//timer start
const [progress, setProgress] = useState(0);
  const duration = 15000; // 15 секунд

  useEffect(() => {
    const interval = 100;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);
//timer end
  return (
    <>
      {loading ? (
        <div className={s.loader}>
          <p className={s.loaderTitle}>Зачекайте формується посилання</p>
          <div style={{ width: "150px", margin: "0px auto" }}>
    
      <CircularProgressbar
  value={progress}
  text={`${Math.round(progress)}%     `}
  styles={{
    // Налаштування тексту
    text: {
      fill: "#000", // Колір тексту
      fontSize: "18px", // Розмір шрифту
      dominantBaseline: "middle", // Вирівнювання по вертикалі
      textAnchor: "middle", // Вирівнювання по горизонталі
    },
    // Колір прогресу
    path: {
      stroke: `rgba(62, 152, 199, ${progress / 100})`,
      strokeLinecap: "butt",
      transition: "stroke-dashoffset 0.5s ease 0s",
      // transform: "rotate(0.25turn)",
      transformOrigin: "center center",
    },
    // Фонова лінія (trail)
    trail: {
      stroke: "#d6d6d6",
      strokeLinecap: "butt",
      transform: "rotate(0.25turn)",
      transformOrigin: "center center",
    },
  }}
/>
    </div>
         
        </div>
      ) : (
        <div className={s.mainCont}>
          <div className={s.cont}>
            <div className={s.iconcont}>
              <MdDone size={52} color="#04E628" />
            </div>
            <div className={s.textCont}>
              <h2 className={s.title}>Дякуємо!</h2>
              <div className={s.payment}>
                {paymentLink ? (
                  <div className={s.errorLink}>
                  <p className={s.description}>
  Нижче ви знайдете посилання для оплати. <br /> Після завершення платежу, будь ласка, дочекайтесь автоматичного повернення на наш сайт, щоб отримати інформацію про посилку та код надання. <br />Також ви отримаєте деталі на вашу електронну пошту. <br /> <span style={{ fontWeight: 'bold', color: '#d9534f' }}>
  Це дуже важливо, щоб процес був завершений правильно.
  </span>
</p>

                  <a
                    href={paymentLink}
                    type="button"
                    className={s.buttonNext}
                    target="blank"
                  >
                    Сплатити
                  </a>
                 
                </div>
                  
                 
                ) : (
                  <>
                    <div className={s.errorLink}>
                      <p className={s.description}>
                      На жаль, не вдалося згенерувати посилання для оплати. Спробуйте ще раз або, якщо проблема не буде вирішена, ми зв'яжемося з вами для подальших інструкцій. Дякуємо за ваше терпіння.
                      </p>
                      <button
                        type="button"
                        onClick={handleRetry}
                        className={s.buttonRetry}
                      >
                        Спробувати ще
                      </button>
                      {error && (
                        <p className={s.errorText}>
                          Сталася помилка. Спробуйте ще раз пізніше.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={s.buttons}>
              <button
                type="button"
                onClick={() => dispatch(resetForm())}
                className={s.buttonBack}
              >
                Оформити ще
              </button>
              <a
                href="https://ivancom.eu/"
                onClick={() => dispatch(resetForm())}
                type="button"
                className={s.buttonNext}
              >
                На головну
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Completed;
