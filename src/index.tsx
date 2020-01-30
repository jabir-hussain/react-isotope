import * as React from "react";

const { useState, useEffect, useMemo } = React;

import styles from "./styles.css";

export interface GridLayout {
  id: string;
  row: number;
  col: number;
  h: number;
  w: number;
  filter: string[];
}

export interface IsoTopeGridProps {
  gridLayout: GridLayout[];
  unitWidth: number;
  unitHeight: number;
  noOfCols: number;
  filters: any[];
  children: React.ReactElement[];
}

const getX = (col: number, width: number) => {
  return col * width + 10;
};

const getY = (row: number, height: number) => {
  return row * height + 10;
};

export default (props: IsoTopeGridProps) => {
  const {
    children,
    gridLayout,
    unitWidth,
    unitHeight,
    noOfCols,
    filters
  } = props;

  const [cards, udpateCards] = useState(gridLayout);

  const clonedChildrens = useMemo(
    () =>
      children
        .filter(child => cards.findIndex(g => g.id === child.key) !== -1)
        .map(child => {
          const { key } = child;
          const layoutIndex = cards.findIndex(g => g.id === key);
          const cardLayout = cards[layoutIndex];
          const { h = 1, w = 1, col, row } = cardLayout;
          const style = {
            transition: "all 0.5s ease-in-out",
            width: `${unitWidth * w}px`,
            height: `${unitHeight * h}px`,
            left: `${col ? `${10 * col * w}px` : 0}`,
            top: `${row ? `${10 * row * h}px` : 0}`,
            transform: `translate(${getX(col, unitWidth)}px, ${getY(
              row,
              unitHeight
            )}px)`,
            position: "absolute",
            backgroundColor: "gray",
            borderWidth: "3px",
            borderStyle: "solid black"
          };

          return {
            ...child,
            props: {
              ...child.props,
              style
            }
          };
        }),
    [cards, children, unitHeight, unitWidth, noOfCols]
  );

  useEffect(() => {
    let currentCol = 0;

    const intersection = (arr1: string[], arr2: string[]) =>
      arr1.filter(i => -1 !== arr2.findIndex(a => a === i));

    const checkedFilterLabels = filters
      .filter(f => f.isChecked)
      .map(f => f.label);

    const filteredCards = gridLayout.filter(
      card =>
        intersection(checkedFilterLabels, card.filter).length ||
        checkedFilterLabels.includes("all")
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

  return <div className={styles["isotope-container"]}>{clonedChildrens}</div>;
};
