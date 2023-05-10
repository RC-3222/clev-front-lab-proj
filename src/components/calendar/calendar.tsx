import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import ArrowDown from '../../assets/images/arrow-down.svg';
import ArrowDropdown from '../../assets/images/arrow-dropdown.svg';
import ArrowUp from '../../assets/images/arrow-up.svg';
import CloseIcon from '../../assets/images/close-alt.svg';
import { BtnType, BtnVariant, DataTestId, Size } from '../../enums';
import { useBooleanState } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  authSelector,
  bookInfoSelector,
  bookingSelector,
  booksSelectorById,
  getBookingRequest,
  getCancelBookingRequest,
  getEditBookingRequest,
} from '../../store/slices';
import { BookingAddRequestWithBookId, BookingCancelRequest } from '../../types';
import { getDate, getMonthMatrix } from '../../utils';
import { Button } from '../common/button';

import { Day } from './day';
import { MonthSelector } from './month-selector';

import styles from './calendar.module.scss';

type CalendarProps = {
  onClose: () => void;
}

export const Calendar = ({ onClose }: CalendarProps) => {
  const { auth: {userData:user} } = useAppSelector(authSelector);

  const { selectBookId } = useAppSelector(bookingSelector);

  const { bookId } = useParams();

  const selectedBookData = useAppSelector(booksSelectorById(selectBookId));
  const { book: selectedBookInfo } = useAppSelector(bookInfoSelector);

  const bookInfo = (selectedBookData && !bookId) ? selectedBookData : selectedBookInfo;

  const isThisUserBooked = bookInfo?.booking?.customerId === user!.id

  const dateOrder = dayjs(bookInfo?.booking?.dateOrder);

  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonthMatrix(currentYear, monthIndex));
  const [selectedDay, setSelectedDay] = useState(isThisUserBooked ? dateOrder.locale('ru') : null);

  const dispatch = useAppDispatch();

  const changeSelectedDay = (day: Dayjs) => {
    setSelectedDay(day);
  };

  const incMonthIndex = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setCurrentYear(currentYear + 1);
    } else setMonthIndex(monthIndex + 1);
  };
  const decMonthIndex = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setCurrentYear(currentYear - 1);
    } else setMonthIndex(monthIndex - 1);
  };

  const { state: isVisibleDropdown, toggle: toggleIsVisibleDropdown } = useBooleanState();
  const setAbsoluteMonthIndex = (relativeMonthIndex: number) => setMonthIndex(relativeMonthIndex);

  const clickHandler = () => {
    const requestData: BookingAddRequestWithBookId = {
      data: {
        book: selectBookId!,
        customer: user!.id.toString(),
        dateOrder: `${selectedDay!.format().slice(0,-6)}`,
        order: true,
      },
      bookId,
      bookingId: bookInfo?.booking?.id.toString(),
    };

    if (isThisUserBooked) {
      dispatch(getEditBookingRequest(requestData));
    } else {
      dispatch(getBookingRequest(requestData));
    }
  };

  const cancelBookingClickHandler = () => {
    const requestData: BookingCancelRequest = {
      bookingId: bookInfo!.booking!.id.toString(),
      bookId,
    };

    dispatch(getCancelBookingRequest(requestData));
  };

  useEffect(() => {
    setCurrentMonth(getMonthMatrix(currentYear, monthIndex));
  }, [currentYear, monthIndex]);

  return (
    <div className={styles.calendarWrapper}>
      <h2 className={styles.title} data-test-id={DataTestId.modalTitle}>
        {isThisUserBooked ? 'Изменение даты бронирования' : 'Выбор даты бронирования'}
      </h2>
      <img
        className={styles.closeIcon}
        src={CloseIcon}
        alt='close-icon'
        onClick={onClose}
        role='presentation'
        data-test-id={DataTestId.modalCloseButton}
      />
      <div className={styles.calendar} data-test-id={DataTestId.calendar}>
        <nav className={styles.navigation}>
          <div
            className={classNames(styles.selectMonthGroup, {
              [styles.active]: isVisibleDropdown,
            })}
            data-test-id={DataTestId.monthSelect}
            onClick={toggleIsVisibleDropdown}
            role='presentation'
          >
            <span>{getDate(currentYear, monthIndex)}</span>
            <img src={ArrowDropdown} alt='dropdown' />
            {isVisibleDropdown && <MonthSelector setMonth={setAbsoluteMonthIndex} />}
          </div>
          <div className={styles.changeMonthGroup}>
            <img
              src={ArrowUp}
              alt='up'
              role='presentation'
              onClick={decMonthIndex}
              data-test-id={DataTestId.buttonPrevMonth}
            />
            <img
              src={ArrowDown}
              alt='down'
              role='presentation'
              onClick={incMonthIndex}
              data-test-id={DataTestId.buttonNextMonth}
            />
          </div>
        </nav>

        <div className={styles.daysList}>
          {currentMonth.map((row: Dayjs[], i: number) => (
            <Fragment key={uuidv4()}>
              {row.map((day: Dayjs) => (
                <Day
                  day={day}
                  key={uuidv4()}
                  row={i}
                  monthIndex={monthIndex}
                  changeSelectedDay={changeSelectedDay}
                  selectedDay={selectedDay}
                  year={currentYear}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      <Button
        name='Забронировать'
        clickHandler={clickHandler}
        type={BtnType.submit}
        size={Size.large}
        isDisabled={
          !selectedDay ||
          (selectedDay.isSame(dayjs(bookInfo?.booking?.dateOrder).locale('ru')) &&
            isThisUserBooked)
        }
        dataTestId={DataTestId.bookingButton}
      />
      {isThisUserBooked && (
        <Button
          name='Отменить бронь'
          clickHandler={cancelBookingClickHandler}
          type={BtnType.submit}
          size={Size.large}
          variant={BtnVariant.secondary}
          dataTestId={DataTestId.bookingCancelButton}
        />
      )}
    </div>
  );
};
