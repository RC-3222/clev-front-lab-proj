import classNames from 'classnames';

import { validateForDigit, validateForLatinLetters } from '../../../../utils';
import { Hint } from '../../../common/hint';
import { HintVariant } from '../../../common/hint/hint';

import styles from '../../styles.module.scss';

export const LoginHint = ({ value }: { value: string }) => (
  <Hint variant={HintVariant.grey} className={styles.hint}>
    Используйте для логина{' '}
    <span className={classNames(!validateForLatinLetters(value) && styles.errorHint)}>
      латинский алфавит
    </span>{' '}
    и <span className={classNames(!validateForDigit(value) && styles.errorHint)}>цифры</span>
  </Hint>
);
