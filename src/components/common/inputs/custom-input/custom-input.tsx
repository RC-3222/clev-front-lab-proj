import { ChangeEventHandler, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import { Hint } from '../../hint';
import { HintVariant } from '../../hint/hint';
import { CustomInputProps } from '../props';

import styles from '../styles.module.scss';

export const CustomInput = ({
  type,
  name,
  placeholder,
  error,
  clearActionErrors,
  required,
  hint,
  className,
  validate,
  autoComplete,
  notAuthFilled,
  isDisabled,
  defaultValue,
  dataTestId,
  customHint,
}: CustomInputProps) => {
  const [isFilled, setIsFilled] = useState(false);
  const inputClassName = classNames(styles.input, className, error && styles.error);
  const {
    register,
    watch,
    trigger,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const watchedFieldValue = watch(name || '');

  const handleBlur = () => {
    trigger(name);
    setIsFilled(Boolean(watchedFieldValue));
  };
  const handleFocus = () => setIsFilled(true);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setValue(name || '', value);

    if (watchedFieldValue !== value) {
      clearErrors(name);
      clearActionErrors?.();
    }
  };

  return (
    <div className={styles.formControlInner}>
      <div className={styles.inputWrapper}>
        <span
          className={classNames(styles.placeholder, (isFilled || notAuthFilled) && styles.filled)}
        >
          {placeholder}
        </span>
        <input
          data-test-id={dataTestId}
          type={type === 'password' ? undefined : type}
          className={inputClassName}
          {...register(name || '', {
            required: required && 'Поле не может быть пустым',
            validate,
          })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          disabled={isDisabled}
        />
      </div>
      {customHint && watchedFieldValue && validate && hint && !errors[name as string]?.message ? (
        customHint
      ) : (
        <Hint variant={error ? HintVariant.error : HintVariant.grey} className={styles.hint}>
          {error || hint}
        </Hint>
      )}
    </div>
  );
};
