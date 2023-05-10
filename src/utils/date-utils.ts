import dayjs, { Dayjs } from 'dayjs';
import ruLocale from 'dayjs/locale/ru';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
export const formatDateButton = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('ru-Ru', { day: '2-digit', month: '2-digit' }).format(date);
};

export const formatDateReview = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('ru-Ru', {
    day: '2-digit',
    year: 'numeric',
    month: 'long',
  }).format(date);
};

export const getMonthMatrix = (year: number, month = dayjs().month()) => {
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).locale(ruLocale).weekday();

  let currentMonthCount = 0 - firstDayOfTheMonth;

  const daysInMonth = dayjs().month(month).daysInMonth();
  const weeksInMonth = Math.ceil((firstDayOfTheMonth + daysInMonth) / 7);

  return new Array(weeksInMonth).fill([]).map(() =>
    new Array(7).fill(null).map(() => {
      currentMonthCount += 1;

      return dayjs(new Date(year, month, currentMonthCount)).locale(ruLocale);
    })
  );
};

export const getDate = (year: number, monthIndex: number): string =>
  dayjs(new Date(year, monthIndex))
    .locale(ruLocale)
    .format('MMMM YYYY')
    .replace(/[a-zа-я]+/gi, match => match[0].toUpperCase() + match.substr(1));

export const isWeekend = (day: Dayjs, monthIndex: number, year: number) => {
  const now = dayjs(new Date(year, monthIndex));
  const startOfMonth = now.startOf('month');
  const endOfMonth = now.endOf('month');

  return (
    day.isSameOrAfter(startOfMonth) &&
    day.isSameOrBefore(endOfMonth) &&
    (day.weekday() === 5 || day.weekday() === 6)
  );
};

export const isCurrentOrNextDay = (day: Dayjs): boolean => {
  const today = dayjs().startOf('day');
  let nextDay = today.add(1, 'day');

  if (today.day() === 6 || today.day() === 7) {
    nextDay = today.day(8).startOf('day');
  }

  if (nextDay.day() === 6 || nextDay.day() === 7) {
    nextDay = nextDay.day(8).startOf('day');
  }

  if (day.isSame(today, 'day') && (today.day() === 6 || today.day() === 0)) {
    return false;
  }

  return day.isSame(today, 'day') || day.isSame(nextDay, 'day');
};

export const isCurrentDay = (day: Dayjs) => {
  const today = dayjs();

  return today.isSame(day, 'day');
};
