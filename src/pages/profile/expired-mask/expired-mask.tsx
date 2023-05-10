import { DataTestId } from '../../../enums';

import styles from './expired-mask.module.scss';

type ExpiredMaskProps = {
  expiredTitle: string;
  expiredSubtitle: string;
}

export const ExpiredMask = ({ expiredTitle, expiredSubtitle }: ExpiredMaskProps) => (
  <div className={styles.wrapper} data-test-id={DataTestId.expired}>
    <span className={styles.title}>{expiredTitle}</span>
    <span className={styles.subtitle}>{expiredSubtitle}</span>
  </div>
);
