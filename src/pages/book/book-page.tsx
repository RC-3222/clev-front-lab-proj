import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/breadcrumbs';
import { Calendar } from '../../components/calendar';
import { Container } from '../../components/common/container';
import { CustomModal } from '../../components/common/custom-modal';
import { OverlayWithPortal } from '../../components/overlay-with-portal';
import { ReviewList } from '../../components/review-list';
import { DataTestId } from '../../enums';
import { useBooleanState } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  bookInfoSelector,
  getBookInfoRequest,
  resetBookInfo,
  reviewSelector,
  toastSelector,
  userSelector,
} from '../../store/slices';

import { DetailedInfo } from './detailed-info';
import { LeaveReview } from './leave-review';
import { MainInfo } from './main-info';
import { RatingBlock } from './rating-block';

import styles from './book-page.module.scss';

export const BookPage = () => {
  // -----------------------------------------
  const { bookId } = useParams();
  const {
    state: shouldShowReviewModal,
    setFalse: setHideReviewModal,
    setTrue: setShowReviewModal,
  } = useBooleanState(false);

  const {
    state: isShowCalendar,
    setTrue: showCalendar,
    setFalse: hideCalendar,
  } = useBooleanState(false);

  const dispatch = useAppDispatch();

  const { book } = useAppSelector(bookInfoSelector);
  const { error: errorReview, review } = useAppSelector(reviewSelector);

  const { isToastVisible } = useAppSelector(toastSelector);

  const { data: user } = useAppSelector(userSelector);
  const userCommentedBooksIds = user?.comments?.map(({ bookId }) => bookId);

  useEffect(() => {
    if (bookId) {
      dispatch(getBookInfoRequest(bookId));
    }

    return () => {
      dispatch(resetBookInfo())
    }
  }, [dispatch, bookId]);

  useEffect(() => {
    if (errorReview || review) {
      setHideReviewModal();
    }
  }, [errorReview, review, setHideReviewModal]);

  useEffect(() => {
    if (isToastVisible) {
      hideCalendar();
    }
  }, [isToastVisible, hideCalendar]);

  return (
    <section className={styles.bookPage}>
      <div className={styles.breadcrumbsWrap}>
        <Container>
          <Breadcrumbs />
        </Container>
      </div>
      {book && (
        <Container>
          <MainInfo book={book} showCalendar={showCalendar} />
          <RatingBlock rating={book.rating} />
          <DetailedInfo book={book} />
          <ReviewList reviews={book.comments} setShowReviewModal={setShowReviewModal} />
        </Container>
      )}

      {shouldShowReviewModal && (
        <OverlayWithPortal onClose={setHideReviewModal} dataTestId={DataTestId.modalOuter}>
          <CustomModal dataTestId={DataTestId.modalRateBook}>
            <LeaveReview
              setHideReviewModal={setHideReviewModal}
              updateReview={userCommentedBooksIds?.includes(+(bookId as string))}
            />
          </CustomModal>
        </OverlayWithPortal>
      )}

      {isShowCalendar && (
        <OverlayWithPortal onClose={hideCalendar} dataTestId={DataTestId.modalOuter}>
          <CustomModal dataTestId={DataTestId.bookingModal}>
            <Calendar onClose={hideCalendar} />
          </CustomModal>
        </OverlayWithPortal>
      )}
    </section>
  );
};
