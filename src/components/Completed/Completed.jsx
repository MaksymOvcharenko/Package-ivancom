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
import { useState } from 'react';
import { selectLoading, selectPaymentLink } from '../../redux/form/formSelectors.js';
import { ClockLoader } from 'react-spinners';
import sendShipmentData from '../../services/sendToServer.js';


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

  return (
    <>
      {loading ? (
        <div className={s.loader}>
          <p className={s.loaderTitle}>Зачекайте формується посилання</p>
          <ClockLoader color="#0184d6" loading size={80} speedMultiplier={1} />
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
                  <a
                    href={paymentLink}
                    type="button"
                    className={s.buttonNext}
                    target="blank"
                  >
                    Сплатити
                  </a>
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
