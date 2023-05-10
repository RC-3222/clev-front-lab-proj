import { useEffect } from 'react';
import classNames from 'classnames';
import noScroll from 'no-scroll';

import styles from './overlay-mask.module.scss';

type OverlayMaskProps = {
  onClose: () => void;
  isOpened: boolean;
  dataTestId?: string;
}

export const OverlayMask = ({ onClose, isOpened, dataTestId }: OverlayMaskProps) => {
  useEffect(() => (isOpened ? noScroll.on() : noScroll.off()), [isOpened]);

  return (
    <div
      className={classNames(styles.overlay, {
        [styles.hidden]: !isOpened,
      })}
      onClick={onClose}
      role='presentation'
      data-test-id={dataTestId}
    />
  );
};
