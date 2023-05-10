import { Fragment } from 'react';

import { ReactComponent as ListImg } from '../../assets/images/burger.svg';
import { ReactComponent as Search } from '../../assets/images/search.svg';
import { ReactComponent as Sort } from '../../assets/images/sort.svg';
import { ReactComponent as TileImg } from '../../assets/images/window.svg';
import { DataTestId, Size, ViewMode } from '../../enums';
import { useBooleanState } from '../../hooks';
import { CustomSelect } from '../common/custom-select';
import { RoundButton } from '../common/round-button';
import { SearchInput } from '../common/search-input';

import styles from './filter.module.scss';

type FilterProps = {
  changeViewMode: (type: ViewMode) => void;
  selectedViewMode: ViewMode;
  inputText: string;
  changeInputText: (value: string) => void;
  toggleSortByRatingMode: () => void;
  isSortAscending: boolean;
}

export const Filter = ({
  changeViewMode,
  selectedViewMode,
  inputText,
  changeInputText,
  toggleSortByRatingMode,
  isSortAscending,
}: FilterProps) => {
  const { state: isShowOnlySearchInput, setFalse, setTrue } = useBooleanState();

  return (
    <div className={styles.filter}>
      {isShowOnlySearchInput ? (
        <SearchInput
          inputText={inputText}
          changeInputText={changeInputText}
          placeholder='Поиск книги или автора...'
          size={Size.small}
          closeHandler={setFalse}
          autofocus={true}
        />
      ) : (
        <Fragment>
          <div className={styles.sorting}>
            <div className={styles.blockDesktop}>
              <SearchInput
                inputText={inputText}
                changeInputText={changeInputText}
                placeholder='Поиск книги или автора…'
                size={Size.medium}
              />
              <CustomSelect
                placeholder='По рейтингу'
                dataTestId={DataTestId.sortRatingButton}
                handler={toggleSortByRatingMode}
                isIconReversed={isSortAscending}
              />
            </div>
            <div className={styles.blockMobile}>
              <RoundButton handler={setTrue} dataTestId={DataTestId.buttonSearchOpen}>
                <Search />
              </RoundButton>
              <RoundButton handler={toggleSortByRatingMode} isIconReversed={isSortAscending}>
                <Sort />
              </RoundButton>
            </div>
          </div>
          <div className={styles.listType}>
            <RoundButton
              changeViewMode={changeViewMode}
              selectedViewMode={selectedViewMode}
              viewMode={ViewMode.grid}
              dataTestId={DataTestId.buttonMenuViewWindow}
            >
              <TileImg />
            </RoundButton>
            <RoundButton
              changeViewMode={changeViewMode}
              selectedViewMode={selectedViewMode}
              viewMode={ViewMode.list}
              dataTestId={DataTestId.buttonMenuViewList}
            >
              <ListImg />
            </RoundButton>
          </div>
        </Fragment>
      )}
    </div>
  );
};
