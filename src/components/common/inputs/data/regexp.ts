export const REGEXP = {
  login: /^[A-Za-z0-9]+$/g,
  password: /^(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?[0-9]).{8,}$/,

  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  phoneNumber: /^(\+?375) (\(\d{2}\)) (\d{3})-(\d{2})-(\d{2})$/,

  digit: /[0-9]/,
  latinLetters: /[A-Za-z]/g,
  uppercase: /^[A-ZА-Я]+$/,
};
