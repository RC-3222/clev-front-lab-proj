import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import CloseIcon from '../../../assets/images/close-alt.svg';
import { Button } from '../../../components/common/button';
import { RatingChoice } from '../../../components/common/rating-choice';
import { BtnType, DataTestId, Size } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  bookInfoSelector,
  getBookInfoRequest,
  getReviewRequest,
  reviewUpdateRequest,
  toastSelector,
  userSelector,
} from '../../../store/slices';
import { ReviewFieldType } from '../../../types';

import styles from './leave-review.module.scss';

type LeaveReviewProps = {
  setHideReviewModal: () => void;
  updateReview?: boolean;
  selectedBookID?: number;
  defaultRating?: number;
}

export const LeaveReview = ({
  setHideReviewModal,
  updateReview = false,
  selectedBookID,
  defaultRating = 5,
}: LeaveReviewProps) => {

  const dispatch = useAppDispatch();
  
  const { data: user } = useAppSelector(userSelector);

  const { isToastVisible } = useAppSelector(toastSelector);

  const { bookId } = useParams();

  const comment = user?.comments?.find(comm => comm.bookId === (selectedBookID ? selectedBookID : +(bookId as string)));

  const { register, handleSubmit, control } = useForm<ReviewFieldType>({
    defaultValues: { rating: comment ? comment.rating as number : defaultRating, text: comment ? comment.text as string : '' },
  });

  useEffect(() => {
    if (selectedBookID) {
      dispatch(getBookInfoRequest(selectedBookID.toString()));
    }
  }, [dispatch, selectedBookID]);
  
  useEffect(() => {
    if (isToastVisible) {
      setHideReviewModal();
    }
  }, [isToastVisible, setHideReviewModal]);


  const onSubmit: SubmitHandler<ReviewFieldType> = data => {
    if (updateReview && selectedBookID && comment) {
      dispatch(
        reviewUpdateRequest({
          ...data,
          user: user.id.toString(),
          book: `${selectedBookID}`,
          commentId: comment.id,
        })
      );
    } else if (!updateReview && selectedBookID)
      dispatch(
        getReviewRequest({
          ...data,
          user: user.id.toString(),
          book: `${selectedBookID}`,
        })
      );
    else if (updateReview && bookId && comment) {
      dispatch(
        reviewUpdateRequest({
          ...data,
          user: user.id.toString(),
          book: bookId,
          commentId: comment.id,
        })
      );
    } else if (user && bookId)
      dispatch(
        getReviewRequest({
          ...data,
          user: user.id.toString(),
          book: `${bookId}`,
        })
      );
  };

  return (
    <form className={styles.leaveReview} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title} data-test-id={DataTestId.modalTitle}>
        {updateReview ? 'Хотите изменить оценку?' : 'Оцените книгу'}
      </h2>
      <img
        className={styles.closeIcon}
        src={CloseIcon}
        alt='close-icon'
        onClick={() => setHideReviewModal()}
        role='presentation'
        data-test-id={DataTestId.modalCloseButton}
      />
      <p className={styles.subTitle}>Ваша оценка</p>
      <RatingChoice control={control} defaultRating={comment ? comment.rating : defaultRating} />
      <textarea
        className={styles.textarea}
        {...register('text', { required: 'Поле не может быть пустым' })}
        placeholder='Комментарий'
        data-test-id={DataTestId.comment}
      />
      <Button
        name={updateReview ? 'Изменить оценку' : 'Оценить'}
        type={BtnType.submit}
        size={Size.large}
        clickHandler={() => onSubmit}
        dataTestId={DataTestId.buttonComment}
      />
    </form>
  );
};
