import { Rating } from '../../../components/common/rating';
import { Size } from '../../../enums';

import styles from './rating-block.module.scss';

export const RatingBlock = ({ rating }: { rating: number | null }) => (
  <div className={styles.ratingBlock}>
    <h3 className={styles.subTitle}>Рейтинг</h3>
    <div className={styles.ratingWrapper}>
      <Rating value={rating ? Math.round(rating) : 0} size={Size.large} />
      {rating ? <span>{rating}</span> : <span className={styles.noRating}>еще нет оценок</span>}
    </div>
  </div>
);
