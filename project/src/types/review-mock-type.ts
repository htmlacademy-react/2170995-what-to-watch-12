export type ReviewMockType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
  id: number;
  name: string;
};
}


export type ReviewMockTypes = ReviewMockType[];

export type FilmReviewMockType = {
  id: number;
  reviews: ReviewMockTypes;
}
