import { useDispatch } from 'react-redux';
import s  from './Completed.module.css'
import { MdDone } from "react-icons/md";
import { resetForm } from '../../redux/form/formSlice.js';
import { useEffect } from 'react';
const Completed = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка до самого верху
  }, []); 
    const dispatch = useDispatch();

  return (
    <div className={s.mainCont}>
        <div className={s.cont}>
            <div className={s.iconcont}><MdDone size={52} color='#04E628'/></div>
           <div className={s.textCont}>
                <h2 className={s.title}>Дякуємо!</h2>
                <p className={s.description}>Ваша заявка прийнята в обробку, ми надішлемо посилання для оплати послуг та інструкцію з подальшими діями на електрону пошту.</p>
           </div>
            <div className={s.buttons}>
            <button type="button" onClick={()=>dispatch(resetForm())} className={s.buttonBack}>
              Оформити ще
            </button>
            <a href="https://ivancom.eu/" onClick={()=>dispatch(resetForm())} type="button"  className={s.buttonNext}>
              На головну
            </a>
          </div>
        </div>
    </div>
  )
}

export default Completed