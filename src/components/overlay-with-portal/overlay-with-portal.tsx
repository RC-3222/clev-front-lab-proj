import { PropsWithChildren, useEffect } from 'react';
import classNames from 'classnames';
import noScroll from 'no-scroll';

import { Portal } from './portal';

import styles from './overlay-with-portal.module.scss';

enum OverlayType {
  orange = 'orange',
  blur = 'blur',
  transparent = 'transparent',
}

type OverlayProps = PropsWithChildren & {
  onClose?: () => void;
  type?: OverlayType;
  dataTestId?: string;
}

export const OverlayWithPortal = ({
  children,
  onClose,
  type = OverlayType.blur,
  dataTestId,
}: OverlayProps) => {
  useEffect(() => {
    noScroll.on();

    return () => {
      noScroll.off();
    };
  }, []);

  return (
    <Portal>
      <div className={styles.container} data-test-id={dataTestId}>
        <div
          className={classNames(styles.overlay, {
            [styles.transparent]: type === OverlayType.transparent,
            [styles.orange]: type === OverlayType.orange,
            [styles.blur]: type === OverlayType.blur,
          })}
          onClick={onClose}
          role='presentation'
        />
        {children}
      </div>
    </Portal>
  );
};
