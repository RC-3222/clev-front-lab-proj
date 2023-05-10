import { BookInfoType } from '../../../types';

import { detailedInfoFormattedData } from './detailed-info.data';

import styles from './detailed-info.module.scss';

type DetailedInformationProps = {
  book: BookInfoType;
}

export const DetailedInfo = ({ book }: DetailedInformationProps) => (
  <div className={styles.detailedInformation}>
    <h3 className={styles.subTitle}>Подробная информация</h3>
    <ul className={styles.infoList}>
      {detailedInfoFormattedData(book).map(({ type, value }) => (
        <li className={styles.infoItem} key={type}>
          <span className={styles.typeInfo}>{type}</span>
          <span className={styles.valueInfo}>{value ? value : 'Нет информации'}</span>
        </li>
      ))}
    </ul>
  </div>
);
