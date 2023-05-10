import classNames from 'classnames';

import Chevron from '../../assets/images/chevron.svg';
import { BtnType, BtnVariant, DataTestId, Size } from '../../enums';
import { useBooleanState } from '../../hooks';
import { useAppSelector } from '../../store/hooks';
import { userSelector } from '../../store/slices';
import { ReviewType } from '../../types';
import { Button } from '../common/button';
import { Review } from '../review';

import styles from './review-list.module.scss';

type ReviewListProps = {
  reviews: ReviewType[] | null;
  setShowReviewModal: () => void;
}

export const ReviewList = ({ reviews, setShowReviewModal }: ReviewListProps) => {
  const { state: areReviewsVisible, toggle } = useBooleanState(true);
  const { data: user } = useAppSelector(userSelector);

  const isUserCommented = reviews?.some(review => review.user.commentUserId === user?.id);

  return (
    <div className={styles.reviews} data-test-id='reviews'>
      <h3 className={classNames(styles.subTitle, { [styles.withUnderline]: areReviewsVisible })}>
        <span className={styles.subTitleName}>Отзывы</span>
        <span className={styles.amountReviews}>{reviews?.length}</span>
        <button
          className={classNames(styles.chevronBtn, { [styles.active]: areReviewsVisible })}
          onClick={toggle}
          type='button'
          data-test-id={DataTestId.buttonHideReviews}
        >
          <div className={styles.chevron}>
            <img src={Chevron} alt='chevron' />
          </div>
        </button>
      </h3>

      <ul className={classNames(styles.reviewsList, { [styles.active]: areReviewsVisible })}>
        {reviews &&
          [...reviews]
            .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
            .map(review => <Review key={review.id} {...review} />)}
      </ul>
      <div className={styles.btnWrapper}>
        <Button
          type={BtnType.button}
          size={Size.large}
          name={isUserCommented ? 'Изменить оценку' : 'Оценить книгу'}
          clickHandler={setShowReviewModal}
          variant={isUserCommented ? BtnVariant.secondary : BtnVariant.primary}
          dataTestId={DataTestId.buttonRateBook}
        />
      </div>
    </div>
  );
};
