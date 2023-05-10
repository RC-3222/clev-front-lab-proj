import { Container } from '../../../common/container';

import { footerLinks } from './footer.data';

import styles from './footer.module.scss';

export const Footer = () => (
  <Container>
    <footer className={styles.footer}>
      <span className={styles.sub}>
        &copy; 2020-{new Date().getFullYear()} Cleverland. Все права защищены.
      </span>
      <ul className={styles.linkList}>
        {footerLinks.map(({ img, alt, to }) => (
          <li className={styles.linkItem} key={alt}>
            <a href={to} target='_blank' rel='noreferrer'>
              <img src={img} alt={alt} />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  </Container>
);
