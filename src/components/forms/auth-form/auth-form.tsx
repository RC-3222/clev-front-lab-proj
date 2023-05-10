import { Fragment, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { BtnType, BtnVariant, DataTestId, RoutePath } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  authenticationSelector,
  authRequest,
  authSelector,
  resetAuthError,
} from '../../../store/slices';
import { Button } from '../../common/button';
import { Hint } from '../../common/hint';
import { HintVariant } from '../../common/hint/hint';
import { CustomInput } from '../../common/inputs/custom-input';
import { PasswordInput } from '../../common/inputs/password-input';
import { StatusInfo } from '../../common/status-info';
import { Loader } from '../../loader';
import { OverlayWithPortal } from '../../overlay-with-portal';
import { FormFooter } from '../form-footer';
import { FormTitle } from '../form-title';
import { AUTH_STATUS } from '../status-messages';

import styles from '../styles.module.scss';

type AuthFormInputs = {
  identifier: string;
  password: string;
};

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { errorMessage, isError, isLoading } = useAppSelector(authenticationSelector);
  const { isAuthenticated } = useAppSelector(authSelector);

  const methods = useForm<AuthFormInputs>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const { errors } = methods.formState;

  const handleSubmit = (data: AuthFormInputs) => {
    dispatch(authRequest(data));
  };

  const clearErrors = () => dispatch(resetAuthError());

  useEffect(
    () => () => {
      dispatch(resetAuthError());
    },
    [dispatch]
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate(RoutePath.main, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isError) {
    return (
      <StatusInfo
        title={AUTH_STATUS.error.title}
        description={AUTH_STATUS.error.description}
        buttonText={AUTH_STATUS.error.buttonText}
        buttonAction={() => {
          dispatch(resetAuthError());
          methods.reset();
        }}
      />
    );
  }

  return (
    <Fragment>
      <div className={styles.container}>
        <FormTitle text='Вход в личный кабинет' />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} data-test-id={DataTestId.authForm}>
            <div className={styles.inputsWrapper}>
              <CustomInput
                dataTestId='input'
                name='identifier'
                placeholder='Логин'
                clearActionErrors={clearErrors}
                required={true}
                error={errors.identifier?.message || !!errorMessage}
              />
              <PasswordInput
                dataTestId='pass-input'
                name='password'
                type='password'
                placeholder='Пароль'
                clearActionErrors={clearErrors}
                required={true}
                hint=''
                error={errors.password?.message || !!errorMessage}
              />
            </div>
            <div className={styles.hint}>
              <Hint variant={errorMessage ? HintVariant.error : HintVariant.grey}>
                {errorMessage || <Link to={RoutePath.passReset}>Забыли логин или пароль?</Link>}
              </Hint>
              {errorMessage && (
                <Hint variant={HintVariant.black}>
                  <Link to={RoutePath.passReset}>Восстановить?</Link>
                </Hint>
              )}
            </div>
            <Button
              className={styles.button}
              variant={BtnVariant.primary}
              type={BtnType.submit}
              name='Вход'
            />
          </form>
        </FormProvider>
        <FormFooter link={RoutePath.register} text='Нет учётной записи?' linkText='Регистрация' />
      </div>
      {isLoading && (
        <OverlayWithPortal>
          <Loader />
        </OverlayWithPortal>
      )}
    </Fragment>
  );
};
