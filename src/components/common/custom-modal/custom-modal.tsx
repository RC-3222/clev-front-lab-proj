import { PropsWithChildren } from 'react';

import { DataTestId } from '../../../enums';

import styles from './custom-modal.module.scss';

type CustomModalProps = PropsWithChildren & {
  dataTestId?: DataTestId;
}

export const CustomModal = ({ children, dataTestId }: CustomModalProps) => (
  <div className={styles.modal} data-test-id={dataTestId}>
    {children}
  </div>
);
