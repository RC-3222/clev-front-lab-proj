import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import { BtnType, BtnVariant, DataTestId, Size } from '../../../enums';

import styles from './button.module.scss';

type ButtonProps = PropsWithChildren & {
  type?: BtnType;
  name?: string;
  clickHandler?: () => void;
  isDisabled?: boolean;
  variant?: BtnVariant;
  size?: Size;
  dataTestId?: DataTestId;
  className?: string;
}

export const Button = ({
  type = BtnType.button,
  name = '',
  clickHandler,
  isDisabled = false,
  variant = BtnVariant.primary,
  size = Size.small,
  dataTestId,
  children,
  className,
}: ButtonProps) => (
  <button
    className={classNames(styles.btn, className, {
      [styles.primary]: variant === BtnVariant.primary,
      [styles.secondary]: variant === BtnVariant.secondary,
      [styles.small]: size === Size.small,
      [styles.large]: size === Size.large,
    })}
    type={type === BtnType.button ? 'button' : 'submit'}
    onClick={e => {
      if (type === BtnType.button) {
        e.preventDefault();
      }
      if (clickHandler) clickHandler();
    }}
    disabled={isDisabled}
    data-test-id={dataTestId ? dataTestId : ''}
  >
    {children ?? name}
  </button>
);
