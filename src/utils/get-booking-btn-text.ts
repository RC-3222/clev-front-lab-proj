import { BookingType, DeliveryType } from '../types';

import { formatDateButton } from '.';

export const getBookingBtnText = (booking: BookingType | null, delivery: DeliveryType | null) => {
  if (delivery && delivery.dateHandedTo) {
    return `Занята до ${formatDateButton(delivery.dateHandedTo)}`;
  }
  if (booking === null) {
    return 'Забронировать';
  }

  return 'Забронирована';
};
