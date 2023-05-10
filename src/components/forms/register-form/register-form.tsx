import { Fragment, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { BtnType, BtnVariant, DataTestId, RoutePath } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  registrationRequest,
  registrationSelector,
  resetAuthError,
  resetRegistrationState,
} from '../../../store/slices';
import { RegistrationData } from '../../../types';
import { isCorrectPassword } from '../../../utils';
import { Button } from '../../common/button';
import { CustomInput } from '../../common/inputs/custom-input';
import { MASKS, REGEXP } from '../../common/inputs/data';
import { CustomMaskedInput } from '../../common/inputs/masked-input';
import { PasswordInput } from '../../common/inputs/password-input';
import { StatusInfo } from '../../common/status-info';
import { Loader } from '../../loader';
import { OverlayWithPortal } from '../../overlay-with-portal';
import { FormFooter } from '../form-footer';
import { FormTitle } from '../form-title';
import { REGISTRATION_STATUS } from '../status-messages';

import { LoginHint } from './login-hint';
import { FIELDS_DATA } from './register-form.data';

import styles from '../styles.module.scss';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isSuccess, isLoading, errorMessage, isAlreadyUsedError } =
    useAppSelector(registrationSelector);
  const [formStep, setFormStep] = useState(1);

  const methods = useForm<RegistrationData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const { errors } = methods.formState;

  const { password, username } = methods.watch();

  const handleSubmit = (data: RegistrationData) => {
    if (formStep < 3) {
      setFormStep(currentStep => currentStep + 1);
    } else {
      dispatch(registrationRequest(data));
    }
  };

  const clearErrors = () => dispatch(resetAuthError());

  useEffect(() => {
    FIELDS_DATA[formStep].forEach(({ name }) => methods.resetField(name));
  }, [formStep, methods]);

  useEffect(() => {
    if (errorMessage || isAlreadyUsedError) {
      setFormStep(1);
    }
  }, [errorMessage, isAlreadyUsedError]);

  useEffect(
    () => () => {
      dispatch(resetAuthError());
    },
    [dispatch]
  );

  if (isSuccess) {
    return (
      <StatusInfo
        title={REGISTRATION_STATUS.success.title}
        description={REGISTRATION_STATUS.success.description}
        buttonText={REGISTRATION_STATUS.success.buttonText}
        buttonAction={() => {
          navigate(RoutePath.auth);
          dispatch(resetRegistrationState());
        }}
      />
    );
  }

  if (errorMessage || isAlreadyUsedError) {
    return (
      <StatusInfo
        title={REGISTRATION_STATUS.error.title}
        description={
          isAlreadyUsedError
            ? REGISTRATION_STATUS.error.alreadyUsedDescription
            : REGISTRATION_STATUS.error.description
        }
        buttonText={
          isAlreadyUsedError
            ? REGISTRATION_STATUS.error.alreadyUsedButtonText
            : REGISTRATION_STATUS.error.buttonText
        }
        buttonAction={() => {
          dispatch(resetRegistrationState());
          methods.reset();
        }}
      />
    );
  }

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <FormTitle text='Регистрация' />
          <div className={styles.step}>{formStep} из 3</div>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            data-test-id={DataTestId.registerForm}
          >
            <div className={styles.inputsWrapper}>
              {FIELDS_DATA[formStep].map(
                ({ name, placeholder, validation, required, hint, type }) => {
                  if (name === 'phone') {
                    return (
                      <CustomMaskedInput
                        mask={MASKS.phoneBy}
                        key={name}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        validationPattern={{
                          value: REGEXP.phoneNumber,
                          message: hint || '',
                        }}
                        error={errors[name]?.message}
                        required={required}
                        hint={hint}
                        inputMode='tel'
                        clearActionErrors={clearErrors}
                        autoComplete='off'
                      />
                    );
                  }
                  if (name === 'password') {
                    return (
                      <PasswordInput
                        key={name}
                        name={name}
                        placeholder={placeholder}
                        validate={validation}
                        error={errors[name]?.message}
                        clearActionErrors={clearErrors}
                        autoComplete='off'
                        isValid={isCorrectPassword(password)}
                      />
                    );
                  }

                  return (
                    <CustomInput
                      key={name}
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      validate={validation}
                      error={errors[name]?.message}
                      required={required}
                      hint={hint}
                      clearActionErrors={clearErrors}
                      autoComplete='off'
                      customHint={name === 'username' && <LoginHint value={username} />}
                    />
                  );
                }
              )}
            </div>
            <Button
              className={styles.button}
              isDisabled={!!Object.keys(errors).length}
              variant={BtnVariant.primary}
              type={BtnType.submit}
            >
              {formStep === 1 && 'следующий шаг'}
              {formStep === 2 && 'последний шаг'}
              {formStep === 3 && 'зарегистрироваться'}
            </Button>
          </form>
        </FormProvider>
        <FormFooter link={RoutePath.auth} text='Есть учётная запись?' linkText='Войти' />
      </div>
      {isLoading && (
        <OverlayWithPortal>
          <Loader />
        </OverlayWithPortal>
      )}
    </Fragment>
  );
};
