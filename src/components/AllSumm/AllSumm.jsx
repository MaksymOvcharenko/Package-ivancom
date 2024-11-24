import { useSelector } from "react-redux";
import styles from "./AllSumm.module.css";
import { selectValue } from "../../redux/form/formSelectors.js";

const AllSumm = () => {
  const value = useSelector(selectValue) || {};
  return (
    <div className={styles.result}>
      <p className={styles.p}>
        <span className={styles.resultSpan}>Загальна вартість:</span>
        {value.allSumm ? `${value.allSumm.toFixed(2)} PLN` : ""}
      </p>
    </div>
  );
};

export default AllSumm;
