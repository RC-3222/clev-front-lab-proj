import classNames from 'classnames';

import sort from '../../../assets/images/sort.svg';
import { DataTestId } from '../../../enums';

import styles from './custom-select.module.scss';

type CustomSelectProps = {
  placeholder: string;
  dataTestId?: DataTestId;
  handler: () => void;
  isIconReversed?: boolean;
}

export const CustomSelect = ({
  placeholder,
  dataTestId,
  handler,
  isIconReversed,
}: CustomSelectProps) => (
  <button type='button' className={styles.select} data-test-id={dataTestId} onClick={handler}>
    <div className={classNames(styles.imgWrapper, { [styles.reversed]: isIconReversed })}>
      <img src={sort} alt={placeholder} />
    </div>
    {placeholder}
  </button>
);
