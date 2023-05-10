import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import { Button } from '../../../components/common/button';
import { CustomInput } from '../../../components/common/inputs/custom-input';
import { MASKS, REGEXP } from '../../../components/common/inputs/data';
import { CustomMaskedInput } from '../../../components/common/inputs/masked-input';
import { PasswordInput } from '../../../components/common/inputs/password-input';
import { BtnType, BtnVariant, DataTestId } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateUserRequest, userSelector } from '../../../store/slices';
import { ResponseUser } from '../../../types';
import { validateEmail, validateLogin, validatePassword } from '../../../utils';

import styles from './profile-user-form.module.scss';

type BodyFormInputs = {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type ProfileUserFormProps = {
  user: ResponseUser;
}

export const ProfileUserForm = ({ user }: ProfileUserFormProps) => {
  const { isUpdateSuccess } = useAppSelector(userSelector);

  const dispatch = useAppDispatch();

  const INPUTS_DATA = [
    {
      placeholder: 'Логин',
      name: 'login',
      data: user?.username,
      validation: validateLogin,
      hint: 'Используйте для логина латинский алфавит и цифры',
    },
    {
      type: 'password',
      placeholder: 'Пароль',
      name: 'password',
      data: '************',
      validation: validatePassword,
      hint: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
    },
    {
      placeholder: 'Имя',
      name: 'firstName',
      data: user?.firstName,
      validation: () => undefined,
    },
    {
      placeholder: 'Фамилия',
      name: 'lastName',
      data: user?.lastName,
      validation: () => undefined,
    },
    {
      type: 'tel',
      placeholder: 'Номер телефона',
      name: 'phone',
      data: user?.phone,
      validation: () => undefined,
      hint: 'В формате +375 (xx) xxx-xx-xx',
    },
    {
      type: 'email',
      placeholder: 'E-mail',
      name: 'email',
      data: user?.email,
      validation: validateEmail,
    },
  ];

  const methods = useForm<BodyFormInputs>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const { errors } = methods.formState;

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsDisabled(true);
    }
  }, [isUpdateSuccess]);

  const handleSubmit = (data: BodyFormInputs) => {
    const { firstName, lastName, phone, login: username, password, email } = data;
    const { id } = user;

    dispatch(updateUserRequest({ id, username, password, email, firstName, lastName, phone }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>Учётные данные</div>
        <div className={styles.subtitle}>Здесь вы можете отредактировать информацию о себе</div>
      </div>
      <FormProvider {...methods}>
        <form
          className={styles.infoTable}
          onSubmit={methods.handleSubmit(handleSubmit)}
          data-test-id={DataTestId.profileForm}
        >
          {INPUTS_DATA.map(({ placeholder, data, name, type, hint, validation }) =>
            name === 'password' ? (
              <PasswordInput
                dataTestId={`input-${name}`}
                key={name}
                name={name}
                type={name}
                placeholder={placeholder}
                validate={validatePassword}
                required={true}
                error={errors[name as keyof BodyFormInputs]?.message}
                isDisabled={isDisabled}
              />
            ) : name === 'phone' ? (
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
                required={false}
                hint={hint}
                inputMode='tel'
                autoComplete='off'
                isDisabled={isDisabled}
              />
            ) : (
              <CustomInput
                dataTestId={`input-${name}`}
                key={name}
                type={type}
                notAuthFilled={true}
                name={name}
                placeholder={placeholder}
                validate={validation}
                required={name === 'login' || name === 'email'}
                defaultValue={data}
                isDisabled={isDisabled}
                error={errors[name as keyof BodyFormInputs]?.message}
                hint={hint}
                autoComplete='off'
              />
            )
          )}

          <div className={styles.buttonBlock}>
            <Button
              dataTestId={DataTestId.editButton}
              variant={BtnVariant.secondary}
              className={classNames(styles.edit, styles.button)}
              clickHandler={() => setIsDisabled(!isDisabled)}
              name='Редактировать'
            />
            <Button
              dataTestId={DataTestId.saveButton}
              variant={BtnVariant.primary}
              type={BtnType.submit}
              className={classNames(styles.save, styles.button)}
              isDisabled={isDisabled}
              name='Сохранить изменения'
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
