import { useDispatch } from 'react-redux';
import s  from './Completed.module.css'
import { MdDone } from "react-icons/md";
import { resetForm } from '../../redux/form/formSlice.js';
const Completed = () => {
    const dispatch = useDispatch();

  return (
    <div className={s.mainCont}>
        <div className={s.cont}>
            <div className={s.iconcont}><MdDone size={52} color='#04E628'/></div>
           <div className={s.textCont}>
                <h2 className={s.title}>Дякуємо!</h2>
                <p className={s.description}>Посилка успішно оформлена</p>
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