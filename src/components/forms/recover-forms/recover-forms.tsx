import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RoutePath } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  createPasswordSelector,
  forgotSelector,
  resetAuthError,
  resetCreatePasswordState,
  resetForgotPasswordState,
} from '../../../store/slices';
import { CustomLink } from '../../common/custom-link';
import { StatusInfo } from '../../common/status-info';
import { FormTitle } from '../form-title';
import { CREATE_PASSWORD_STATUS, SEND_EMAIL_STATUS } from '../status-messages';

import { ResetPassword } from './reset-password';
import { SendEmail } from './send-email';

import styles from '../styles.module.scss';

export const RecoverForms = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isSuccess: isForgotSuccess } = useAppSelector(forgotSelector);
  const { isSuccess: isCreatePasswordSuccess, errorMessage: isCreatePasswordError } =
    useAppSelector(createPasswordSelector);

  const code = searchParams.get('code');

  useEffect(
    () => () => {
      dispatch(resetForgotPasswordState());
      dispatch(resetCreatePasswordState());
      dispatch(resetAuthError());
    },
    [dispatch]
  );
  if (isForgotSuccess) {
    return (
      <StatusInfo
        title={SEND_EMAIL_STATUS.success.title}
        description={SEND_EMAIL_STATUS.success.description}
      />
    );
  }

  if (isCreatePasswordSuccess) {
    return (
      <StatusInfo
        title={CREATE_PASSWORD_STATUS.success.title}
        description={CREATE_PASSWORD_STATUS.success.description}
        buttonText={CREATE_PASSWORD_STATUS.success.buttonText}
        buttonAction={() => {
          dispatch(resetCreatePasswordState());
          navigate(RoutePath.auth);
        }}
      />
    );
  }

  if (isCreatePasswordError) {
    return (
      <StatusInfo
        title={CREATE_PASSWORD_STATUS.error.title}
        description={CREATE_PASSWORD_STATUS.error.description}
        buttonText={CREATE_PASSWORD_STATUS.error.buttonText}
        buttonAction={() => {
          dispatch(resetCreatePasswordState());
        }}
      />
    );
  }

  return (
    <div className={styles.container}>
      {!code && (
        <div className={styles.header}>
          <CustomLink
            href={RoutePath.auth}
            text='вход в личный кабинет'
            arrowSide='left'
            variant='light'
          />
        </div>
      )}
      <FormTitle text='Восстановление пароля' />
      {code && <ResetPassword code={code} />}
      {!code && <SendEmail />}
    </div>
  );
};
