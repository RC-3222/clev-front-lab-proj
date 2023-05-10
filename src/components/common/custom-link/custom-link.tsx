import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as Arrow } from '../../../assets/images/arrow.svg';

import styles from './custom-link.module.scss';

type CustomLinkProps = {
  href: string;
  text: string;
  arrowSide: 'left' | 'right';
  variant?: 'light' | 'dark';
}

export const CustomLink = ({ href, text, arrowSide, variant = 'dark' }: CustomLinkProps) => (
  <Link to={href} className={classNames(styles.link, styles[variant])}>
    {arrowSide === 'left' && <Arrow className={styles[arrowSide]} />}
    <span>{text}</span>
    {arrowSide === 'right' && <Arrow />}
  </Link>
);
