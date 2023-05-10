import { BtnVariant } from '../../../enums';
import { Button } from '../button';

import styles from './status-info.module.scss';

type StatusInfoProps = {
  title?: string;
  description: string;
  buttonText?: string;
  buttonAction?: () => void;
}

export const StatusInfo = ({ title, description, buttonText, buttonAction }: StatusInfoProps) => (
  <div className={styles.container} data-test-id='status-block'>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.description}>{description}</div>
    {buttonText && (
      <Button variant={BtnVariant.primary} clickHandler={buttonAction} className={styles.button}>
        {buttonText}
      </Button>
    )}
  </div>
);
