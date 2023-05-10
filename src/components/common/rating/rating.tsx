import classNames from 'classnames';

import Star from '../../../assets/images/star.svg';
import StarActive from '../../../assets/images/star-active.svg';
import { DataTestId, Size } from '../../../enums';

import styles from './rating.module.scss';

type RatingProps = {
  value: number;
  size?: Size;
}

export const Rating = ({ value, size = Size.medium }: RatingProps) => (
  <div className={styles.rating} data-test-id={DataTestId.rating}>
    {[1, 2, 3, 4, 5].map(star => (
      <div
        className={classNames(styles.ratingItem, { [styles.large]: size === Size.large })}
        key={star}
        data-test-id={DataTestId.star}
      >
        {value < star ? (
          <img src={Star} alt='star' />
        ) : (
          <img src={StarActive} alt='star-active' data-test-id={DataTestId.starActive} />
        )}
      </div>
    ))}
  </div>
);
