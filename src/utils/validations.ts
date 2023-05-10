const REGEXP = {
  login: /^[A-Za-z0-9]+$/g,
  password: /^(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?[0-9]).{8,}$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  phoneNumber: /^(\+?375) (\(\d{2}\)) (\d{3})-(\d{2})-(\d{2})$/,
  uppercase: /^[A-ZА-Я]+$/,
  digit: /[0-9]/,
  latinLetters: /[A-Za-z]/g,
};

// eslint-disable-next-line consistent-return
export const validateLogin = (fieldValue: string) => {
  if (!REGEXP.digit.test(fieldValue as string) || !REGEXP.latinLetters.test(fieldValue as string))
    return 'Используйте для логина латинский алфавит и цифры';
};

export const validatePassword = (fieldValue: string) =>
  REGEXP.password.test(fieldValue as string) ||
  'Пароль не менее 8 символов, с заглавной буквой и цифрой';

export const validateEmail = (fieldValue: string): string | boolean =>
  REGEXP.email.test(fieldValue as string) || 'Введите корректный e-mail';

export const isCorrectPassword = (password: string) => {
  let requirementCounter = 0;

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  password?.split('').some(el => REGEXP.digit.test(el)) && (requirementCounter += 1);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  password?.split('').some(el => REGEXP.uppercase.test(el)) && (requirementCounter += 1);

  return password?.length >= 8 && requirementCounter >= 2;
};

export const validateForMoreCharacters = (fieldValue: string, characters: number) =>
  fieldValue?.length >= characters;
export const validateForUppercase = (fieldValue: string) =>
  fieldValue?.split('').some(el => REGEXP.uppercase.test(el));

export const validateForDigit = (fieldValue: string) =>
  fieldValue?.split('').some(el => REGEXP.digit.test(el));

export const validateForLatinLetters = (fieldValue: string) =>
  fieldValue?.split('').some(el => REGEXP.latinLetters.test(el));
