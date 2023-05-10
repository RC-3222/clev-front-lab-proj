import { Fragment } from 'react';

import { Button } from '../../../components/common/button';
import { Slider } from '../../../components/slider';
import { BtnType, BtnVariant, DataTestId, Size } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setBookId, userSelector } from '../../../store/slices';
import { BookInfoType } from '../../../types';
import { getBookingBtnText } from '../../../utils';

import styles from './main-info.module.scss';

type MainInfoProps = {
  book: BookInfoType;
  showCalendar: () => void;
}

export const MainInfo = ({ book, showCalendar }: MainInfoProps) => {
  const { images, title, authors, issueYear, description, booking, id, delivery } = book;

  const dispatch = useAppDispatch();

  const { data: user } = useAppSelector(userSelector);

  const clickHandler = (bookId: string) => {
    dispatch(setBookId(bookId));
    showCalendar();
  };

  return (
    <Fragment>
      <div className={styles.mainInfo}>
        <Slider images={images} />
        <div className={styles.aboutBlock}>
          <h2 data-test-id={DataTestId.bookTitle} className={styles.title}>
            {title}
          </h2>
          <div className={styles.author}>
            {authors && authors.map(author => <span key={author}>{author}</span>)}, {issueYear}
          </div>
          <div className={styles.btnWrapper}>
            <Button
              size={Size.large}
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
          <div className={styles.aboutBookFullScreen}>
            <h3 className={styles.subTitle}>О книге</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className={styles.aboutBookTablet}>
        <h3 className={styles.subTitle}>О книге</h3>
        <p>{description}</p>
      </div>
    </Fragment>
  );
};
