export type BookingAddRequest = {
  data: {
    order: boolean;
    dateOrder: string;
    book: string;
    customer: string;
  };
};

export type BookingAddRequestWithBookId = BookingAddRequest & {
  bookId?: string;
  bookingId?: string;
};

export type BookingCancelRequest = {
  bookingId: string;
  bookId?: string;
};

export type BookingAddResponse = {
  data: {
    id: number;
    attributes: {
      order: boolean;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      dateOrder: string;
    };
  };

  meta: object;
};
