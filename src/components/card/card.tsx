import { Fragment, memo, ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { BASE_URL } from '../../api';
import { BtnType, BtnVariant, DataTestId, ViewMode } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authSelector, setBookId, userSelector } from '../../store/slices';
import { BookType } from '../../types';
import { formatDateButton, getBookingBtnText } from '../../utils';
import { Button } from '../common/button';
import { Rating } from '../common/rating';
import { HighlightedText } from '../highlighted-text';

import styles from './card.module.scss';

type CardProps = {
  cardData: BookType;
  selectedViewMode?: ViewMode;
  inputText?: string;
  showCalendar?: () => void;
  isProfileCard?: boolean;
  isHistory?: boolean;
  deliveryDate?: string | Date;
  isBooking?: boolean;
  isCommented?: boolean;
  openReviewModalHandler?: (bookId: number) => void;
  cancelBookingHandler?: () => void;
}

export const Card = memo(
  ({
    selectedViewMode,
    inputText = '',
    cardData: { title, image, rating, authors, issueYear, id, booking, delivery },
    showCalendar,
    isProfileCard,
    isHistory,
    deliveryDate,
    isBooking,
    isCommented,
    openReviewModalHandler,
    cancelBookingHandler,
  }: CardProps) => {
    const { category } = useParams();

    const dispatch = useAppDispatch();
    const { auth:{userData:user} } = useAppSelector(authSelector);

    const clickHandler = (bookId: string) => {
      dispatch(setBookId(bookId));
      if (showCalendar) showCalendar();
    };

    const handleOpenReviewModal = () => {
      if (openReviewModalHandler) openReviewModalHandler(id);
    };

    let buttonVariant: ReactNode;

    if (isProfileCard) {
      if (isHistory) {
        buttonVariant = (
          <div className={styles.btnWrap}>
            <Button
              type={BtnType.button}
              dataTestId={DataTestId.historyReviewButton}
              variant={isCommented ? BtnVariant.secondary : BtnVariant.primary}
              clickHandler={handleOpenReviewModal}
              name={isCommented ? 'Изменить оценку' : 'Оставить отзыв'}
            />
          </div>
        );
      } else {
        buttonVariant = (
          <span className={styles.timedOut}>
            Возврат {formatDateButton(deliveryDate?.toString() || '')}
          </span>
        );
      }
    } else if (isBooking) {
      buttonVariant = (
        <div className={styles.btnWrap}>
          <Button
            dataTestId={DataTestId.cancelBookingButton}
            variant={BtnVariant.primary}
            clickHandler={cancelBookingHandler}
            name='Отменить бронь'
          />
        </div>
      );
    } else {
      buttonVariant = (
        <div className={styles.btnWrap}>
          <Button
            name={getBookingBtnText(booking, delivery)}
            type={BtnType.button}
            clickHandler={() => clickHandler(id.toString())}
            isDisabled={
              !!delivery?.dateHandedTo || (booking !== null && booking?.customerId !== user?.id)
            }
            variant={booking === null && !delivery ? BtnVariant.primary : BtnVariant.secondary}
            dataTestId={DataTestId.bookingButton}
          />
        </div>
      );
    }

    return (
      <Link to={`/books/${category ?? 'all'}/${id}`}>
        <li
          key={id}
          data-test-id={DataTestId.card}
          className={classNames(
            styles.card,
            selectedViewMode === ViewMode.grid ? styles.gridMode : styles.listMode
          )}
        >
          <div className={classNames(styles.imgWrapper, { [styles.noImg]: !image })}>
            {image && <img src={`${BASE_URL}${image.url}`} alt={title} />}
          </div>
          <div className={styles.cardContent}>
            <div className={styles.nameWrap}>
              <HighlightedText className={styles.name} searchWord={inputText} text={title} />
            </div>
            <p className={styles.author}>
              {authors && authors.map(author => <Fragment key={author}>{author}, </Fragment>)}
              {issueYear}
            </p>
            {rating ? (
              <div className={styles.ratingWrap}>
                <Rating value={Math.round(rating)} />
              </div>
            ) : (
              <p className={styles.noRating}>еще нет оценок</p>
            )}
            {buttonVariant}
          </div>
        </li>
      </Link>
    );
  }
);
