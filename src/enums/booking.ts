export enum BookingSuccessMessage {
  book = 'Книга забронирована. Подробности можно посмотреть на странице Профиль',
  edit = 'Изменения успешно сохранены!',
  cancel = 'Бронирование книги успешно отменено!',
}

export enum BookingErrorMessage {
  book = 'Что-то пошло не так, книга не забронирована. Попробуйте позже!',
  edit = 'Изменения не были сохранены. Попробуйте позже!',
  cancel = 'Не удалось снять бронирование книги. Попробуйте позже!',
}
