import { DataTestId } from '../../../enums';
import { ResponseUser } from '../../../types';
import { BOOKING_DATA, DELIVERING_DATA } from '../profile-page.data';

import { ProfileBookingDelivery } from './profile-booking-delivery';
import { ProfileHistory } from './profile-history';

import styles from './profile-actions.module.scss';

type ProfileActionsProps = {
  user: ResponseUser;
}

export const ProfileActions = ({ user }: ProfileActionsProps) => {
  const userCommentedBooksIds = user?.comments?.map(({ bookId }) => bookId);

  return (
    <div className={styles.wrapper}>
      <ProfileBookingDelivery
        dataTestId={DataTestId.booking}
        bookingBookId={user?.booking?.book?.id}
        bookingId={user?.booking?.id || 0}
        data={BOOKING_DATA}
        isExpired={
          new Date().getTime() >= new Date(user.booking?.dateOrder || '').getTime() &&
          new Date().getDate() !== new Date(user.booking?.dateOrder || '').getDate()
        }
        isBooking={true}
      />
      <ProfileBookingDelivery
        dataTestId={DataTestId.delivery}
        deliveryId={user.delivery?.book?.id}
        data={DELIVERING_DATA}
        isExpired={new Date().getTime() >= new Date(user.delivery?.dateHandedTo).getTime()}
        deliveryDate={user.delivery?.dateHandedTo}
      />

      <ProfileHistory history={user.history?.books} userCommentedBooksIds={userCommentedBooksIds} />
    </div>
  );
};
