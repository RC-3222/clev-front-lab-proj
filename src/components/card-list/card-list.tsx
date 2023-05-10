import classNames from 'classnames';

import { DataTestId, ViewMode } from '../../enums';
import { BookType } from '../../types';
import { Card } from '../card';

import styles from './card-list.module.scss';

type CardListProps = {
  selectedViewMode: ViewMode;
  cardsData: BookType[];
  inputText: string;
  showCalendar: () => void;
}

export const CardList = ({
  selectedViewMode,
  cardsData,
  inputText,
  showCalendar,
}: CardListProps) => (
  <ul
    className={classNames(styles.cardList, {
      [styles.cardListLine]: selectedViewMode === ViewMode.list,
    })}
    data-test-id={DataTestId.content}
  >
    {cardsData.map(cardData => (
      <Card
        cardData={cardData}
        selectedViewMode={selectedViewMode}
        key={cardData.id}
        inputText={inputText}
        showCalendar={showCalendar}
      />
    ))}
  </ul>
);
