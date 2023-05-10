import styles from './form-title.module.scss';

export const FormTitle = ({ text }: { text: string }) => <h2 className={styles.title}>{text}</h2>;
