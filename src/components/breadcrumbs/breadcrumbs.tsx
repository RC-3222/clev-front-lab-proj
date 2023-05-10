import { Link, useParams } from 'react-router-dom';

import { AllBooks, DataTestId } from '../../enums';
import { useAppSelector } from '../../store/hooks';
import { bookInfoSelector } from '../../store/slices/book-info';
import { categoriesSelector } from '../../store/slices/categories';

import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const { bookId, category } = useParams();
  const { book } = useAppSelector(bookInfoSelector);
  const { categories } = useAppSelector(categoriesSelector);
  const categoryName = categories?.find(({ path }) => path === category)?.name;

  return (
    <div className={styles.breadcrumbs}>
      <Link
        to={`/books/${categoryName ? category : AllBooks.path}`}
        data-test-id={DataTestId.breadcrumbsLink}
      >
        {categoryName ? categoryName : AllBooks.strRu}
      </Link>
      <span>/</span>
      <Link to={`/books/${category}/${bookId}`} data-test-id={DataTestId.bookName}>
        {book?.title}
      </Link>
    </div>
  );
};
