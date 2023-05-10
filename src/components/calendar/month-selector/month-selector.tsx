import { v4 as uuidv4 } from 'uuid';

import styles from './month-selector.module.scss';

interface MonthSelectorProps {
  setMonth: (index: number) => void;
}

export const MonthSelector = ({ setMonth }: MonthSelectorProps) => (
  <ul
    className={styles.monthList}
    onClick={event => {
      const el = event.target as HTMLElement;

      if (el.dataset?.ind) {
        setMonth(+el.dataset.ind);
      }
    }}
    role='presentation'
  >
    {['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'].map(
      (item, index) => (
        <li data-ind={index} key={uuidv4()}>
          {item}
        </li>
      )
    )}
  </ul>
);
