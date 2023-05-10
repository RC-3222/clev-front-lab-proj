import { useEffect, useState } from 'react';
import { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Card } from '../../../../components/card';
import { CustomModal } from '../../../../components/common/custom-modal';
import { OverlayWithPortal } from '../../../../components/overlay-with-portal';
import { DataTestId, ViewMode } from '../../../../enums';
import { useBooleanState } from '../../../../hooks';
import { useAppSelector } from '../../../../store/hooks';
import { booksSelector } from '../../../../store/slices';
import { BookType } from '../../../../types';
import { LeaveReview } from '../../../book/leave-review';
import { ProfileEmpty } from '../../profile-empty';
import { HISTORY_DATA } from '../../profile-page.data';

import './swiper-history.css';
import styles from './profile-history.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

type HistoryItem = {
  id: number;
  title: string;
  issueYear: string;
  authors: string[];
  image: null;
};

type ProfileHistoryProps = {
  history: HistoryItem[] | null;
  userCommentedBooksIds?: number[];
}

export const ProfileHistory = ({ history, userCommentedBooksIds }: ProfileHistoryProps) => {
  const { books } = useAppSelector(booksSelector);

  const [findHistory, setFindHistory] = useState<BookType[]>();

  const [selectedBookId, setSelectedBookId] = useState<number>();

  const {
    state: shouldShowReviewModal,
    setFalse: hideReviewModal,
    setTrue: showReviewModal,
  } = useBooleanState(false);

  useEffect(() => {
    if (books && !!history?.length) {
      setFindHistory(
        history.map(({ id: itemid }) => books?.find(({ id }) => itemid === id)) as BookType[]
      );
    }
  }, [books, history]);

  const openReviewModalHandler = (bookId: number) => {
    setSelectedBookId(bookId);

    showReviewModal();
  };

  return (
    <div className={styles.functionsItem} data-test-id={DataTestId.history}>
      <span className={styles.title}>{HISTORY_DATA.title}</span>
      <span className={styles.subtitle}>{HISTORY_DATA.subtitle}</span>

      {history?.length ? (
        <Swiper
          className='history'
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          modules={[FreeMode, Pagination]}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            880: {
              slidesPerView: 4,
            },
            572: {
              slidesPerView: 3,
            },
            421: {
              slidesPerView: 2,
            },
          }}
        >
          {findHistory?.map(book => (
            <SwiperSlide key={book?.id} className='history' data-test-id={DataTestId.historySlide}>
              <Card
                cardData={book}
                selectedViewMode={ViewMode.grid}
                isProfileCard={!!history}
                isHistory={true}
                isCommented={userCommentedBooksIds?.includes(book.id)}
                openReviewModalHandler={openReviewModalHandler}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <ProfileEmpty data={HISTORY_DATA.data} />
      )}

      {shouldShowReviewModal && (
        <OverlayWithPortal onClose={hideReviewModal} dataTestId={DataTestId.modalOuter}>
          <CustomModal dataTestId={DataTestId.modalRateBook}>
            <LeaveReview
              setHideReviewModal={hideReviewModal}
              updateReview={userCommentedBooksIds?.includes(selectedBookId as number)}
              selectedBookID={selectedBookId}
            />
          </CustomModal>
        </OverlayWithPortal>
      )}
    </div>
  );
};
