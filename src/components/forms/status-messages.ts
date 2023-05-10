export const AUTH_STATUS = {
  error: {
    title: 'Вход не выполнен',
    description: 'Что-то пошло не так. Попробуйте ещё раз',
    buttonText: 'повторить',
  },
};

export const REGISTRATION_STATUS = {
  success: {
    title: 'Регистрация успешна',
    description:
      'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
    buttonText: 'вход',
  },
  error: {
    title: 'Данные не сохранились',
    description: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
    alreadyUsedDescription:
      'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail',
    buttonText: 'повторить',
    alreadyUsedButtonText: 'назад к регистрации',
  },
};

export const SEND_EMAIL_STATUS = {
  success: {
    title: 'Письмо выслано',
    description:
      'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля',
  },
};

export const CREATE_PASSWORD_STATUS = {
  success: {
    title: 'Новые данные сохранены',
    description: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
    buttonText: 'вход',
  },
  error: {
    title: 'Данные не сохранились',
    description: 'Что-то пошло не так. Попробуйте ещё раз',
    buttonText: 'повторить',
  },
};
