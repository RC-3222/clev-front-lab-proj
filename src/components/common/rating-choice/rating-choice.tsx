import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';

import StarActive from '../../../assets/images/star.svg';
import Star from '../../../assets/images/star-active.svg';
import { DataTestId } from '../../../enums';

import styles from './rating-choice.module.scss';

type RatingProps = {
  control: Control<any, any>;
  defaultRating?: number;
}

export const RatingChoice = ({ control, defaultRating = 5 }: RatingProps) => {
  const [rating, setRating] = useState(defaultRating);

  return (
    <div className={styles.rating} data-test-id={DataTestId.rating}>
      {[1, 2, 3, 4, 5].map(value => (
        <label key={value} data-test-id={DataTestId.star}>
          <Controller
            name='rating'
            control={control}
            defaultValue={defaultRating}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                type='radio'
                value={value}
                checked={rating === value}
                onChange={() => {
                  setRating(value);
                  field.onChange(value);
                }}
              />
            )}
          />
          {value <= rating ? (
            <img src={Star} alt='star-active' data-test-id={DataTestId.starActive} />
          ) : (
            <img src={StarActive} alt='star' />
          )}
        </label>
      ))}
    </div>
  );
};
