import { Fragment } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { BtnType, BtnVariant, DataTestId } from '../../../../enums';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  createPasswordRequest,
  createPasswordSelector,
  resetAuthError,
} from '../../../../store/slices';
import { isCorrectPassword, validatePassword } from '../../../../utils/validations';
import { Button } from '../../../common/button';
import { Hint } from '../../../common/hint';
import { HintVariant } from '../../../common/hint/hint';
import { PasswordInput } from '../../../common/inputs/password-input';
import { Loader } from '../../../loader';
import { OverlayWithPortal } from '../../../overlay-with-portal';
import { FormFooter } from '../../form-footer';

import styles from '../../styles.module.scss';

type ResetPasswordFormInput = {
  password: string;
  passwordConfirmation: string;
};

export const ResetPassword = ({ code }: { code: string }) => {
  const dispatch = useAppDispatch();
  const { errorMessage, isLoading } = useAppSelector(createPasswordSelector);

  const methods = useForm<ResetPasswordFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const { errors } = methods.formState;

  const { password } = methods.watch();

  const handleSubmit = (data: ResetPasswordFormInput) => {
    dispatch(createPasswordRequest({ code, ...data }));
  };

  const clearErrors = () => dispatch(resetAuthError());

  const checkConfirmPassword = (value: string) =>
    (!!password && !!value && password === value) || 'Пароли не совпадают';

  return (
    <Fragment>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          data-test-id={DataTestId.resetPasswordForm}
        >
          <div className={styles.inputsWrapper}>
            <PasswordInput
              name='password'
              placeholder='Новый пароль'
              validate={validatePassword}
              error={errors.password?.message}
              clearActionErrors={clearErrors}
              isValid={isCorrectPassword(password)}
            />
            <PasswordInput
              name='passwordConfirmation'
              placeholder='Повторите пароль'
              validate={checkConfirmPassword}
              error={errors.passwordConfirmation?.message}
              clearActionErrors={clearErrors}
              hint=''
            />
          </div>
          {errorMessage && (
            <Hint className={styles.hint} variant={HintVariant.error}>
              {errorMessage}
            </Hint>
          )}
          <Button
            className={styles.button}
            variant={BtnVariant.primary}
            type={BtnType.submit}
            isDisabled={!!Object.keys(errors).length}
            name='сохранить изменения'
          />
        </form>
      </FormProvider>
      <FormFooter text='После сохранения войдите в библиотеку, используя новый пароль' />
      {isLoading && (
        <OverlayWithPortal>
          <Loader />
        </OverlayWithPortal>
      )}
    </Fragment>
  );
};
