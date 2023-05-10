import { useEffect } from 'react';
import classNames from 'classnames';

import CloseIcon from '../../../assets/images/close.svg';
import PositiveIcon from '../../../assets/images/positive-circle.svg';
import NegativeIcon from '../../../assets/images/warning-circle.svg';
import { DataTestId, ToastVariant } from '../../../enums';
import { useAppDispatch } from '../../../store/hooks';
import { clearToast } from '../../../store/slices';

import styles from './toast.module.scss';

type ToastProps = {
  message: string | null;
  type: ToastVariant | null;
};

export const Toast = ({ message, type }: ToastProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(clearToast());
    }, 4000);

    return () => {
      clearTimeout(timerId);
    };
  }, [dispatch]);

  return (
    <div
      className={classNames(styles.toast, {
        [styles.positive]: type === ToastVariant.positive,
        [styles.negative]: type === ToastVariant.negative,
      })}
      data-test-id={DataTestId.error}
    >
      <div className={styles.message}>
        {type === ToastVariant.positive ? (
          <img className={styles.icon} src={PositiveIcon} alt='positive-icon' />
        ) : (
          <img className={styles.icon} src={NegativeIcon} alt='negative-icon' />
        )}
        <p>{message}</p>
      </div>
      <button
        className={styles.closeIcon}
        onClick={() => dispatch(clearToast())}
        type='button'
        data-test-id={DataTestId.alertClose}
      >
        <img src={CloseIcon} alt='close-icon' />
      </button>
    </div>
  );
};
