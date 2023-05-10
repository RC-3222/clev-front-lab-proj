import { useEffect, useState } from 'react';

import { Card } from '../../../../components/card';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { booksSelector, getCancelBookingRequest } from '../../../../store/slices';
import { BookType } from '../../../../types';
import { ExpiredMask } from '../../expired-mask';
import { ProfileEmpty } from '../../profile-empty';
import { BookingDataType } from '../../profile-page.data';

import styles from './profile-booking-delivery.module.scss';

type ProfileBookingDeliveryProps = {
  bookingBookId?: number;
  bookingId?: number;
  deliveryId?: number;
  data: BookingDataType;
  isExpired?: boolean;
  isBooking?: boolean;
  deliveryDate?: string | Date;
  dataTestId?: string;
};

export const ProfileBookingDelivery = ({
  bookingBookId,
  bookingId,
  deliveryId,
  deliveryDate,
  data,
  isExpired,
  isBooking,
  dataTestId,
}: ProfileBookingDeliveryProps) => {
  const { books } = useAppSelector(booksSelector);
  const dispatch = useAppDispatch();
  const [book, setBook] = useState({} as BookType | undefined);

  const handleCancelBooking = () => {
    if (bookingId) dispatch(getCancelBookingRequest({ bookingId: bookingId.toString() }));
  };

  useEffect(() => {
    if (books && !!bookingBookId) {
      setBook(books.find(({ id }) => id === bookingBookId));
    }
    if (books && !!deliveryId) {
      setBook(books.find(({ id }) => id === deliveryId));
    }
  }, [book, bookingBookId, deliveryId, books]);

  return (
    <div className={styles.functionsItem} data-test-id={dataTestId}>
      {isExpired && (bookingBookId || deliveryId) && (
        <ExpiredMask expiredTitle={data.expiredTitle} expiredSubtitle={data.expiredSubtitle} />
      )}
      <span className={styles.title}>{data.title}</span>
      <span className={styles.subtitle}>{data.subtitle}</span>
      {!!bookingBookId || !!deliveryId ? (
        <Card
          cardData={book ? book : ({} as BookType)}
          isProfileCard={!!deliveryId}
          deliveryDate={deliveryDate}
          isBooking={isBooking}
          cancelBookingHandler={handleCancelBooking}
        />
      ) : (
        <ProfileEmpty data={data.data} />
      )}
    </div>
  );
};
