import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import { DataTestId, ViewMode } from '../../../enums';

import styles from './round-button.module.scss';

type RoundButtonProps = PropsWithChildren & {
  selectedViewMode?: ViewMode;
  changeViewMode?: (type: ViewMode) => void;
  viewMode?: ViewMode;
  handler?: () => void;
  dataTestId?: DataTestId;
  isIconReversed?: boolean;
}

export const RoundButton = ({
  children,
  changeViewMode,
  selectedViewMode,
  viewMode,
  handler,
  dataTestId,
  isIconReversed,
}: RoundButtonProps) => {
  const clickHandler = () => {
    if (selectedViewMode && changeViewMode && viewMode) {
      changeViewMode(viewMode);
    } else if (handler) {
      handler();
    }
  };

  return (
    <button
      className={classNames(styles.roundButton, {
        [styles.active]: viewMode && viewMode === selectedViewMode,
      })}
      onClick={clickHandler}
      type='button'
      data-test-id={dataTestId}
    >
      <div className={classNames(styles.icon, { [styles.reversed]: isIconReversed })}>
        {children}
      </div>
    </button>
  );
};
