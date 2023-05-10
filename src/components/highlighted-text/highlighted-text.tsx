import { Fragment, memo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { DataTestId } from '../../enums';

import styles from './highlighted-text.module.scss';

type HighLightedTextProps = {
  text: string;
  className: string;
  searchWord: string;
}

export const HighlightedText = memo(({ searchWord, text, className }: HighLightedTextProps) => {
  const genHighlightedText = useCallback(
    (str: string) => {
      if (!searchWord) {
        return str;
      }
      const regexp = new RegExp(searchWord, 'ig');
      const matchValue = str.match(regexp);

      if (matchValue) {
        return str.split(regexp).map((el, index, array) => {
          if (index < array.length - 1) {
            const selectionLetters = matchValue.shift();

            return (
              <Fragment key={uuidv4()}>
                {el}
                <span data-test-id={DataTestId.highlightMatches} className={styles.highlight}>
                  {selectionLetters}
                </span>
              </Fragment>
            );
          }

          return el;
        });
      }

      return str;
    },
    [searchWord]
  );

  return <p className={className}>{genHighlightedText(text)}</p>;
});
