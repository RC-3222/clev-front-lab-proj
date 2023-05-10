import { RootState } from '../..';

export const booksSelector = (state: RootState) => state.books;

export const booksSelectorById = (bookId: string | null) => (state: RootState) =>
  state.books.books?.find(book => book.id.toString() === bookId);
