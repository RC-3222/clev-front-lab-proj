import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { DataTestId } from '../../../enums';

import styles from './hint.module.scss';

export enum HintVariant {
  grey = 'grey',
  error = 'error',
  black = 'black',
}

type HintProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  variant: HintVariant;
  href?: string;
}

export const Hint = ({ variant, href, className, children, ...props }: HintProps) => {
  const hintClassName = classNames(styles.hint, className, {
    [styles.grey]: variant === HintVariant.grey,
    [styles.black]: variant === HintVariant.black,
    [styles.error]: variant === HintVariant.error,
  });

  return (
    <div className={hintClassName} {...props} data-test-id={DataTestId.hint}>
      {href ? <a href={href}>{children}</a> : children}
    </div>
  );
};
