import { ChangeEventHandler, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import { ReactComponent as Check } from '../../../../assets/images/check.svg';
import { ReactComponent as Eye } from '../../../../assets/images/eye.svg';
import { ReactComponent as EyeClosed } from '../../../../assets/images/eye-closed.svg';
import { DataTestId } from '../../../../enums';
import {
  validateForDigit,
  validateForMoreCharacters,
  validateForUppercase,
} from '../../../../utils';
import { Hint } from '../../hint';
import { HintVariant } from '../../hint/hint';
import { PASSWORD } from '../data';
import { CustomInputProps } from '../props';

import styles from '../styles.module.scss';

type PaswordInputProps = CustomInputProps & {
  minLength?: number;
  isValid?: boolean;
  dataTestId?: string;
}

export const PasswordInput = ({
  name,
  placeholder,
  error,
  clearActionErrors,
  required = true,
  hint = 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
  className,
  validate,
  minLength = PASSWORD.minLength,
  autoComplete,
  isValid,
  isDisabled,
  dataTestId,
}: PaswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const inputClassName = classNames(
    styles.input,
    className,
    error && styles.error,
    !showPassword && styles.password
  );
  const {
    register,
    watch,
    trigger,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const watchedFieldValue = watch(name || '');

  const handleFocus = () => setIsFilled(true);

  const handleBlur = () => {
    trigger(name);
    setIsFilled(Boolean(watchedFieldValue));
  };

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
        <span className={classNames(styles.placeholder, isFilled && styles.filled)}>
          {placeholder}
        </span>
        <input
          data-test-id={dataTestId}
          type='text'
          className={inputClassName}
          {...register(name || '', {
            required: required && 'Поле не может быть пустым',
            validate,
          })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete={autoComplete}
          disabled={isDisabled}
        />
        <span className={styles.iconsWrapper}>
          {isValid && <Check data-test-id={DataTestId.checkMark} />}
          {watchedFieldValue && (
            <button
              type='button'
              onClick={() => setShowPassword(prevState => !prevState)}
              className={styles.eyeButton}
            >
              {showPassword ? (
                <Eye data-test-id={DataTestId.eyeOpened} />
              ) : (
                <EyeClosed data-test-id={DataTestId.eyeClosed} />
              )}
            </button>
          )}
        </span>
      </div>
      {hint && validate && watchedFieldValue && !errors[name as string]?.message ? (
        <Hint variant={HintVariant.grey} className={styles.hint}>
          Пароль{' '}
          <span
            className={classNames(
              !validateForMoreCharacters(watchedFieldValue, minLength) && styles.errorHint
            )}
          >
            {`не менее ${minLength} символов`}
          </span>
          , с{' '}
          <span
            className={classNames(!validateForUppercase(watchedFieldValue) && styles.errorHint)}
          >
            заглавной буквой
          </span>{' '}
          и{' '}
          <span className={classNames(!validateForDigit(watchedFieldValue) && styles.errorHint)}>
            цифрой
          </span>
        </Hint>
      ) : (
        <Hint variant={error ? HintVariant.error : HintVariant.grey} className={styles.hint}>
          {error || hint}
        </Hint>
      )}
    </div>
  );
};
