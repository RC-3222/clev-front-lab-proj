export enum RoutePath {
  main = '/',
  booksAll = '/books/all',
  booksCategory = '/books/:category',
  terms = '/terms',
  contract = '/contract',
  bookPage = '/books/:category/:bookId',
  profile = '/profile',
  register = '/registration',
  auth = '/auth',
  passReset = '/forgot-pass',
  fallback = '/*',
}
