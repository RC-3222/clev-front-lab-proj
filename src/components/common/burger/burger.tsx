import classNames from 'classnames';

import { DataTestId } from '../../../enums';

import styles from './burger.module.scss';

type BurgerProps = {
  isMenuOpen: boolean;
  toggle: () => void;
}

export const Burger = ({ isMenuOpen, toggle }: BurgerProps) => (
  <button
    className={classNames(styles.burger, isMenuOpen && styles.cross)}
    onClick={toggle}
    data-test-id={DataTestId.buttonBurger}
    type='button'
  >
    <span className={styles.burger__item} />
  </button>
);
