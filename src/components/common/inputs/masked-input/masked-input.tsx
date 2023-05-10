import { ChangeEventHandler, useState } from 'react';
import { useFormContext, ValidationRule } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames';

import { Hint } from '../../hint';
import { HintVariant } from '../../hint/hint';
import { CustomInputProps } from '../props';

import styles from '../styles.module.scss';

type CustomMaskedInputProps = CustomInputProps & {
  mask: Array<RegExp | string>;
  validationPattern?: ValidationRule<RegExp>;
}

export const CustomMaskedInput = ({
  mask,
  type,
  name,
  placeholder,
  error,
  clearActionErrors,
  required,
  hint,
  className,
  validate,
  validationPattern,
  inputMode,
  autoComplete,
  isDisabled,
}: CustomMaskedInputProps) => {
  const [isFilled, setIsFilled] = useState(false);
  const inputClassName = classNames(styles.input, className, error && styles.error);
  const { register, watch, trigger, setValue, clearErrors } = useFormContext();

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
        <MaskedInput
          placeholderChar='x'
          mask={mask}
          type={type}
          className={inputClassName}
          {...register(name || '', {
            required: required && 'Поле не может быть пустым',
            validate,
            pattern: validationPattern,
          })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          inputMode={inputMode}
          autoComplete={autoComplete}
          disabled={isDisabled}
        />
      </div>
      <Hint variant={error ? HintVariant.error : HintVariant.grey} className={styles.hint}>
        {error || hint}
      </Hint>
    </div>
  );
};
