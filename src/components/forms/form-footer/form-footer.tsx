import { CustomLink } from '../../common/custom-link';

import styles from './form-footer.module.scss';

type FormFooterProps = {
  link?: string;
  text: string;
  linkText?: string;
}

export const FormFooter = ({ link, text, linkText }: FormFooterProps) => (
  <div className={styles.wrapper}>
    <span className={styles.description}>{text}</span>
    {!!link && !!linkText && <CustomLink href={link} text={linkText} arrowSide='right' />}
  </div>
);
