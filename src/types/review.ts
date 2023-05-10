export type ReviewFieldType = {
  rating: number;
  text: string;
  book: string;
  user: string;
};

export type ReviewUpdateType = {
  rating: number;
  text: string;
  book: string;
  user: string;
  commentId: number;
};

export type ResponseReviewType = {
  id: number;
  data: {
    id: number;
    attributes: {
      rating: number;
      text: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
  meta: object;
};
