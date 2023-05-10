export const BOOKING_DATA: BookingDataType = {
  title: 'Забронированная книга',
  subtitle: 'Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь',
  data: 'Забронируйте книгу и она отобразится',
  expiredTitle: 'Дата бронирования книги истекла',
  expiredSubtitle: 'Через 24 часа книга будет  доступна всем',
};

export const DELIVERING_DATA = {
  title: 'Книга которую взяли',
  subtitle: 'Здесь можете просмотреть информацию о книге и узнать сроки возврата',
  data: 'Прочитав книгу, она отобразится в истории',
  expiredTitle: 'Вышел срок пользования книги',
  expiredSubtitle: 'Верните книгу, пожалуйста',
};

export type BookingDataType = {
  title: string;
  subtitle: string;
  data: string;
  expiredSubtitle: string;
  expiredTitle: string;
};

export const HISTORY_DATA = {
  title: 'История',
  subtitle: 'Список прочитанных книг',
  data: 'Вы не читали книг из нашей библиотеки',
};
