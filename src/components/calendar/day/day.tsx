import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';

import { DataTestId } from '../../../enums';
import { isCurrentDay, isCurrentOrNextDay, isWeekend } from '../../../utils';

import styles from './day.module.scss';

type DayProps = {
  day: Dayjs;
  row: number;
  monthIndex: number;
  changeSelectedDay: (day: Dayjs) => void;
  selectedDay?: dayjs.Dayjs | null;
  year: number;
}

export const Day = ({ day, monthIndex, row, changeSelectedDay, selectedDay, year }: DayProps) => {
  const clickHandler = (dayArg: Dayjs) => {
    if (isCurrentOrNextDay(day)) {
      changeSelectedDay(dayArg);
    }
  };

  return (
    <div
      className={classNames(styles.dayWrapper)}
      onClick={() => clickHandler(day)}
      role='presentation'
      data-test-id={DataTestId.dayButton}
    >
      {row === 0 && <span className={styles.dayWeek}>{day.format('dd').toUpperCase()}</span>}
      <span
        className={classNames(styles.number, {
          [styles.selectable]: isCurrentOrNextDay(day),
          [styles.weekend]: isWeekend(day, monthIndex, year),
          [styles.currentDay]: isCurrentDay(day),
          [styles.selectedDay]: day.format('DD/MM/YYYY') === selectedDay?.format('DD/MM/YYYY'),
        })}
      >
        {day.format('DD')}
      </span>
    </div>
  );
};
