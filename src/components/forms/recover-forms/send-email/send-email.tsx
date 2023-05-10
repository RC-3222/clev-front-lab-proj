import { Fragment, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { BtnType, BtnVariant, DataTestId, RoutePath } from '../../../../enums';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { forgotPasswordRequest, forgotSelector, resetAuthError } from '../../../../store/slices';
import { validateEmail } from '../../../../utils';
import { Button } from '../../../common/button';
import { Hint } from '../../../common/hint';
import { HintVariant } from '../../../common/hint/hint';
import { CustomInput } from '../../../common/inputs/custom-input';
import { Loader } from '../../../loader';
import { OverlayWithPortal } from '../../../overlay-with-portal';
import { FormFooter } from '../../form-footer';

import styles from '../../styles.module.scss';

type RecoveryFormInput = {
  email: string;
};

export const SendEmail = () => {
  const dispatch = useAppDispatch();
  const { errorMessage, isLoading } = useAppSelector(forgotSelector);

  const methods = useForm<RecoveryFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const { errors } = methods.formState;

  const handleSubmit = (data: RecoveryFormInput) => {
    dispatch(forgotPasswordRequest(data));
  };

  useEffect(
    () => () => {
      dispatch(resetAuthError());
    },
    [dispatch]
  );

  return (
    <Fragment>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} data-test-id={DataTestId.sendEmailForm}>
          <div className={styles.inputsWrapper}>
            <CustomInput
              type='email'
              name='email'
              placeholder='Email'
              required={true}
              validate={validateEmail}
              error={errorMessage || errors.email?.message}
            />
          </div>
          <Hint variant={HintVariant.grey}>
            На это email будет отправлено письмо с инструкциями по восстановлению пароля
          </Hint>
          <Button
            className={styles.button}
            variant={BtnVariant.primary}
            type={BtnType.submit}
            name='Восстановить'
          />
        </form>
      </FormProvider>
      <FormFooter link={RoutePath.register} text='Нет учётной записи?' linkText='Регистрация' />
      {isLoading && (
        <OverlayWithPortal>
          <Loader />
        </OverlayWithPortal>
      )}
    </Fragment>
  );
};
