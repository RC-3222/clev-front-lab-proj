import { HTMLInputTypeAttribute } from 'react';

import { RegistrationData } from '../../../types';
import { validateEmail, validateLogin, validatePassword } from '../../../utils';

type FieldType = {
  type?: HTMLInputTypeAttribute;
  name: keyof RegistrationData;
  required: boolean;
  placeholder: string;
  validation?: (value: string) => string | boolean | undefined;
  hint?: string;
};

type FieldsData = {
  [key: number]: FieldType[];
};

export const FIELDS_DATA: FieldsData = {
  1: [
    {
      name: 'username',
      required: true,
      placeholder: 'Придумайте логин для входа',
      validation: validateLogin,
      hint: 'Используйте для логина латинский алфавит и цифры',
    },
    {
      type: 'password',
      name: 'password',
      required: true,
      placeholder: 'Пароль',
      validation: validatePassword,
      hint: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
    },
  ],
  2: [
    {
      name: 'firstName',
      required: true,
      placeholder: 'Имя',
    },
    {
      name: 'lastName',
      required: true,
      placeholder: 'Фамилия',
    },
  ],
  3: [
    {
      type: 'tel',
      name: 'phone',
      required: true,
      placeholder: 'Номер телефона',
      hint: 'В формате +375 (xx) xxx-xx-xx',
    },
    {
      type: 'email',
      name: 'email',
      required: true,
      placeholder: 'E-mail',
      validation: validateEmail,
    },
  ],
};
