import { BookType, CategoryType } from '../types';

export const getFilteredBooks = (
  books: BookType[],
  filter: string,
  categories: CategoryType[] | null,
  category: string
) => {
  const categoryName = categories?.find(({ path }) => path === category)?.name;

  if (!categoryName) {
    return books.filter(book => book.title.toLowerCase().includes(filter.toLowerCase()));
  }

  return books.filter(
    book =>
      book.title.toLowerCase().includes(filter.toLowerCase()) &&
      book.categories?.includes(categoryName)
  );
};

export const sortBooksByRating = (books: BookType[], isSortAscending: boolean) => {
  const booksWithRating: BookType[] = [];
  const booksWithoutRating: BookType[] = [];

  books.forEach(book => (book.rating ? booksWithRating.push(book) : booksWithoutRating.push(book)));

  return isSortAscending
    ? [
        ...booksWithoutRating,
        ...booksWithRating.sort((a, b) => (a.rating as number) - (b.rating as number)),
      ]
    : [
        ...booksWithRating.sort((a, b) => (b.rating as number) - (a.rating as number)),
        ...booksWithoutRating,
      ];
};
