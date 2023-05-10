import { BASE_URL } from '../../api';
import userAvatar from '../../assets/images/avatar.png';
import { DataTestId } from '../../enums';
import { ReviewType } from '../../types';
import { formatDateReview } from '../../utils';
import { Rating } from '../common/rating';

import styles from './review.module.scss';

export const Review = ({ text, user, rating, createdAt }: ReviewType) => (
  <li className={styles.review} data-test-id={DataTestId.commentWrapper}>
    <div className={styles.userData}>
      <div className={styles.imgWrapper}>
        <img src={user.avatarUrl ? `${BASE_URL}${user.avatarUrl}` : userAvatar} alt='avatar' />
      </div>
      <div className={styles.userDateBlock}>
        <span data-test-id={DataTestId.commentAuthor}>
          {user.firstName} {user.lastName}
        </span>
        <span data-test-id={DataTestId.commentDate}>{formatDateReview(createdAt)}</span>
      </div>
    </div>
    <Rating value={rating ? rating : 0} />
    <p className={styles.userText} data-test-id={DataTestId.commentText}>
      {text}
    </p>
  </li>
);
