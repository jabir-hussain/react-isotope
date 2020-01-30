import * as React from "react";

/**
 * @description The purpose of this function to give us intersection
 *   of two arrays of strings.
 *
 *   i.e arr1 = ['a', 'b'], arr2 = ['b', 'c']
 *       result = ['b']
 * @param arr1: array of strings
 * @param arr2: array of strings
 * @return array of strings
 */
export const intersection = (arr1: string[], arr2: string[]): string[] =>
  arr1.filter(i => -1 !== arr2.findIndex(a => a === i));

export const useGridArrangement = (props: any) => {
  const { filters, gridLayout, noOfCols } = props;

  const [cards, udpateCards] = React.useState();

  React.useEffect(() => {
    let currentCol = 0;

    const filteredCards = gridLayout.filter(
      card =>
        intersection(filters, card.filter).length || filters.includes("all")
    );
    const mappedCards = filteredCards.map((card, i) => {
      if (currentCol === noOfCols) {
        currentCol = 0;
      }
      return {
        ...card,
        row: Math.floor(i / noOfCols),
        col: currentCol++
      };
    });
    udpateCards(mappedCards);
  }, [filters, gridLayout]);
};
