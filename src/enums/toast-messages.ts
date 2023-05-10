export enum SuccessMessages {
  Booking = 'Книга забронирована. Подробности можно посмотреть на странице Профиль',
  EditBooking = 'Изменения успешно сохранены!',
  CancelBooking = 'Бронирование книги успешно отменено!',
  Review = 'Спасибо, что нашли время оценить книгу!',
  ReviewUpdate = 'Спасибо, что нашли время изменить оценку!',
  UserDataUpdate = 'Изменения успешно сохранены!',
  UserAvatarUpdate = 'Фото успешно сохранено!',
}

export enum FailureMessages {
  GenericError = 'Что-то пошло не так. Обновите страницу через некоторое время',
  Booking = 'Что-то пошло не так, книга не забронирована. Попробуйте позже!',
  EditBooking = 'Изменения не были сохранены. Попробуйте позже!',
  CancelBooking = 'Не удалось снять бронирование книги. Попробуйте позже!',
  Review = 'Оценка не была отправлена. Попробуйте позже!',
  ReviewUpdate = 'Изменения не были сохранены. Попробуйте позже!',
  UserDataRequest = 'Данные пользователя не загружены, попробуйте позже!',
  UserDataUpdate = 'Изменения не были сохранены. Попробуйте позже!',
  UserAvatarUpdate = 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!',
}
