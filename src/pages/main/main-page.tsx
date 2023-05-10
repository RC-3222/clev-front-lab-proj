import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Calendar } from '../../components/calendar';
import { CardList } from '../../components/card-list';
import { CustomModal } from '../../components/common/custom-modal';
import { Filter } from '../../components/filter';
import { OverlayWithPortal } from '../../components/overlay-with-portal';
import { DataTestId, ViewMode } from '../../enums';
import { useBooleanState } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  booksSelector,
  categoriesSelector,
  getBooksRequest,
  toastSelector,
} from '../../store/slices';
import { BookType } from '../../types';
import { getFilteredBooks, sortBooksByRating } from '../../utils';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const [selectedViewMode, setSelectedViewMode] = useState(ViewMode.grid);
  const [inputText, setInputText] = useState('');

  const { categories } = useAppSelector(categoriesSelector);

  const { books: booksAll, isLoading: isLoadingBooks } = useAppSelector(booksSelector);

  const [books, setBooks] = useState(booksAll);

  const { category } = useParams();

  const { state } = useLocation();

  const { isToastVisible } = useAppSelector(toastSelector);

  const changeInputText = (value: string) => {
    setInputText(value);
  };

  const [isSortAscending, setIsSortAscending] = useState(false);

  const toggleSortByRatingMode = () => {
    setIsSortAscending(!isSortAscending);
  };
  const changeViewMode = (viewMode: ViewMode) => {
    setSelectedViewMode(viewMode);
  };

  const sortedBooksByRating = useMemo(
    () => (books ? sortBooksByRating(books, isSortAscending) : null),
    [books, isSortAscending]
  );

  useEffect(() => {
    if (booksAll && category) {
      setBooks(getFilteredBooks(booksAll, inputText, categories, category));
    }
  }, [inputText, booksAll, categories, category]);

  useEffect(() => {
    if (!isLoadingBooks) dispatch(getBooksRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    state: isVisibleCalendar,
    setTrue: showCalendar,
    setFalse: hideCalendar,
  } = useBooleanState();

  useEffect(() => {
    if (isToastVisible) {
      hideCalendar();
    }
  }, [isToastVisible, hideCalendar]);

  return (
    <section className={styles.mainPage} data-test-id={DataTestId.mainPage}>
      <div className={styles.mainPage__content} data-test-id={DataTestId.content}>
        <Filter
          changeViewMode={changeViewMode}
          selectedViewMode={selectedViewMode}
          inputText={inputText}
          changeInputText={changeInputText}
          toggleSortByRatingMode={toggleSortByRatingMode}
          isSortAscending={isSortAscending}
        />
        {booksAll &&
          (() => {
            if (state?.bookQuantity === 0)
              return (
                <p className={styles.notFound} data-test-id={DataTestId.emptyCategory}>
                  В этой категории книг ещё нет
                </p>
              );

            if (!books?.length)
              return (
                <p className={styles.notFound} data-test-id={DataTestId.searchResultNotFound}>
                  По запросу ничего не найдено
                </p>
              );

            return (
              <CardList
                selectedViewMode={selectedViewMode}
                cardsData={sortedBooksByRating as BookType[]}
                inputText={inputText}
                showCalendar={showCalendar}
              />
            );
          })()}
      </div>
      {isVisibleCalendar && (
        <OverlayWithPortal onClose={hideCalendar} dataTestId={DataTestId.modalOuter}>
          <CustomModal dataTestId={DataTestId.bookingModal}>
            <Calendar onClose={hideCalendar} />
          </CustomModal>
        </OverlayWithPortal>
      )}
    </section>
  );
};
